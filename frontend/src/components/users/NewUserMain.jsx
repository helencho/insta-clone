import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

class NewUserMain extends Component {
  constructor() {
    super();
    this.state = {
      email: '', 
      fullname:'', 
      username: "",
      password: "",
      userAvailable: "",
      message: "", 
      validEmail:false
    };
  }

  // Track username and password input inside state
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // When user submits form
  handleFormSubmit = e => {
    e.preventDefault();
    const { email, username, password, fullname } = this.state;
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
    if (username && password) {
      if (password.length < 6){
        return this.setState({
          message: "Password must be at least 6 characters"
        })
      }
      axios.get("/users").then(response => {
        console.log("RESPONSE FOR GET REQUEST", response.data.data);
        if (!response.data.data.find(n =>n.username ===username)) {
          axios
            .post("/users/new", {
              email: email, 
              fullname: fullname, 
              username: username,
              password: password
            })
            .then(res => {
              console.log(res);
              this.setState({
                email:'', 
                fullname: "", 
                username: "",
                password: "",
                message: "Registered user"
              });
            })
            .catch(err => {
              console.log(err);
              this.setState({
                email:'', 
                fullname: "",
                username: "",
                password: "",
                message: "Error registering user"
              });
            });
        } else {
          this.setState({
            message: "Username  already exists"
          });
        }
      });
    } else {
      this.setState({
        message: "Please fill all forms"
      })
    }
  };

  render() {
    const { email, username, password, message, fullname } = this.state;
    console.log(this.state);

    return (
      <div>
      <Link to ="/users/login">Login</Link>
        <h1>Register</h1>
        <form onSubmit={this.handleFormSubmit}>
        <input
            type="email"
            placeholder="email"
            name="email"
            onChange={this.handleInput}
            value={email}
          />
        <input
            type="text"
            placeholder="fullname"
            name="fullname"
            onChange={this.handleInput}
            value={fullname}
          />
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={this.handleInput}
            value={username}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={this.handleInput}
            value={password}
          />
          <input type="submit" value="Register" />
        </form>
        <p>{message}</p>
      </div>
    );
  }
}

export default NewUserMain;