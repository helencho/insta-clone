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
    }

    // Set loggedInAs as the current user logged in 
    mountLoggedInUser = () => {
        this.setState({
            loggedInAs: this.props.user
        }, () => {
            // Then get users that logged in user follows 
            this.getFollowingUsers()
        })
    }

    // Make ajax request to see who the user follows 
    getFollowingUsers = () => {
        const { loggedInAs } = this.state

        if (loggedInAs) {
            axios
                .get(`/users/u/${loggedInAs.user_id}/following`)
                .then(res => {
                    let followings = res.data.data

                    // Set state in followings array 
                    this.setState({
                        followings: followings
                    }, () => {
                        // Then get photos that these users have 'posted'
                        this.getPhotosFromFollowing()
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    // Grab all photos posted by these users 
    getPhotosFromFollowing = () => {
        const { followings } = this.state
        if (followings.length > 0) {
            // Map through each user 
            followings.map(user => {
                // Get photos by current user 
                // axios
                //     .get(`/users/something/${user.user_id}`)
                //     .then(res => {
                // let photos = res.data.data
                // console.log(photos)
                // add to photoFeed using spread operator
                // this.setState({
                //     photoFeed: [...this.state.photoFeed, photos]
                // })
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
            })

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