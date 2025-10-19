from flask import Blueprint, jsonify
from .models import db, QuizScore, User
from sqlalchemy import func

leaderboard_bp = Blueprint("leaderboard", __name__)

@leaderboard_bp.route("/leaderboard", methods=["GET"])
def get_leaderboard():
    results = (
        db.session.query(User.username, func.max(QuizScore.score).label("max_score"))
        .join(QuizScore)
        .group_by(User.id)
        .order_by(func.max(QuizScore.score).desc())
        .limit(10)
        .all()
    )
    data = [{"username": r[0], "score": r[1]} for r in results]
    return jsonify(data)
