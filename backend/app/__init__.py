from flask import Flask
from .models import db
from flask_cors import CORS
import os


def create_app():
    app = Flask(__name__)

    basedir = os.path.abspath(os.path.dirname(__file__))
    db_path = os.path.join(basedir, "instance", "quiz.db")
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True, methods=["GET","POST","OPTIONS"])

    with app.app_context():
        db.create_all()

    from app.auth import auth_bp
    from app.quiz_routes import quiz_bp
    from app.leaderboard import leaderboard_bp

    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(quiz_bp, url_prefix="/api")
    app.register_blueprint(leaderboard_bp, url_prefix="/api")

    return app
