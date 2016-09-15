from flask import Flask
from flask import request
import requests
import json
import gitlab

app = Flask(__name__)

@app.route('/')
def hello_world():
    gl = gitlab.Gitlab('https://git.dei.uc.pt/', '8fH8Vs4WNpYhVUBPzq5g')
    gl.auth()
    #projects = gl.projects.list()
    #for project in projects:
    #    print(project.branches.list())

    response = requests.get('https://git.dei.uc.pt/api/v3/projects?private_token=8fH8Vs4WNpYhVUBPzq5g')

    #print(json.load(response))
    #return "hello"
    return (response).content
            
    


if __name__ == '__main__':
    app.run()
