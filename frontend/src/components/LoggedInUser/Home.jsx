import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import axios from 'axios'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInAs: '',
            followings: [],
            photoFeed: []
        }
    }

    componentDidMount() {
        this.mountLoggedInUser()
        // this.getFollowing()
    }

    // Set loggedInAs as the current user logged in 
    mountLoggedInUser = () => {
        this.setState({
            loggedInAs: this.props.user
        }, () => {
            this.getFollowingUsers()
        }, () => {
            this.getPhotosFromFollowing()
        })
    }

    // Make ajax request to see who the user follows 
    getFollowingUsers = () => {
        const { loggedInAs } = this.state
        // console.log(loggedInAs.user_id)
        if (loggedInAs) {
            axios
                .get(`/users/u/${loggedInAs.user_id}/following`)
                .then(res => {
                    // console.log('inside get following')
                    // console.log(res.data)
                    let followings = res.data.data
                    this.setState({
                        followings: followings
                    })
                    // Set state under followings array 
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    // Grab all photos posted by these users 
    getPhotosFromFollowing = () => {
        const { followings } = this.state
        console.log('Inside getPhotosFromFollowing')
        if (followings.length > 0) {
            console.log('Get photos from users!')
            // axios
            //     .get(`/get photo by id`)
            //     .then(res => {
            //         console.log(res.data)
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
        }
    }

    // Map through the photos and display inside render() 

    render() {
        const { loggedInAs, followings, photoFeed } = this.state
        console.log(this.state)

        return (
            <div>

                <div>
                    <h1>This is the home feed.</h1>
                    <p>Store logged in user in state.Look for users that the logged in user follows. Grab all photos that these users have posted, and feed them to this 'Home' page.</p>
                    <div>
                        <p><Link to={`/users/u/${1}/profile`}>OptimusPrime</Link></p>
                        <img alt='awesome photo url from an ajax request' />

                    </div>
                </div>
            </div>
        )
    }
}

export default Home 