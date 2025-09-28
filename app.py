from flask import Flask, jsonify
from flask_cors import CORS
from routes.movies import movies_bp
from routes.users import users_bp

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(movies_bp, url_prefix="/api/movies")
app.register_blueprint(users_bp, url_prefix="/api/users")

@app.route("/")
def index():
    return jsonify({"message": "ReelNest API is running 🚀"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
