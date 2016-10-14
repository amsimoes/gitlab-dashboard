# coding=utf-8
from flask import Flask, render_template, request
from unidecode import unidecode
import requests
import json
global current_path
current_path= []
app = Flask(__name__)


def make_get_request(path):
    private_token = '8fH8Vs4WNpYhVUBPzq5g'
    request_url = 'https://git.dei.uc.pt/api/v3'
    if "?" not in path:
        response = requests.get(request_url + path + '?private_token={private_token}'.format(private_token=private_token))
    else:
        response = requests.get(request_url + path + '&private_token={private_token}'.format(private_token=private_token))

    return response


# id = 737
def get_project_id():
    path = '/projects'
    return (make_get_request(path)).json()[0]['id']


# TODO: Extrair stats de cada file de um commit com mais q 1 ficheiro
def get_commit_stats(project_id, commit_id):
    path = '/projects/{project_id}/repository/commits/{sha}'.format(project_id=project_id, \
            sha=str(commit_id))
    response = make_get_request(path)
    additions = response.json()['stats']['additions']
    deletions = response.json()['stats']['deletions']

    return additions, deletions


def parse_date(date):
    data = date[:10] # Formato YYYY-MM-DD
    data = data.split("-")
    data = str(data[2])+"/"+str(data[1])+"/"+str(data[0])
    return data


# Invalid file_path -> retorna 0
def get_blob_id(project_id, file_path):
    path = '/projects/{project_id}/repository/files?file_path={f}&ref=master'.format(project_id=project_id,f=file_path)
    response = make_get_request(path)

    if not response:
        return 0
    return response.json()['blob_id']


def get_last_commit_id(file_path, branch):
    project_id = get_project_id()
    path = 'projects/{id}/repository/files?file_path={f}&ref={b}'.format(id=project_id, f=file_path, b=branch)
    response = make_get_request(path)

    return response.json()["last_commit_id"]


@app.route('/')
def welcome():
    return render_template('hello.html')


@app.route('/testing')
def repo_files():
    project_id = get_project_id()
    file_path = 'app.py'
    path = '/projects/{project_id}/repository/files?file_path={f}&ref=d2c40026052ca2ce1d7cf7ad40c4d6f39cec5141'.format(project_id=project_id,f=file_path)
    response = make_get_request(path)

    print(response.json()['commit_id'])
    adds, dels = get_commit_stats(project_id, response.json()['commit_id'])
    #return "Additions: {a} Deletions {d}".format(a=adds, d=dels)
    return response.content


@app.route('/projects')
def render_projects():
    return render_template('index.html')


@app.route('/list_projects')
def list_projects():
    path = '/projects'
    response = make_get_request(path)

    print(response.json()[0]['default_branch'])

    return response.json()[0]['name']


@app.route('/projects/files')
def list_project_files():
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/tree'.format(project_id=project_id)
    response = make_get_request(path)

    return response.content


# Precisa do id do ficheiro para mostrar o conteúdo
@app.route('/projects/files/content')
def get_file_content():
    file_path = 'project/app.py'
    project_id = get_project_id()
    blob_id = get_blob_id(project_id, file_path)
    path = '/projects/{project_id}/repository/raw_blobs/{blob_id}'.format(project_id=project_id, blob_id=blob_id)
    response = make_get_request(path)

    if ".html" in file_path:
        print("html in file")
        string = str(response.content)
        string = string[2:]
        string = "<textarea rows=\"25\" cols =\"75\">"+string+"</textarea>"
        return string
    return response.content


@app.route('/projects/folders', methods=["GET", "POST"])
def list_folder_files():
    project_id = get_project_id()
    files = {}
    s = ''
    if request.method == "POST":
        path=request.json['folder']
        if(path != ''):
            current_path.append(str(path) + "/")
            for file in current_path:
                s += str(file)
            path = '/projects/{project_id}/repository/tree?path={s}'.format(project_id=project_id, s=s)
        else:
            current_path.pop()
            for file in current_path:
                s += str(file)
            path = '/projects/{project_id}/repository/tree?path={s}'.format(project_id=project_id,path=path, s=s)
        response = make_get_request(path)
    elif request.method == "GET":
        path = '/projects/{project_id}/repository/tree'.format(project_id=project_id)
        response = make_get_request(path)
    for file in response.json():
        files.update({file['name']:file['type']})

    return json.dumps(files)


# Substituir pela funcao contributors?
@app.route('/projects/members')
def list_project_members():
    project_id = get_project_id()
    path = '/projects/{project_id}/members'.format(project_id=project_id)
    response = make_get_request(path)

    contributors = []
    for contributor in response.json():
        contributors.append(unidecode(contributor['name']))

    return json.dumps(contributors)


@app.route('/projects/commits')
def list_commits():
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits?page=1&per_page=100'.format(project_id = project_id)
    response = make_get_request(path)

    for commits in response.json():
        print(commits['title'])

    return response.content


@app.route('/projects/contributors')
def list_project_contributors():    # and their stats (additions, deletions)
    project_id = get_project_id()
    path = '/projects/{id}/repository/contributors'.format(id=project_id)
    response = make_get_request(path)

    return response.content


if __name__ == '__main__':
    app.run(threaded = True)
