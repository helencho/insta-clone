import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Route, Link, Switch } from "react-router-dom";

import Profile from "../LoggedInUser/profile";
import "../App.css";

class LoginUser extends React.Component {
  state = {
    user: "",
    usernameInput: "",
    passwordInput: "",
    message: "Forgot password?",
    loggedIn: false
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    const { usernameInput, passwordInput, loggedIn } = this.state;

    if (usernameInput.length < 3) {
      this.setState({
        message: "Username length must be at least 3"
      });
      return;
    }
    axios
      .post("/users/login", {
        username: usernameInput,
        password: passwordInput
      })

      .then(res => {
        console.log(res.data);
        console.log(res.data);
        this.props.setUser(res.data);
        this.setState({
          user: res.data.username,
          loggedIn: true
        });
      })
      .catch(err => {
        this.setState({
          usernameInput: "",
          passwordInput: "",
          message: "username/password not found"
        });
      });
  };

  //   setUser = () => {
  //     const { user } = this.state
  //     return (
  //       <Profile user={user} />
  //     )
  //   }

  render() {
    const { usernameInput, passwordInput, message, loggedIn } = this.state;

    if (loggedIn) {
      return <Redirect to="/users/home" />;
    }

    return (
      <div>
        <div className="loginBox">
          <h1 className="siteFont"> Instagram </h1>

          <form onSubmit={this.submitForm}>
            <input
              className="usernameBox"
              placeholder="Username"
              type="text"
              name="usernameInput"
              value={usernameInput}
              onChange={this.handleInput}
            />
            <br />

            <input
              className="passwordBox"
              placeholder="Password"
              type="password"
              name="passwordInput"
              value={passwordInput}
              onChange={this.handleInput}
            />
            <br />
            <input className="loginBtn" type="submit" value="Log in" />
          </form>
          <br />
          <p className="messageSize">{message}</p>
        </div>
        <div className="smallerBox">
          <p className="dontHaveAcct">
            Don't have an account?<Link to="/users/new"> Sign up</Link>
          </p>
        </div>
        <div>
          <p className="getTheApp">Get the app.</p>
        </div>
        <div>
          <img
            className="appStore"
            src="https://i.imgur.com/UAP0XMk.png"
            alt="available on the app store"
            width="136"
            height="40"
          />
          <img
            src="https://i.imgur.com/1dnbtWG.png"
            alt="available on google play"
            width="136"
            height="40"
          />
        </div>
      </div>
    );
  }
}

export default LoginUser;
