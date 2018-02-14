import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Profile from './profile'
import Followers from './Followers'
import Following from './Following'
import SinglePhoto from './SinglePhoto'

class User extends Component {
    constructor(props) {
        super(props);

        //made user:null because an object is coming in, not a string
        this.state = {
            user: null,
            following: [],
            followers: [],
            photos: [],
        }
    }

    getUserInfo = () => {
        const id = this.props.match.params.id

        console.log(id)
        axios.get(`/users/u/${id}/`)
        .then(res=>{
            console.log(res.data)
            console.log(res.data.data)
            let UserInfo= res.data.data 
        })

        .catch(err =>{
            console.log(err)
        })
    }

    componentDidMount() {
        console.log("component mounted")
        this.getUserInfo()
       
        // Grab user's information based on user ID (but backend takes username instead of ID) 
        // Ajax get request here
        // Set state! 

        // Probably need a couple of ajax requests for: 
        // Following users 
        // Follower users 
        // All photos under the active user 
    }

    // Render the user's profile based on user ID 
    renderProfile = () => {
        return (
            <div>
                <Profile />
            </div>
        )
    }

    renderFollowing = () => {
        return <Following />
    }

    renderFollowers = () => {
        return <Followers />
    }

    renderPhoto = () => {
        return <SinglePhoto />
    }

    render() {
        console.log(this.props.match.params.id)

        return (
            <div>
                <Route path="/users/u/:id/profile" render={this.renderProfile} />
                <Route path="/users/u/:id/following" render={this.renderFollowing} />
                <Route path="/users/u/:id/followers" render={this.renderFollowers} />
                <Route path="/users/u/:id/photo/:photoid" render={this.renderPhoto} />
            </div>
        )
    }
}

export default User

