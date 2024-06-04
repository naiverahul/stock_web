from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO
import pandas as pd
import yfinance as yf

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_data', methods=['POST'])
def get_data():
    stock_symbol = request.form['stock_symbol']
    start_date = request.form['start']
    end_date = request.form['end']
    histdf = yf.download(stock_symbol, start=start_date, end=end_date)
    histdf.reset_index(inplace=True)
    data = histdf.to_dict(orient='list')
    return jsonify(data)

if __name__ == '__main__':
    socketio.run(app)
