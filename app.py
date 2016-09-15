from flask import Flask
from flask import request
import requests
import json
import gitlab

app = Flask(__name__)

private_token = '8fH8Vs4WNpYhVUBPzq5g' 

#TODO: method to get project ID
#TODO: method that only makes requests, to avoid code duplication

@app.route('/')
def hello_world():
    response = requests.get('https://git.dei.uc.pt/api/v3/projects?private_token={private_token}'.format(private_token=private_token))


    print(response.json()[0]['default_branch'])

    return response.content 


@app.route('/projects')
def list_project_files():
    response = requests.get('https://git.dei.uc.pt/api/v3/projects/737/repository/tree?private_token={private_token}'.format(private_token=private_token))

    for file in response.json():
        print(file['name'])

    return response.content

if __name__ == '__main__':
    app.run()
