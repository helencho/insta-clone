import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import NewUserEmail from "./users/NewUserEmail";
import LoginUser from "./users/LoginUser";
import Profile from "./LoggedInUser/profile";
import LogOut from "./users/LogOut";
import SinglePhoto from './LoggedInUser/SinglePhoto'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      newUser: true
    };
  }

  // componentDidMount() {
  //   // try to get user
  // }

  setUser = user => {
    this.setState({ user: user });
  };

  logOutUser = () => {
    this.setState({ user: null });
  };

  renderLogin = () => {
    return <LoginUser setUser={this.setUser} />;
  };

  renderProfile = props => {
    const { user } = this.state;

    if (!user) {
      return <LoginUser setUser={this.setUser} />;
    }
    return <Profile user={user} />;
  };

  renderLogOut = () => {
    return <LogOut logOutUser={this.logOutUser} />;
  };

  render() {
    const { user, newUser } = this.state;

    return (
      <div className="App">
        <div className="topbar instaCloneFont">
          <div className="cameraIcon">
            <span className="cursor"><i class="fab fa-instagram fa-2x"/></span><span className="site cursor"><h1>Instagram</h1></span>        
          </div>
          <div>
            <input className="inputBar"
            placeholder="Search"
            />
            </div>
          <div className="iconTop">
            <span className="cursor"><i class="far fa-compass fa-2x" /></span>
            <span className="iconDistance cursor"><i class="far fa-heart fa-2x" /></span>
            <span className="iconDistance cursor"><i class="far fa-user fa-2x" /></span>            
          </div>
        </div>

        <Route exact path="/" render={this.renderLogin} />
        <Route path="/users/new" component={NewUserEmail} />
        <Route path="/users/profile" component={Profile} />
        <Route exact path="/users/login" render={this.renderLogin} />
        <Route path="/users/logout" render={this.renderLogOut} />
        <Route path="/users/p/:id" component={SinglePhoto} />

      </div>
    );
  }
}

export default App;
