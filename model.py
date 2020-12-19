"""Models for Spotify App."""
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass

db = SQLAlchemy()

@dataclass
class User(db.Model):
    """A user."""
    user_id: int
    fname: str
    lname: str
    email: str
    password: str

    __tablename__ = "users"

    user_id = db.Column(db.Integer, 
                        autoincrement=True,
                        primary_key=True)

    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


@dataclass
class Nomination(db.Model):
    """A Shoppie Nomination."""
    nomination_id: int
    title: str
    release_year: str
    poster: str
    imdb_id: str
    nominator: int
    
    __tablename__ = "nominations"

    nomination_id = db.Column(db.Integer, 
                              autoincrement=True, 
                              primary_key=True)
    title = db.Column(db.String, nullable=False)
    release_year = db.Column(db.String)
    poster = db.Column(db.String)
    imdb_id = db.Column(db.String)

    # id of user who nominated the movie
    nominator = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    def __repr__(self):
        return f"<Nomination nomination_id={self.nomination_id} title={self.title}>"


def connect_to_db(flask_app, db_uri='postgresql:///shoppies_db', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')

if __name__ == '__main__':
    from server import app

    connect_to_db(app)
