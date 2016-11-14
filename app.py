# coding=utf-8
from flask import *
from flask_security import *
from flask_login import *
from unidecode import unidecode
import requests
import json
global current_path
current_path= []


app = Flask(__name__)
app.secret_key = 'xxxxyyyyyzzzzz'
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


def make_get_request(path, private_token):
    request_url = 'https://git.dei.uc.pt/api/v3'
    if "?" not in path:
        response = requests.get(request_url + path + '?private_token={private_token}'.format(private_token=private_token))
    else:
        response = requests.get(request_url + path + '&private_token={private_token}'.format(private_token=private_token))

    return response


# id = 737
def get_project_id(index):
    path = '/projects'
    return (make_get_request(path, '8fH8Vs4WNpYhVUBPzq5g')).json()[index]['id']


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


@app.route('/projects')
def list_projects():
    path = '/projects'
    response = make_get_request(path, '8fH8Vs4WNpYhVUBPzq5g')


    return response.json()[0]['name']


@app.route('/projects/files')
def list_project_files():
    project_id = get_project_id(0)
    path = '/projects/{project_id}/repository/tree'.format(project_id=project_id)
    response = make_get_request(path, '8fH8Vs4WNpYhVUBPzq5g')

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
    project_id = get_project_id(0)
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
        response = make_get_request(path, '8fH8Vs4WNpYhVUBPzq5g')
    elif request.method == "GET":
        path = '/projects/{project_id}/repository/tree'.format(project_id=project_id)
        response = make_get_request(path, '8fH8Vs4WNpYhVUBPzq5g')
    for file in response.json():
        files.update({file['name']:file['type']})

    return json.dumps(files)


@app.route('/projects/members')
def list_project_members():
    project_id = get_project_id(0)
    path = '/projects/{project_id}/members'.format(project_id=project_id)
    response = make_get_request(path, '8fH8Vs4WNpYhVUBPzq5g')

    contributors = []
    for contributor in response.json():
        contributors.append(unidecode(contributor['name']))

    return json.dumps(contributors)


@app.route('/projects/commits', methods=["GET", "POST"])
def list_commits():
    index = request.json['index']
    project_id = get_project_id(index)
    private_token = request.json['private_token']
    path = '/projects/{project_id}/repository/commits'.format(project_id = project_id)
    response = make_get_request(path, private_token)

    return response.content


@app.route('/projects/contributors')
def list_project_contributors():    # and their stats (additions, deletions)
    project_id = get_project_id(0)
    path = '/projects/{id}/repository/contributors'.format(id=project_id)
    response = make_get_request(path, '8fH8Vs4WNpYhVUBPzq5g')


    return response.content

@app.route('/projects/weekly_contributions', methods=["GET", "POST"])
def get_weekly_contributions():
    index = request.json['index']
    project_id = get_project_id(index)
    path = '/projects/{project_id}/repository/commits?per_page=100'.format(project_id = project_id)
    private_token = request.json['private_token']
    response = make_get_request(path, private_token)
    commits_per_week = [] 
    for i in range(13):
        commits_per_week.append(0);
    for commit in response.json():
        day = commit['created_at'][8] + commit['created_at'][9]
        month = commit['created_at'][5] + commit['created_at'][6] 
        week = check_week(day, month)
        commits_per_week[week-1] += 1

    return json.dumps(commits_per_week)

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

if __name__ == '__main__':
    app.run(threaded=True, debug=True)
