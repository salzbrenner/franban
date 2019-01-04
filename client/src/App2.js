import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';

function BasicExample() {
  return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
        </div>
      </Router>
  );
}

const bodyFormData = new FormData();
bodyFormData.set('email', 'evan@idiot.com');
bodyFormData.set('password', 'password');

const addData = {
  name: 'added from app',
  created_by: 1,
};

let token = null;

class Home extends Component {
  makeCall() {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/api/register',
      data: bodyFormData,
      config: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
    })
        .then(function(response) {
          // handle success
          console.log(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
  }

  login() {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/api/login',
      data: bodyFormData,
      // data: {email: 'evan@idiot.com', password: 'password'},
      config: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
    })
        .then(function(response) {
          // handle success
          console.log(response);
          token = response.data.access_token;
          console.log(token);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
  }

  add() {

    console.log(token);
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    axios.post('http://127.0.0.1:5000/api/todos', addData, config)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  render() {
    return (
        <div>
          <h2>Home</h2>
          <button onClick={() => this.makeCall()}>register</button>
          <button onClick={() => this.login()}>login</button>
          <button onClick={() => this.add()}>add todo</button>
        </div>
    );
  }
}

function About() {
  return (
      <div>
        <h2>About</h2>
      </div>
  );
}

function Topics({match}) {
  return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${match.url}/rendering`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul>

        <Route path={`${match.path}/:topicId`} component={Topic}/>
        <Route
            exact
            path={match.path}
            render={() => <h3>Please select a topic.</h3>}
        />
      </div>
  );
}

function Topic({match}) {
  return (
      <div>
        <h3>{match.params.topicId}</h3>
      </div>
  );
}

export default Home;