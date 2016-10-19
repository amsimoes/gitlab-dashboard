# coding=utf-8
from flask import *
from flask_security import *
from flask_socketio import *
from unidecode import unidecode
from functools import wraps
from time import time
import requests
import json

global current_path
current_path= []

app = Flask(__name__)
app.secret_key = 'xyz'
socketio = SocketIO(app)

private_token = ''
id_project = 0

@socketio.on('disconnect')
def disconnect_user():
    session.pop('logged_in', None)


def make_get_request(path):
    request_url = 'https://git.dei.uc.pt/api/v3'
    token = private_token
    print("GET REQUEST | private_token ="+token)
    if "?" not in path:
        response = requests.get(request_url + path + '?private_token={private_token}'.format(private_token=token))
    else:
        response = requests.get(request_url + path + '&private_token={private_token}'.format(private_token=token))

    return response


def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session and private_token:
            return f(*args, **kwargs)
        else:
            if not private_token:
                flash("Server refreshed. You must login again.")
            else:
                flash("You must login first!")
            return redirect(url_for('login_page'))
    return wrap


def valid_login(username, password):
    request_url = 'https://git.dei.uc.pt/api/v3'
    path = '/session?login={user}&password={p}'.format(user=username, p=password)
    response = requests.post(request_url+path)
    global private_token

    if "private_token" in response.json():
        print(response.content)
        print("token = "+response.json()['private_token'])
        private_token = response.json()['private_token']
        return True
    return False


@app.route('/login', methods=['GET', 'POST'])
def login_page():
    error = None
    if request.method == 'POST':
        if valid_login(request.form['username'], request.form['password']) == False:
            error = "OOPS! Invalid credentials. Please use your GitDEI user/password"
        else:
            session['logged_in'] = True
            return redirect(url_for('logged'))
    return render_template('login.html', error=error)


@app.route('/logged')
@login_required
def logged():
    print(current_user.is_authenticated())
    return render_template('welcome.html')


@app.route('/logout')
@login_required
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login_page'))


@app.route("/")
@login_required
def welcome():
    return "You're sucessfully logged into wonderland!"


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


# TODO: Pode haver mais que um projeto na conta do GitDEI
@app.route('/projects')
@login_required
def list_projects():
    path = '/projects'
    response = make_get_request(path)

    if len(response.json()) > 1:
        p = ''
        for projects in response.json():
            p += str(projects["name"]) + "\n"
        return p
    return response.content


@app.route('/projects/files')
@login_required
def list_project_files():
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/tree'.format(project_id=project_id)
    response = make_get_request(path)

    return response.content


# Precisa do id do ficheiro para mostrar o conteúdo
@app.route('/projects/files/content')
@login_required
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
@login_required
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


@app.route('/projects/members')
@login_required
def list_project_members():
    project_id = get_project_id()
    path = '/projects/{project_id}/members'.format(project_id=project_id)
    response = make_get_request(path)

    contributors = []
    for contributor in response.json():
        contributors.append(unidecode(contributor['name']))

    return json.dumps(contributors)


@app.route('/projects/commits')
@login_required
def list_commits():
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits?page=1&per_page=100'.format(project_id = project_id)
    response = make_get_request(path)

    for commits in response.json():
        print(commits['title'])

    return response.content


@app.route('/projects/contributors')
@login_required
def list_project_contributors():    # and their stats (additions, deletions)
    start = time()
    project_id = get_project_id()
    path = '/projects/{id}/repository/contributors'.format(id=project_id)
    response = make_get_request(path)
    end = time()
    tempo = end - start
    print("list_project_contributors | Demorou {s:.2f} segundos".format(s=tempo))

    return response.content


if __name__ == '__main__':
    app.run(threaded=True, debug=True)
