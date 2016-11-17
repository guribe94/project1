#!/usr/bin/env python2.7

"""
Columbia W4111 Intro to databases
Example webserver

To run locally

    python server.py

Go to http://localhost:8111 in your browser


A debugger such as "pdb" may be helpful for debugging.
Read about it online.
"""

import os
from sqlalchemy import *
from sqlalchemy.pool import NullPool
from flask import Flask, request, render_template, g, redirect, Response, send_from_directory

tmpl_dir = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), 'templates')
app = Flask(__name__, template_folder=tmpl_dir)


#
# The following uses the postgresql test.db -- you can use this for debugging purposes
# However for the project you will need to connect to your Part 2 database in order to use the
# data
#
# XXX: The URI should be in the format of:
#
#     postgresql://USER:PASSWORD@<IP_OF_POSTGRE_SQL_SERVER>/postgres
#
# For example, if you had username ewu2493, password foobar, then the following line would be:
#
#     DATABASEURI = "postgresql://ewu2493:foobar@<IP_OF_POSTGRE_SQL_SERVER>/postgres"
#
# Swap out the URI below with the URI for the database created in part 2
DATABASEURI = "sqlite:///test.db"


#
# This line creates a database engine that knows how to connect to the URI above
#
engine = create_engine(DATABASEURI)


#
# START SQLITE SETUP CODE
#
# after these statements run, you should see a file test.db in your webserver/ directory
# this is a sqlite database that you can query like psql typing in the shell command line:
#
#     sqlite3 test.db
#
# The following sqlite3 commands may be useful:
#
#     .tables               -- will list the tables in the database
#     .schema <tablename>   -- print CREATE TABLE statement for table
#
# The setup code should be deleted once you switch to using the Part 2 postgresql database
#
engine.execute("""DROP TABLE IF EXISTS test;""")
engine.execute("""CREATE TABLE IF NOT EXISTS test (
  id serial,
  name text
);""")
engine.execute(
    """INSERT INTO test(name) VALUES ('grace hopper'), ('alan turing'), ('ada lovelace');""")
#
# END SQLITE SETUP CODE
#


@app.before_request
def before_request():
  """
  This function is run at the beginning of every web request
  (every time you enter an address in the web browser).
  We use it to setup a database connection that can be used throughout the request

  The variable g is globally accessible
  """
  try:
    g.conn = engine.connect()
  except:
    print "uh oh, problem connecting to database"
    import traceback; traceback.print_exc()
    g.conn = None


@app.teardown_request
def teardown_request(exception):
  """
  At the end of the web request, this makes sure to close the database connection.
  If you don't the database could run out of memory!
  """
  try:
    g.conn.close()
  except Exception as e:
    pass


#
# @app.route is a decorator around index() that means:
#   run index() whenever the user tries to access the "/" path using a GET request
#
# If you wanted the user to go to e.g., localhost:8111/foobar/ with POST or GET then you could use
#
#       @app.route("/foobar/", methods=["POST", "GET"])
#
# PROTIP: (the trailing / in the path is important)
#
# see for routing: http://flask.pocoo.org/docs/0.10/quickstart/#routing
# see for decorators: http://simeonfranklin.com/blog/2012/jul/1/python-decorators-in-12-steps/
#
@app.route('/')
def index():
  """
  request is a special object that Flask provides to access web request information:

  request.method:   "GET" or "POST"
  request.form:     if the browser submitted a form, this contains the data in the form
  request.args:     dictionary of URL arguments e.g., {a:1, b:2} for http://localhost?a=1&b=2

  See its API: http://flask.pocoo.org/docs/0.10/api/#incoming-request-data
  """

  # DEBUG: this is debugging code to see what request looks like
  print request.args

  #
  # example of a database query
  #
  cursor = g.conn.execute("SELECT name FROM test")
  names = []
  for result in cursor:
    names.append(result['name'])  # can also be accessed using result[0]
  cursor.close()

  #
  # Flask uses Jinja templates, which is an extension to HTML where you can
  # pass data to a template and dynamically generate HTML based on the data
  # (you can think of it as simple PHP)
  # documentation: https://realpython.com/blog/python/primer-on-jinja-templating/
  #
  # You can see an example template in templates/index.html
  #
  # context are the variables that are passed to the template.
  # for example, "data" key in the context variable defined below will be
  # accessible as a variable in index.html:
  #
  #     # will print: [u'grace hopper', u'alan turing', u'ada lovelace']
  #     <div>{{data}}</div>
  #
  #     # creates a <div> tag for each element in data
  #     # will print:
  #     #
  #     #   <div>grace hopper</div>
  #     #   <div>alan turing</div>
  #     #   <div>ada lovelace</div>
  #     #
  #     {% for n in data %}
  #     <div>{{n}}</div>
  #     {% endfor %}
  #
  context = dict(data=names)

  #
  # render_template looks in the templates/ folder for files.
  # for example, the below file reads template/index.html
  #
  return render_template("index.html", **context)


# http://stackoverflow.com/questions/20646822/how-to-serve-static-files-in-flask
# This works to serve js files but according to the question there are better ways
# to serve static files when expecting heavy use
@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)


@app.route('/img/<path:path>')
def send_images(path):
    return send_from_directory('img', path)

@app.route('/font/<path:path>')
def send_fonts(path):
    return send_from_directory('font', path)


