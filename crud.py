"""CRUD operations."""

from model import db, connect_to_db, User, Nomination

import os
import requests

OMDB_KEY = os.environ['OMDB_KEY']

### USER CRUD OPS ###

def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()


def create_user(fname, lname, email, password):
    """Create a new user."""

    user = User(
        fname = fname,
        lname = lname,
        email = email,
        password = password
    )

    db.session.add(user)
    db.session.commit()

    return user


### MOVIE CRUD OPS ###

def get_movies_by_title(movie_search_term):
    """Query OMDB API for movies with titles including the search term."""

    # asterisk following search term allows for wildcard results
    # otherwise we are restricted to exact matches
    url = f"http://www.omdbapi.com/?s={movie_search_term}*&type=movie&apikey={OMDB_KEY}"

    response = requests.get(url).json()

    # default json response from OMDB when there are too many search results
    limit_res = {"Response":"False","Error":"Too many results."}

    # default json response when there are no matches
    no_matches = {"Response":"False","Error":"Movie not found!"}

    search_info = {
        "res" : None,
        "error" : None, 
    }


    if response == limit_res:
        search_info["error"] = "Too many movies. Try a longer title for better results!"
    elif response == no_matches:
        search_info["error"] = "No movies found."
    else: 
        search_info["res"] = response

    print(search_info)

    return search_info


### NOMINATION CRUD OPS ###

def create_nomination(title, release_year, poster, imdb_id, nominator):
    """Create a nomination."""

    nomination = Nomination(
        title = title,
        release_year = release_year,
        poster = poster,
        imdb_id = imdb_id,
        nominator = nominator
    )

    db.session.add(nomination)
    db.session.commit()

    return nomination


def remove_nomination(imdb_id, nominator):
    """Remove a nomination."""

    result = "Success"

    nomination = Nomination.query.filter(
            Nomination.imdb_id == imdb_id, 
            Nomination.nominator == nominator).first()

    if not nomination:
        # no nomination was found
        result = "No pre-existing nomination."
    
    db.session.delete(nomination)
    db.session.commit()

    return result


def get_nomination_imdb_ids(user_id):
    """Create a list of imdb ids for all of a user's nominated movies."""

    nomination_imdb_ids = db.session.query(Nomination.imdb_id).\
        filter(Nomination.nominator == user_id).all()

    return nomination_imdb_ids


def get_nominations_by_user_id(user_id):
    """Get all of a user's nominations."""

    return Nomination.query.filter(Nomination.nominator == user_id).all()


if __name__ == '__main__':
    from server import app
    connect_to_db(app)