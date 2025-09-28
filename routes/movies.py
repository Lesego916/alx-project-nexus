from flask import Blueprint, jsonify
import json, os

movies_bp = Blueprint("movies", __name__)
DATA_FILE = os.path.join("data", "movies.json")

def load_movies():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

@movies_bp.route("/", methods=["GET"])
def get_movies():
    return jsonify(load_movies())

@movies_bp.route("/<int:movie_id>", methods=["GET"])
def get_movie(movie_id):
    movies = load_movies()
    movie = next((m for m in movies if m["id"] == movie_id), None)
    return jsonify(movie if movie else {"error": "Movie not found"})
