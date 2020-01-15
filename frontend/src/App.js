import React from 'react';
import { Router, Switch, Route} from 'react-router';
import { Link } from 'react-router-dom'
import history from './history';
import './App.css';

import Home from './pages/Home.js';
import Login from './pages/Login.js';
import About from './pages/About.js';


function App() {
  return (
    <div className="App"> 
      <Router history={history}>
        <nav>
          <Link to="/login">Login</Link> |  
          <Link to="/">User Reviews</Link> | 
          <Link to="/about">Chat Room</Link>
        </nav>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/about" component={About} exact/>
          <Route path="/login" component={Login} exact/>
          {/* <Route path="/" component={About} exact/> */}
          {/* <Route path="/" component={Home} exact/> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
