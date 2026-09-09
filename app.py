from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

words = [
    "python",
    "javascript",
    "computer",
    "programming",
    "developer",
    "website",
    "hangman",
    "database",
    "keyboard",
    "internet"
]


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/new-game")
def new_game():
    word = random.choice(words)

    return jsonify({
        "word": word
    })


if __name__ == "__main__":
    app.run(debug=True)