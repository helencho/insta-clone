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

  // emailValidation = (email) => {
  //   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
  //     return (true)
  //   }
  //   return (false)
  // }

  // When user submits form
  handleFormSubmit = e => {
    e.preventDefault();
    const { email } = this.state;

    if (email) {
      axios.get('/users').then(response =>{
        console.log("RESPONSE FOR GET REQUEST", response.data.data);
        console.log(email)
        
        if (!response.data.data.find(n => n.email_add === email)) {
          this.setState({
            validEmail:true, 
          })
        } else {
        this.setState({
          validEmail: false, 
          message:'email already in use'
        })
      }
    })
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