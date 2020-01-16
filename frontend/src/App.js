import React from 'react';
import { Router, Switch, Route} from 'react-router';
import { Link } from 'react-router-dom'
import history from './history';
import '../src/assets/styles/main.css';

import Home from './pages/Home.js';
// import Login from './pages/Login.js';
// import About from './pages/About.js';
import HousePage from './pages/HousePage';
import HouseDetails from './pages/HouseDetails';
import NavBar from './cmps/NavBar';

function App() {
  return (
    <div className="App"> 
      <Router history={history}>
        {/* <nav>
          <Link to="/about">About</Link>
        </nav> */}
        <NavBar></NavBar>        
        <Switch>
          <Route path="/" component={Home} exact/>
          {/* <Route path="/about" component={About} exact/>
          <Route path="/login" component={Login} exact/> */}
          <Route path="/house" component={HousePage} exact/>
          <Route path="/house/:id" component={HouseDetails} exact/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
