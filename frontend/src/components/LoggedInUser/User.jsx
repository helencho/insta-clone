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

<<<<<<< HEAD


getUserInfo= () =>{
    const id = this.props.match.params.id
    console.log('id!!!' + id)

    axios
    .get(`/users/u/${id}`)
    .then(res => {
        let UserInfo = res.data.data 
        // console.log("res.data",res.data.data)

        this.setState({
            user: UserInfo
=======
    getUserInfo = () => {
        const id = this.props.match.params.id

        console.log(id)
        axios.get(`/users/u/${id}/`)
        .then(res=>{
            console.log(res.data)
            console.log(res.data.data)
            let UserInfo= res.data.data 
>>>>>>> 220c7d9f3ca827e103c962b70b841a55972d4b7b
        })
        console.log('UserINFO: ' , UserInfo)
    })
    .catch(err =>{
        console.log(err)
    })

}

<<<<<<< HEAD
    componentDidMount() {
        console.log("component mounted!!!!!!!!!!!!")
=======
        .catch(err =>{
            console.log(err)
        })
    }

    componentDidMount() {
        console.log("component mounted")
>>>>>>> 220c7d9f3ca827e103c962b70b841a55972d4b7b
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
        const {user} = this.state
        if (user){
            return (
           
                <Profile user= {user} />
        )
    }
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
        console.log("THe fucking state:",this.state)

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