######################## SINGLETON STORAGE FUNCTIONS  #########################


# Persistant storage singleton.
# Dict has the form {sessionID:info}
# SessionID is a unique UUID generated by Wit
session_info = {}


def _init_store(session_id):
    """

    This function initializes a data store for a new session id or does
    nothing if a data store already exists. This is an internal method and
    should not be directly called.

    """

    global session_info
    print "session info", session_info
    if session_id in session_info:
        pass
    else:
        s_info = {}
        session_info[session_id] = s_info


def get_user(session_id):
    """

    Returns data from data store if it exists, otherwise return None.

    """

    global session_info
    try:
        print "stored info", session_info[session_id]
        return session_info[session_id]
    except:
        return None


def isAuthenticated(session_id):
    """

    Checks if data is in the data store for a given session id and key. It does not verify the session id. Returns true if success data is present, false otherwise.

    """

    _init_store(session_id)
    global session_info
    try:
        if key in session_info[session_id]:
            return True
        else:
            return False

    except:
        return False

#
# def unAuthenticate(session_id):
#     global session_info
#

# API Functions


# Example of adding new data to the database
@app.route('/addPantryItem', methods=['POST'])
def addPantryItem():

  output = {}
  username = request.form['username']
  item = request.form['item']
  print "username", username
  print "item", item

  # TODO: Add this item to the users pantry
  # TODO: Get the new pantry and return it
  # jsonify(output)

  # cmd = 'INSERT INTO test(name) VALUES (:name1), (:name2)';
  # g.conn.execute(text(cmd), name1=name, name2=name);
  return jsonify(output)

 # Example of adding new data to the database


@app.route('/editPantryItem', methods=['POST'])
def editPantryItem():
    if (request.method == "POST"):
        output = {}
        # JSON data from the POST request
        user = request.form["username"]
        itemID = request.form["itemID"]
        newItem = request.form["item"]

        print "username given", user
        print "password given", itemID
        print "new item", newItem

        # TODO:Make the DB Query

    # TODO: Get the new pantry and return it
    # jsonify(output)
   # name = request.form['name']
   # print name
   # cmd = 'INSERT INTO test(name) VALUES (:name1), (:name2)';
   # g.conn.execute(text(cmd), name1 = name, name2 = name);
    return jsonify(output)



# Delete data to the database
@app.route('/deletePantryItem', methods=['POST'])
def deletePantryItem():

    if (request.method == "POST"):
        output = {}
        # JSON data from the POST request
        user = request.form["username"]
        itemID = request.form["itemID"]

        print "username given", user
        print "itemID given", itemID

        # TODO:Make the DB Query
    # TODO: Get the new pantry and return it
    # jsonify(output)



    #   name = request.form['name']
    #   print name
    #   cmd = 'INSERT INTO test(name) VALUES (:name1), (:name2)';
    #   g.conn.execute(text(cmd), name1 = name, name2 = name);
    #   return redirect('/')




# Send current data to app, whats in the pantry, database etc
@app.route('/sync', methods=['POST'])
def sync():
    """"
    A call to this function is made whenever the appliction connects to the database and when it needs to sync its state with the database
    """
    output = {}
    user = request.form['username']
  # TODO: Return pantry and recipes
  # print name
  # cmd = 'INSERT INTO test(name) VALUES (:name1), (:name2)';
  # g.conn.execute(text(cmd), name1 = name, name2 = name);
    return jsonify(output)



@app.route('/search', methods=['POST'])
def searchDatabase():
     """
     Search database according to given query
     """

     user = request.form['username']
     query = request.form['query']
     # TODO: DO THE SEARCH
     if (request.method == "POST"):
         output = {}


         return jsonify(output)





@app.route('/register')
def register():

    if (request.method == "POST"):
        output = {}
        # JSON data from the POST request
        username = request.form["username"]
        passwd = request.form["password"]

        print "username given", username
        print "password given", password

        # TODO: Create the user

        output["success"] = success
        # sessionkey =
        print "output", output



        # Store the user with the sessionkey
        _init_store(session_id)
        global session_info
        try:
            session_info[session_id] = userid
        except:
            output["success"] = False
            output["sessionKey"] = ''


        return jsonify(output)




@app.route('/login')
def login():

    if (request.method == "POST"):
        output = {}
        # JSON data from the POST request
        username = request.form["username"]
        passwd = request.form["password"]

        print "username given", username
        print "password given", password

        # TODO: AUTH the user
        # sessionkey
        # success =
        output["success"] = success
        # sessionkey =
        print "output", output



        # Store the user with the sessionkey
        _init_store(session_id)
        global session_info
        try:
            session_info[session_id] = userid
        except:
            output["success"] = False
            output["sessionKey"] = ''


        return jsonify(output)



if __name__ == "__main__":
  import click

  @click.command()
  @click.option('--debug', is_flag=True)
  @click.option('--threaded', is_flag=True)
  @click.argument('HOST', default='0.0.0.0')
  @click.argument('PORT', default=8111, type=int)
  def run(debug, threaded, host, port):
    """
    This function handles command line parameters.
    Run the server using

        python server.py

    Show the help text using

        python server.py --help

    """

    HOST, PORT = host, port
    print "running on %s:%d" % (HOST, PORT)
    app.run(host=HOST, port=PORT, debug=debug, threaded=threaded)


  run()
