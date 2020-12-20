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

    return jsonify(login_results)


@app.route("/logout")
def logout():
    """User Logout / Remove from Session."""

    # Update user's nominated movies
    user_id = session["user_id"]
    newest_nominated_movies = request.json.get("nominatedMovieIDs")
    crud.update_nominated_movies(newest_nominated_movies, user_id)

    session.pop("user_id", None)


@app.route("/users", methods=['POST'])
def user_signup():
    """Register a new user."""
    fname = request.json.get("fname")
    lname = request.json.get("lname")
    email = request.json.get("email")
    password = request.json.get("password")

    signup_res = {
        "success_msg": "", 
        "error_msg": ""
    }

    if crud.get_user_by_email(email):
        # user already exists
        signup_res["error_msg"] = "A user already exists with that email."
    else:
        # add user to database
        crud.create_user(fname, lname, email, password)
        signup_res["success_msg"] = "Welcome to the Shoppies!"

    return signup_res


@app.route("/search/<movie_search_term>")
def search_for_movies(movie_search_term):
    """Search for and return movies by title."""

    movies = crud.get_movies_by_title(movie_search_term)

    return movies


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)