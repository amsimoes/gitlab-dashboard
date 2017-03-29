# Gitlab Dashboard

This project was made for a very *special* client, our Software Engineer teacher.

Frontend: React / Redux

Backend: Flask (Python 2)

# Introduction

This project was made for our SE subject.
The main goal was to provide a git dashboard for any repository hosted in GitDEI, our department's gitlab setup.
Wether it was a team project or a lone wolf dev, the dashboard will provide and report information regarding the team performance following the SCRUM Development Process.

All teams attending the subject had some different designated use cases to implement, therefore some functionalities of this dashboard were ported from other teams code (not the majority of it).

Login is made using the GitDEI user credentials.

# Configuration / Dependencies

First install the backend dependencies (python2 pip version):

$ pip -r requirements.txt

[BROKEN] Then the frontend:

$ npm install

# Running

Backend (will wait for React to start):

$ python app.py

Frontend:

$ npm start

And all will be running at port 3001 of your host.
