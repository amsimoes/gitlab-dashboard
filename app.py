# coding=utf-8
from gevent.wsgi import WSGIServer
from flask import *
from flask_security import *
from flask_login import *
from flask_socketio import *
from unidecode import unidecode
from functools import wraps
import time
import requests
import json
import thread
import subprocess
global current_path
current_path= []

app = Flask(__name__)
app.secret_key = 'xxxxyyyyyzzzzz'
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

socketio = SocketIO(app)

private_token = '8fH8Vs4WNpYhVUBPzq5g'
risks = []

@socketio.on('disconnect')
def disconnect_user():
    session.pop('logged_in', None)

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
    global image_url

    if "private_token" in response.json():
        print(response.content)
        print("token = "+response.json()['private_token'])
        private_token = response.json()['private_token']
        image_url = response.json()['avatar_url']
        return private_token
    return False

@app.route('/login', methods=['GET', 'POST'])
def login_page():
    response = {'logged': 'false',
                'token': '', 'image_url': ''}
    if 'logged_in' in session:
        return "you're already logged in"
    if request.method == 'POST':
        if valid_login(request.json['username'], request.json['password']) :
            token = valid_login(request.json['username'], request.json['password'])
            session['logged_in'] = True
            response['logged'] = 'true'
            response['token'] = str(token)
            response['image_url'] = image_url
    return json.dumps(response)

@app.route('/logged')
@login_required
def logged():
    return "acabaste de logar!" 

@app.route('/logout')
@login_required
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login_page'))

def make_get_request(path, private_token):
    request_url = 'https://git.dei.uc.pt/api/v3'
    if "?" not in path:
        response = requests.get(request_url + path + '?private_token={private_token}'.format(private_token=private_token))
    else:
        response = requests.get(request_url + path + '&private_token={private_token}'.format(private_token=private_token))

    return response


# id = 737
@app.route('/get_project', methods=['GET', 'POST'])
def get_project_id():
    path = '/projects'
    if request.method == 'POST':
        index = request.json['index']
        token = request.json['token']
    project_id = (make_get_request(path,token)).json()[int(index)]['id']
    return json.dumps(project_id)

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
    project_id = get_project_id(0)
    path = 'projects/{id}/repository/files?file_path={f}&ref={b}'.format(id=project_id, f=file_path, b=branch)
    response = make_get_request(path)

    return response.json()["last_commit_id"]

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
            error = "Oops! Invalid credentials."
        else:
            return redirect(url_for('list_projects'))
    return render_template('login.html', error=error)


@app.route("/")
#@login_required
def home():
    return "Hello WORLD! Login Sucessful!"


@login_manager.unauthorized_handler
def unauthorized():
    return redirect(url_for('login'))


@app.route('/testing')
def repo_files():
    project_id = get_project_id(0)
    file_path = 'app.py'
    path = '/projects/{project_id}/repository/files?file_path={f}&ref=d2c40026052ca2ce1d7cf7ad40c4d6f39cec5141'.format(project_id=project_id,f=file_path)
    response = make_get_request(path, '8fH8Vs4WNpYhVUBPzq5g')

    adds, dels = get_commit_stats(project_id, response.json()['commit_id'])
    #return "Additions: {a} Deletions {d}".format(a=adds, d=dels)
    return response.content


@app.route('/projects', methods=['GET', 'POST'])
def list_projects():
    path = '/projects'
    if request.method == 'POST':
        token = request.json['token'] 
    response = make_get_request(path, str(token))
    return response.content

@app.route('/project_name', methods=['GET', 'POST'])
def get_project_name():
    path = '/projects'
    if request.method == 'POST':
        token = request.json['token'] 
        index = request.json['index']
    response = make_get_request(path, str(token))
    return response.json()[int(index)]['name']



@app.route('/projects/files')
def list_project_files():
    project_id = get_project_id(0)
    path = '/projects/{project_id}/repository/tree'.format(project_id=project_id)
    response = make_get_request(path, '8fH8Vs4WNpYhVUBPzq5g')

    return response.content


@app.route('/projects/branches')
def get_project_branches():
    project_id = get_project_id(0)
    path = '/projects/{project_id}/repository/branches'.format(project_id=project_id)
    response = make_get_request(path, '8fH8Vs4WNpYhVUBPzq5g')
    print response.content
    return response.content




# Precisa do id do ficheiro para mostrar o conteúdo
@app.route('/projects/files/content')
def get_file_content():
    file_path = 'project/app.py'
    project_id = get_project_id(0)
    blob_id = get_blob_id(project_id, file_path)
    path = '/projects/{project_id}/repository/raw_blobs/{blob_id}'.format(project_id=project_id, blob_id=blob_id)
    response = make_get_request(path, '8fH8Vs4WNpYhVUBPzq5g')

    if ".html" in file_path:
        string = str(response.content)
        string = string[2:]
        string = "<textarea rows=\"25\" cols =\"75\">"+string+"</textarea>"
        return string
    return response.content


