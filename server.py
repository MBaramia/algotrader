import os
from flask import Flask, render_template

app = Flask(__name__)

api_key = os.environ.get('ALPHAVANTAGE_API_KEY')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
