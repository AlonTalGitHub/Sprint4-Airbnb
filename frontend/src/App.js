import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom'
import history from './history';
import '../src/assets/styles/main.css';

import Home from './pages/Home.js';
import About from './pages/About.js';
import HouseEdit from './pages/HouseEdit'


import HousePage from './pages/HousePage';
import HouseDetails from './pages/HouseDetails';
import NavBar from './cmps/NavBar';
import Login from './pages/Login';
import ReservedPage from './pages/ReservedPage';

import Favorites from './pages/Favorites';
import RequestPage from './pages/RequestPage';
import MyHouses from './pages/MyHouses';
import ChatRoomPage from './pages/ChatRoomPage';
import Nav from './cmps/Nav'
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Nav />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/requests" component={RequestPage} exact />
          <Route path="/reserved" component={ReservedPage} exact />
          <Route path="/favorites" component={Favorites} exact />
          <Route path="/myhouses" component={MyHouses} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/house" component={HousePage} exact />
          <Route path="/about" component={About} exact />
          <Route path="/house/edit" component={HouseEdit} exact />
          <Route path="/house/edit/:id" component={HouseEdit} exact />
          <Route path="/house/:id" component={HouseDetails} exact />
          <Route path="/chat" component={ChatRoomPage} exact />
          {/* <Route path="house/edit:id" component={HouseEdit} exact/> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
