from flask import Flask
import requests
import json

app = Flask(__name__)

private_token = '8fH8Vs4WNpYhVUBPzq5g' 

#TODO: method to get project ID?

def make_get_request(path):

    request_url = 'https://git.dei.uc.pt/api/v3'
    response = requests.get(request_url + path + '?private_token={private_token}'.format(private_token=private_token))
    
    return response

@app.route('/')
def hello_world():
    path = '/projects' 
    response = make_get_request(path)

    print(response.json()[0]['default_branch'])

    return response.content 


@app.route('/projects')
def list_project_files():

    path = '/projects/737/repository/tree'
    response = make_get_request(path)

    for file in response.json():
        print(file['name'])

    return response.content

if __name__ == '__main__':
    app.run()
