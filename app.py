###################################################
### Imports
###################################################
from flask import Flask,render_template, request, session
import random
import string

###################################################
### Helper functions
###################################################
LETTERS = string.ascii_lowercase
def get_random_string(l=10):
    return  ''.join(random.choice(LETTERS) for i in range(10))

###################################################
### Flask init
###################################################
app = Flask(__name__)
app.secret_key = get_random_string()


###################################################
### Requests handler
###################################################

@app.route("/")
def hello_world():
    return "<p>Hello, Ohad Dan!</p>"

@app.route("/main")
def hello_test():
    return render_template('main.html')

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    if request.method == 'GET':
        return render_template('hello.html', name=name, var=5)
    else:
        return render_template('hello.html', var=5)

@app.route('/handle_request')
def handle_request():
    if request.method == 'POST':
        return render_template('hello.html')
    else:
        return "hi"

@app.route('/next_page')
def go_to_next_page():
    current_block_name = session['block_order'][session['block_number']]
    session['block_number'] += 1
    if 'exp' in current_block_name:
        return render_template('main.html', distribution=current_block_name)
    elif 'block_break' == current_block_name:
        return render_template('block_break.html')

@app.route('/welcome')
def welcome_page():
    session['block_order'] = ['instructions_welcome', 'exp_rewards_same', 'block_break', 'exp_rewards_negative']
    session['block_number'] = 1
    return render_template('welcome.html')

@app.route('/demo')
def demo():
    if 'x' not in session:
        session['x'] = 5
    if request.method == 'GET':
        session['x'] = session['x'] + 1
        return render_template('hello.html', name='ohad', var=session['x'])
    else:
        return render_template('hello.html', var=session['x'])
