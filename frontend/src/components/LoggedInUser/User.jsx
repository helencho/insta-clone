import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'

class User extends Component {
    constructor() {
        super() 
        this.state = {
            user: ''
        }
    }

    renderProfile = () => {
        return <h1>Full profile to go here. Call 'Profile' component.</h1>
    }

    renderFollowing = () => {
        return <h1>List of people user follows.</h1>
    }

    renderFollowers = () => {
        return <h1>List of people who follow the user!!</h1>
    }

    renderPhoto = () => {
        return <h1>Single photo here. Call 'SinglePhoto' component.</h1>
    }
    
    render() {
        console.log(this.props.match.params.id)

        return (
            <div>
                <Route path="/users/u/:id/profile" render={this.renderProfile} />
                <Route path="/users/u/:id/following" render={this.renderFollowing} />
                <Route path="/users/u/:id/followers" render={this.renderFollowers} />
                <Route path="/users/u/:id/photo/:id" render={this.renderPhoto} />
            </div>
        )
    }
}

export default User

