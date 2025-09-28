from flask import Blueprint, jsonify, request
import json, os

users_bp = Blueprint("users", __name__)
DATA_FILE = os.path.join("data", "users.json")

def load_users():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_users(users):
    with open(DATA_FILE, "w") as f:
        json.dump(users, f, indent=2)

@users_bp.route("/", methods=["GET"])
def get_users():
    return jsonify(load_users())

@users_bp.route("/favorites/<username>", methods=["GET"])
def get_favorites(username):
    users = load_users()
    user = next((u for u in users if u["username"] == username), None)
    return jsonify(user.get("favorites", [])) if user else ({"error": "User not found"}, 404)

@users_bp.route("/favorites/<username>", methods=["POST"])
def add_favorite(username):
    movie_id = request.json.get("movie_id")
    users = load_users()
    user = next((u for u in users if u["username"] == username), None)

    if not user:
        return {"error": "User not found"}, 404
    
    if movie_id not in user["favorites"]:
        user["favorites"].append(movie_id)
    
    save_users(users)
    return jsonify(user)
