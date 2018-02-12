import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import NewUserMain from "./NewUserMain";

class NewUserEmail extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      message: '',
      validEmail: false
    };
  }

  // Track username and password input inside state
  handleInput = e => {
    this.setState({
      email: e.target.value
    });
  };

  emailValidation = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
    return (false)
  }

  // When user submits form
  handleFormSubmit = e => {
    e.preventDefault();
    const { email } = this.state;

    if (email) {
      if (!this.emailValidation(email)) {
        return this.setState({
          message: "Please enter a valid email"
        })
      } else {
        this.setState({
          validEmail: true
        })
      }
    }
  }


  render() {
    const { email, validEmail, message } = this.state;
    console.log(this.state);
    if (validEmail) {
      return <NewUserMain email={email} />;
    }

    return (
      <div>
        <Link to="/users/login">Login</Link>
        <h1>Register</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={this.handleInput}
            value={email}
          />

          <input type="submit" value="Register" />
        </form>
        <p>{message}</p>
      </div>
    );
  }
}

export default NewUserEmail;