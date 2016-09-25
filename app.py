from flask import Flask
import requests
import json

app = Flask(__name__)

def make_get_request(path):
    private_token = '8fH8Vs4WNpYhVUBPzq5g'
    request_url = 'https://git.dei.uc.pt/api/v3'
    response = requests.get(request_url + path + '?private_token={private_token}'.format(private_token=private_token))

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
            additions, deletions = get_commit_stats(str(commits['id']))
            adds += additions
            dels += deletions

    return count, adds, dels


def get_commit_stats(commit_id):
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits/{sha}'.format(project_id=project_id, \
            sha=commit_id)
    response = make_get_request(path)
    additions = response.json()['stats']['additions']
    deletions = response.json()['stats']['deletions']

    return additions, deletions


def get_file_diff(commit_id):
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits/{sha}/diff'.format(project_id=project_id, \
            sha=commit_id)
    response = make_get_request(path)
    f_name = ''

    if len(str(response.content)) < 10: # Pode aparecer um commit vazio (sem modificacao nenhuma)
        return 'nothing'
    else:
        f_name = response.json()[0]["new_path"]
        print(f_name)
        if "/" in f_name:   # Em caso do ficheiro estar dentro de alguma pasta (por testar)
            f_name = f_name.split("/")
            return f_name[:-1]
        else:
            return f_name


def get_commits_per_file(file_name):
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits'.format(project_id = project_id)
    response = make_get_request(path)
    count = 0

    for commits in response.json():
        if get_file_diff(str(commits['id'])) == file_name:
            count += 1
    return count


@app.route('/')
def welcome():
    return 'Se tens zig entras. Se não, boa noite.'


@app.route('/projects')
def list_projects():
    path = '/projects'
    response = make_get_request(path)

    print(response.json()[0]['default_branch'])

    return response.content


@app.route('/projects/files')
def list_project_files():
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/tree'.format(project_id=project_id)
    response = make_get_request(path)

    for file in response.json():
        print(file['name'])

    return response.content


# Lista o numero de commits por ficheiro (Tá a bombar, mas tá lento pa crl)
@app.route('/projects/files/commits')
def list_file_commits():
    file_name = "app.py"
    commits = get_commits_per_file(file_name)

    return file_name+" | Number of commits: "+str(commits)


@app.route('/projects/members')
def list_project_members():
    project_id = get_project_id()
    path = '/projects/{project_id}/members'.format(project_id=project_id)
    response = make_get_request(path)

    return response.content


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
