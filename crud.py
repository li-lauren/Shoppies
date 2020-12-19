"""CRUD operations."""

from model import db, connect_to_db, User, Nomination

import os

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


if __name__ == '__main__':
    from server import app
    connect_to_db(app)