import imp


from flask import Flask, jsonify, request

from run_search import search
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/search", methods=['POST'])
def hello():
    keyword = request.json['keyword']
    articles = search(keyword)
    return jsonify(articles)
