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
    url = f"http://www.omdbapi.com/?s={movie_search_term}&type=movie&apikey={OMDB_KEY}"

    response = requests.get(url)
    
    return response.json()

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

    nomination = Nomination.query.filter(
            Nomination.imdb_id == imdb_id, 
            Nomination.nominator == nominator).first()
    
    db.session.delete(nomination)
    db.session.commit()


if __name__ == '__main__':
    from server import app
    connect_to_db(app)