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


@app.route("/users", methods=['POST'])
def user_signup():
    """Register a new user."""
    fname = request.json.get("fname")
    lname = request.json.get("lname")
    email = request.json.get("email")
    password = request.json.get("password")

    signup_res = {
        "success_msg": "", 
        "error_msg": "", 
        "user_id": ""
    }

    if crud.get_user_by_email(email):
        # user already exists
        signup_res["error_msg"] = "A user already exists with that email."
    else:
        # add user to database
        new_user = crud.create_user(fname, lname, email, password)
        signup_res["success_msg"] = "Welcome to the Shoppies!"
        signup_res["user_id"] = str(new_user.user_id)

    return signup_res


@app.route("/logout")
def logout():
    """User Logout / Remove from Session."""

    session.pop("user_id", None)


@app.route("/nominations/<user_id>")
def get_nominations(user_id):
    """Get a list of the user's nominations."""

    nominations = crud.get_nominations_by_user_id(int(user_id))
    print(jsonify(nominations))

    return jsonify(nominations)


@app.route("/nominations", methods=['POST'])
def nominate_movie():
    """Create a movie nomination."""

    nominator = request.json.get("nominator")
    title = request.json.get("title")
    release_year = request.json.get("year")
    poster = request.json.get("poster")
    imdb_id = request.json.get("imdb_id")

    nomination = crud.create_nomination(
        title, 
        release_year, 
        poster, 
        imdb_id, 
        int(nominator)
    )

    return "Success" if nomination else "Error"


@app.route("/nominations/delete", methods=['POST'])
def delete_nomination():
    """Remove a user's nomination."""

    nominator = int(request.json.get("nominator"))
    imdb_id = request.json.get("imdb_id")

    result = crud.remove_nomination(imdb_id, nominator)

    return result


@app.route("/search/<movie_search_term>")
def search_for_movies(movie_search_term):
    """Search for and return movies by title."""

    search_res = crud.get_movies_by_title(movie_search_term)

    return search_res

PORT = int(os.environ.get("PORT", 5000))
DEBUG = "NO_DEBUG" not in os.environ

if __name__ == '__main__':
    connect_to_db(app, os.environ.get("DATABASE_URL"))
    app.run(host='0.0.0.0', port=PORT, debug=DEBUG)