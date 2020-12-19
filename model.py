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
    pw: str
    img: str

    __tablename__ = "users"

    user_id = db.Column(db.Integer, 
                        autoincrement=True,
                        primary_key=True)

    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    pw = db.Column(db.String(30), nullable=False)

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


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
