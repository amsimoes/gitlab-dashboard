from flask import Flask, render_template, request
from unidecode import unidecode
import requests
import json

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


def get_commits_per_user(user_email):
    if not user_email:
        return 'Error 502: user_email invalid'

    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits'.format(project_id=project_id)
    response = make_get_request(path)
    count = adds = dels = 0

    for commits in response.json():
        if commits['author_email'] == user_email:
            count += 1
            print(commits['id'])
            additions, deletions = get_commit_stats(project_id, str(commits['id']))
            adds += additions
            dels += deletions

    return count, adds, dels


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


def get_file_id(project_id, file_path):
    path = '/projects/{project_id}/repository/files?file_path={f}&ref={branch}'.format(project_id=project_id,f=file_path,\
        branch='master')
    response = make_get_request(path)
    print(response.content)
    file_commit_id = response.json()["commit_id"]
    print("Commit_id ="+str(file_commit_id))
    # print("Last_commit_id ="+str(response.json()["last_commit_id"]))

    return file_commit_id


def get_file_diff(project_id, commit_id):
    path = '/projects/{project_id}/repository/commits/{sha}/diff'.format(project_id=project_id, \
            sha=commit_id)
    response = make_get_request(path)
    f_name = ''
    # print(response.content)

    print("Len dicionario: "+str(len(response.json())))

    if len(str(response.content)) < 10: # Pode aparecer um commit vazio (sem modificacao nenhuma)
        return 'nothing'
    else:
        f_name = response.json()[0]["new_path"]
        print(f_name)
        if "/" in f_name:   # Em caso do ficheiro estar dentro de alguma pasta (por testar)
            print("Dentro de uma pasta...")
            f_name = f_name.split("/")
            return f_name[:-1]
        else:
            return f_name


def get_stats_per_file(file_name):
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits'.format(project_id = project_id)
    response = make_get_request(path)
    commit_count = additions = deletions = 0
    contributors = []
    found = False

    for commits in response.json():
        if get_file_diff(project_id, str(commits['id'])) == file_name:
            if commits["author_name"] not in contributors:
                contributors.append(commits["author_name"])
            adds, dels = get_commit_stats(project_id, str(commits['id']))
            commit_count += 1
            additions += adds
            deletions += dels
            print("Additions: "+str(additions)+" Deletions: "+str(deletions))
            creation_date = commits['created_at']
            found = True
    if found == False:
        return 0,0,0,0,0
    return commit_count, additions, deletions, parse_date(creation_date), contributors


# Invalid file_path -> retorna 0
def get_blob_id(project_id, file_path):
    path = '/projects/{project_id}/repository/files?file_path={f}&ref=master'.format(project_id=project_id,f=file_path)
    response = make_get_request(path)

    if not response:
        return 0
    return response.json()['blob_id']


def diff():
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits/{sha}/diff'.format(project_id=project_id, \
            sha='a5b58613b1a4a12d53f8e8024a57c60a47634193')
    response = make_get_request(path)
    return response.content


@app.route('/')
def welcome():
    return render_template('hello.html')


@app.route('/testing')
def repo_files():
    project_id = get_project_id()
    file_path = '.babelrc'
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


# Precisa do id do ficheiro para mostrar o conteúdo (HTML n mostram o conteudo, mostra o produto)
@app.route('/projects/files/raw_blob')
def get_raw_blob():
    file_path = 'templates/hello.html'
    project_id = get_project_id()
    blob_id = get_blob_id(project_id, file_path)
    path = '/projects/{project_id}/repository/raw_blobs/{blob_id}'.format(project_id=project_id, blob_id=blob_id)
    response = make_get_request(path)

    if ".html" in file_path:
        string = str(response.content)
        string = string[2:]
        string = "<textarea rows=\"25\" cols =\"75\">"+string+"</textarea>"
        return string
    return response.content


@app.route('/projects/folders', methods=["GET", "POST"])
def list_folder_files():
    project_id = get_project_id()
    files = {}
    if request.method == "POST":
        path=request.json['folder']
        if(path != ''):
            path = '/projects/{project_id}/repository/tree?path={path}'.format(project_id=project_id, path=path)
        else:
            path = '/projects/{project_id}/repository/tree'.format(project_id=project_id,path=path)
        response = make_get_request(path)
    elif request.method == "GET":
        path = '/projects/{project_id}/repository/tree'.format(project_id=project_id)
        response = make_get_request(path)

    for file in response.json():
        files.update({file['name']:file['type']})

    return json.dumps(files)


# Lista o numero de commits por ficheiro
@app.route('/projects/files/commits')
def list_file_stats():
    file_name = ".babelrc"
    commits, additions, deletions, creation_date, contributors = get_stats_per_file(file_name)
    if commits == 0:
        return "File {f} not commited yet.".format(f=file_name)
    lista = ', '.join(contributors)

    return "{f} | Creation date: {date} | \
        {c} Commits {a} Additions {d} Deletions \
        | Contributors: {l}".format(f=file_name,date=creation_date,c=commits,a=additions,d=deletions,l=lista)


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
    path = '/projects/{project_id}/repository/commits'.format(project_id = project_id)
    response = make_get_request(path)

    for commits in response.json():
        print(commits['id'])

    return response.content


@app.route('/projects/commits/user')
def list_commits_by_user():
    user_email = "asimoes@student.dei.uc.pt"
    count, additions, deletions = get_commits_per_user(user_email)

    return "{user} | Commits: {c} | Additions: {a} | Deletions: {d}".format(user=user_email,c=count,a=additions,d=deletions)


if __name__ == '__main__':
    app.run()