@app.route('/projects/folders', methods=["GET", "POST"])
def list_folder_files():
    files = {}
    s = ''
    if request.method == "POST":
        checker = request.json['check']
        project_id = request.json['projectID'] 
        token = request.json['token']
        print token
        if(checker == 1):
            path=request.json['folder']
            if(path != ''):
                current_path.append(str(path) + "/")
                for file in current_path:
                    s += str(file)
                path = '/projects/{project_id}/repository/tree?path={s}'.format(project_id=int(project_id), s=s)
            else:
                current_path.pop()
                for file in current_path:
                    s += str(file)
                path = '/projects/{project_id}/repository/tree?path={s}'.format(project_id=int(project_id),path=path, s=s)
            response = make_get_request(path, str(token))
        elif(checker == 0):
            path = '/projects/{project_id}/repository/tree'.format(project_id=project_id)
            response = make_get_request(path, str(token))
    for file in response.json():
        files.update({file['name']:file['type']})

    return json.dumps(files)


@app.route('/projects/members', methods=["GET", "POST"])
def list_project_members():
    project_id = request.json['projectID'] 
    token = request.json['token']
    path = '/projects/{project_id}/members'.format(project_id=int(project_id))
    response = make_get_request(path, str(token))

    contributors = []
    for contributor in response.json():
        contributors.append(unidecode(contributor['name']))

    return json.dumps(contributors)


@app.route('/projects/commits', methods=["GET", "POST"])
def list_commits():
    index = request.json['index']
    project_id = request.json['projectID'] 
    private_token = request.json['token']
    page = request.json['page']
    path = '/projects/{project_id}/repository/commits'.format(project_id = int(project_id))

    request_url = 'https://git.dei.uc.pt/api/v3'
    response = requests.get(request_url + path + '?private_token={private_token}&page={page}'.format(private_token=str(private_token), page=int(page)))

    return response.content


@app.route('/projects/contributors', methods=["GET", "POST"])
def list_project_contributors():    # and their stats (additions, deletions)
    response = subprocess.Popen(["sh", "contributors.sh"], stdout=subprocess.PIPE).communicate()[0] 
    return json.dumps(response)

@app.route('/projects/weekly_contributions', methods=["GET", "POST"])
def get_weekly_contributions():
    index = request.json['index']
    project_id = request.json['projectID'] 
    path = '/projects/{project_id}/repository/commits?page=1&per_page=100'.format(project_id = int(project_id))
    path2 = '/projects/{project_id}/repository/commits?per_page=100'.format(project_id = int(project_id))
    private_token = request.json['token']
    response = make_get_request(path, str(private_token))
    response2 = make_get_request(path2, str(private_token))
    commits_per_week = [] 
    for i in range(14):
        commits_per_week.append(0);
    for commit in response.json():
        day = commit['created_at'][8] + commit['created_at'][9]
        month = commit['created_at'][5] + commit['created_at'][6] 
        week = check_week(day, month)
        commits_per_week[week-1] += 1
    if(response2):
        for commit in response2.json():
            day = commit['created_at'][8] + commit['created_at'][9]
            month = commit['created_at'][5] + commit['created_at'][6] 
            week = check_week(day, month)
            commits_per_week[week-1] += 1

    return json.dumps(commits_per_week)

@app.route('/create_risk', methods=["GET", "POST"])
def create_risk():
    if request.method == 'POST':
        risks.append(request.get_json())
        return "Success"
    else:
        if risks:
            print risks[0]
            return json.dumps(risks.pop(0)) 
        else:
            return "False"

def check_week(day, month):
    day = int(day)
    month = int(month)

    if(day >= 12 and day <= 18 and month == 9):
        return 1 
    elif(day >= 19 and day <= 25 and month == 9):
        return 2
    elif((day >= 26 and day <= 30 and month == 9) or (day >= 1 and day <= 2 and month == 10)): 
        return 3
    elif(day >= 3 and day <= 9 and month == 10): 
        return 4
    elif(day >= 10 and day <= 16 and month == 10): 
        return 5
    elif(day >= 17 and day <= 23 and month == 10): 
        return 6
    elif(day >= 24 and day <= 30 and month == 10): 
        return 7
    elif((day >= 31 and month == 10) or (day >= 1 and day <= 6 and month == 11)): 
        return 8
    elif(day >= 7 and day <= 13 and month == 11): 
        return 9
    elif(day >= 14 and day <= 20 and month == 11): 
        return 10
    elif(day >= 21 and day <= 27 and month == 11): 
        return 11
    elif((day >= 28 and day <= 30 and month == 11) or (day >= 1 and day <= 4 and month == 12)): 
        return 12
    elif(day >= 5 and day <= 11  and month == 12): 
        return 13
    else:
        return 14

if __name__ == '__main__':
    http_server = WSGIServer(('', 5000), app)
    http_server.serve_forever()

