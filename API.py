from flask import Flask
import requests
import json
import getpass

request_url = "https://git.dei.uc.pt/api/v3"

app = Flask(__name__)

def get_data_from_user(token, path):
    return requests.get(request_url + path + "?private_token={private_token}".format(private_token=token))

def get_private_token(name, password):
    return requests.post(request_url + "/session", data = {"login":name, "password":password}).json()["private_token"]

@app.route("/")
def list_projects():
    path = "/projects"
    return get_data_from_user(prvt_token,path).content

if __name__ == "__main__":
    while True:
        print ("Request method:")
        print ("0 - Token")
        print ("1 - Name/Password")
        opt = int(raw_input("Method ? "))
        global prvt_token
        if (opt == 0):
            prvt_token = raw_input("Token = ")
            break
        elif (opt == 1):
            user_name = raw_input("Name = ")
            user_pw = getpass.getpass("Password = ")
            prvt_token = get_private_token(user_name,user_pw)
            break
    
    print prvt_token
    app.run()

