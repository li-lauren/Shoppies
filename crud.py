"""CRUD operations."""

from model import db, connect_to_db, User, Nomination

import os

### USER CRUD OPS ###

def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()

if __name__ == '__main__':
    from server import app
    connect_to_db(app)