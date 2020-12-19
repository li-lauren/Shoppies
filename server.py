from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify, make_response)

import os
from model import connect_to_db
import crud

FLASK_SECRET_KEY = os.environ['FLASK_SECRET_KEY']

app = Flask(__name__)
app.secret_key = FLASK_SECRET_KEY

@app.route('/')
def index():
    """Home page."""
    return render_template('index.html')


@app.route('/login', methods=['POST'])
def login():
    """Verify credentials and login a user."""

    email = request.json.get("email")
    password = request.json.get("password")

    user = crud.get_user_by_email(email)

    login_results = {
        "user": None, 
        "err": ""
    }

    if user:
        if user.password == password:
            # user is verified, add to flask session
            session["user_id"] = user.user_id
            login_results["user"] = {
                "fname" : user.fname,
                "lname" : user.lname, 
                "user_id" : user.user_id
            }
        else:
            login_results["error"] = "Incorrect password. Please try again."
    else:
        # No user found in DB
        login_results["error"] = "No user associated with that email."
        

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)