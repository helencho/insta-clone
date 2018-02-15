import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            fullname: '',
            profilepicUrl: '',
            userdescription: '',
            email: ''
        }
    }
    
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = e => {
        e.preventDefault()
        const { username, fullname, profilepicUrl, userdescription, email } = this.state
        console.log("the state when the submitForm:", this.state)
        console.log("id", this.props.user.user_id)
    
        fetch(`/users/u/${this.props.user.user_id}/edit`,
          {
            headers: {
              "ACCEPT": "application/json",
              "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify({
                newName: username,
                newEmail: email,
                newFullname: fullname,
                newProfile_pic: profilepicUrl,
                newDescription: userdescription,
                id: this.props.user.user_id    
          })
        })
    };

    render() {
        console.log("state:", this.state)
        console.log("props:", this.props)
        const { username, fullname, profilepicUrl, userdescription, email } = this.state;
        return (
            <div>
                <form onSubmit={ this.submitForm }>
                    <label>
                        New username:
                        <input type="text" name="username" placeholder={this.props.user.username} onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        New full name:
                        <input type="text" name="fullname" placeholder={this.props.user.fullname} onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        New profile pic:
                        <input type="text" name="profilepicUrl" placeholder="Enter url here." onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        New user description:
                        <input type="text" name="userdescription" placeholder={this.props.user_description}onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        New email:
                        <input type="text" name="email" placeholder={this.props.user.email_add} onChange={this.handleInputChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
};
export default EditUser