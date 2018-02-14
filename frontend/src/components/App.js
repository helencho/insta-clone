import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import NewUserEmail from "./users/NewUserEmail";
import LoginUser from "./users/LoginUser";
// import Profile from "./LoggedInUser/profile";
import LogOut from "./users/LogOut";
import User from './LoggedInUser/User';
import Home from './LoggedInUser/Home';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      newUser: true
    };
  }

  setUser = user => {
    this.setState({ user: user });
  };

  logOutUser = () => {
    this.setState({ user: null });
  };

  renderLogin = () => {
    return <LoginUser setUser={this.setUser} />;
  };

  renderLogOut = () => {
    return <LogOut logOutUser={this.logOutUser} />;
  };

  renderNew = () => {
    return <NewUserEmail />
  }

  // Home is the feed screen 
  renderHome = () => {
    if (this.state.user) {
      return <Home user={this.state.user} />
    } else {
      return <h1>Must be logged in</h1>
    }
  }

  render() {
    const { user, newUser } = this.state;
    return (
      <div className="App">
        <div className="topbar instaCloneFont">
          <div className="cameraIcon">
            <span className="cursor"><i className="fab fa-instagram fa-2x" /></span><span className="site cursor"><h1>Instagram</h1></span>
          </div>
          <div>
            <input className="inputBar"
              placeholder="Search"
            />
          </div>
          <div className="iconTop">
            <span className="cursor"><i className="far fa-compass fa-2x" /></span>
            <span className="iconDistance cursor"><i className="far fa-heart fa-2x" /></span>
            <span className="iconDistance cursor"><i className="far fa-user fa-2x" /></span>
          </div>
        </div>

        <Route exact path="/" render={this.renderLogin} />
        <Route exact path="/users" render={this.renderLogin} />
        <Route path="/users/login" render={this.renderLogin} />
        <Route path="/users/new" render={this.renderNew} />
        <Route path="/users/logout" render={this.renderLogout} />
        <Route path="/users/home" render={this.renderHome} />
        <Route path="/users/u/:id" component={User} />

      </div>
    );
  }
}

export default App;
