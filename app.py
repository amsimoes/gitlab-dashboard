from flask import Flask
import requests
import json

app = Flask(__name__)

def make_get_request(path):
    private_token = '8fH8Vs4WNpYhVUBPzq5g'
    request_url = 'https://git.dei.uc.pt/api/v3'
    response = requests.get(request_url + path + '?private_token={private_token}'.format(private_token=private_token))

    return response


def get_project_id():
    path = '/projects'
    return (make_get_request(path)).json()[0]['id']


def get_project_name():
    path = '/projects'
    return (make_get_request(path)).json()[0]['name']


def get_build_id(project_id):
    path = '/builds'
    return (make_get_request(path)).json()[project_id]['id']


@app.route('/commits')
def list_commits():
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits'.format(project_id = project_id)
    response = make_get_request(path)

    for commits in response.json():
        print(commits['author_email'])

    return response.content


@app.route('/commits/user')
def list_commits_by_user():
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits'.format(project_id = project_id)
    response = make_get_request(path)

    for commits in response.json():
        if commits['author_email'] == "asimoes@student.dei.uc.pt":
            print(commits['title'])

    return "todo"


@app.route('/commits/user/diff')
def list_diffs_user():
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits/{commit_id}/diff'.format(project_id=project_id, commit_id='master')
    response = make_get_request(path)

    return response.content

    
@app.route('/')
def list_projects():
    path = '/projects'
    response = make_get_request(path)

    print(response.json()[0]['default_branch'])

    return response.content


@app.route('/projects')
def list_project_files():
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/tree'.format(project_id=project_id)
    response = make_get_request(path)

    for file in response.json():
        print(file['name'])

    return response.content


@app.route('/projects/builds')
def list_project_builds():
    project_id = get_project_id()
    path = '/projects/{project_id}/builds'.format(project_id=project_id)
    response = make_get_request(path)

    if not response:
        return 'Project {project_name} has no builds.'.format(project_name=get_project_name())
    return response.content


@app.route('/projects/branches')
def list_project_branches():
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/branches'.format(project_id=project_id)
    response = make_get_request(path)

    return response.json()[0]['name']


@app.route('/projects/members')
def list_project_members():
    project_id = get_project_id()
    path = '/projects/{project_id}/members'.format(project_id=project_id)
    response = make_get_request(path)

    return response.content


if __name__ == '__main__':
    app.run()
