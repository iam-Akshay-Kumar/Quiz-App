from flask import Blueprint, request, jsonify
from .models import db, QuizScore, User

quiz_bp = Blueprint("quiz_bp", __name__)

@quiz_bp.route("/submit_score", methods=["POST"])
def submit_score():
    data = request.json
    user = User.query.get(data["user_id"])
    if not user:
        return jsonify({"message":"User not found"}), 404

    new_score = QuizScore(user_id=user.id, score=data["score"])
    db.session.add(new_score)
    db.session.commit()
    return jsonify({"message":"Score saved!"}), 200

@quiz_bp.route("/scores/<int:user_id>", methods=["GET"])
def get_user_scores(user_id):
    scores = QuizScore.query.filter_by(user_id=user_id).all()
    return jsonify([{"score":s.score, "date":s.date} for s in scores])
