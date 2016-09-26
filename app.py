from flask import Flask, render_template
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


def get_commit_stats(project_id, commit_id):
    path = '/projects/{project_id}/repository/commits/{sha}'.format(project_id=project_id, \
            sha=commit_id)
    response = make_get_request(path)
    additions = response.json()['stats']['additions']
    deletions = response.json()['stats']['deletions']

    return additions, deletions


def get_file_diff(project_id, commit_id):
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


def get_stats_per_file(file_name):
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits'.format(project_id = project_id)
    response = make_get_request(path)
    commit_count = additions = deletions = 0

    for commits in response.json():
        if get_file_diff(project_id, str(commits['id'])) == file_name:
            commit_count += 1
            adds, dels = get_commit_stats(project_id, str(commits['id']))
            additions += adds
            deletions += dels
    return commit_count, additions, deletions


@app.route('/')
def welcome():
    return render_template('hello.html')


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

    for file in response.json():
        print(file['name'])

    return response.content


@app.route('/projects/files/commits')
def list_file_commits():
    file_name = "app.py"
    commits, additions, deletions = get_stats_per_file(file_name)

    return "{f} | {c} Commits {a} Additions {d} Deletions".format(f=file_name,c=commits,a=additions,d=deletions)


@app.route('/projects/members')
def list_project_members():
    project_id = get_project_id()
    path = '/projects/{project_id}/members'.format(project_id=project_id)
    response = make_get_request(path)
    
    contributors = []
    for contributor in response.json():
        contributors.append(contributor['name'])

    print json.dumps(contributors)
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
