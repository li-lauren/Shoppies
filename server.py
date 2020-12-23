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
        "err": "", 
        "nominations": None
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
            # check for existing nominations
            login_results["nominations"] = crud.get_nomination_imdb_ids(user.user_id)

        else:
            login_results["err"] = "Incorrect password. Please try again."
    else:
        # No user found in DB
        login_results["err"] = "No user associated with that email."
    
    return jsonify(login_results)


@app.route("/logout")
def logout():
    """User Logout / Remove from Session."""

    session.pop("user_id", None)


@app.route("/nominations")
def get_nominations():
    """Get a list of the user's nominations."""

    nominations = crud.get_nominations_by_user_id(session["user_id"])

    return jsonify(nominations)


@app.route("/nominations", methods=['POST'])
def nominate_movie():
    """Create a movie nomination."""

    nominator = session["user_id"]
    title = request.json.get("title")
    release_year = request.json.get("year")
    poster = request.json.get("poster")
    imdb_id = request.json.get("imdb_id")

    nomination = crud.create_nomination(
        title, 
        release_year, 
        poster, 
        imdb_id, 
        nominator
    )

    return "Success" if nomination else "Error"


@app.route("/nominations/delete/<imdb_id>")
def delete_nomination(imdb_id):
    """Remove a user's nomination."""

    user_id = session['user_id']

    result = crud.remove_nomination(imdb_id, user_id)

    return result


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

    search_res = crud.get_movies_by_title(movie_search_term)

    return search_res


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)