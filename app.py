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

@app.route('/commits')
def list_commits():
    project_id = get_project_id()
    path = '/projects/{project_id}/repository/commits'.format(project_id = project_id)
    response = make_get_request(path)

    for commits in response.json():
        print(commits['title'])
    
    return ('success!')
 

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

if __name__ == '__main__':
    app.run()
