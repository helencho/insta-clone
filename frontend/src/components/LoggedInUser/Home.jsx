import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../Home.css'

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
                axios
                    .get(`/users/u/${user.following_id}/photos`)
                    .then(res => {
                        let photos = res.data.data
                        // console.log(photos)
                        // add to photoFeed using spread operator
                        this.setState({
                            photoFeed: photos
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })

        }
    }

    // Map through the photos and display inside render() 

    render() {
        const { loggedInAs, followings, photoFeed } = this.state
        console.log(this.state)

        return (
            <div className='homefeed-page-container'>
                {/* <h1>This is the home feed.</h1> */}
                {photoFeed.length > 0 ?
                    photoFeed.map(photo => (
                        <div className='homefeed-card-container'>
                            <div className='homefeed-card-meta'>
                                <img src={photo.profile_pic} alt={`Picture`} className='homefeed-card-userprof' />
                                <p className='homefeed-card-username'><Link to={`/users/u/:id/profile`}>{photo.username}</Link></p>
                            </div>
                            <div className='homefeed-card-img'>
                                <img src={photo.photo_link} alt='Awesome photo' />
                            </div>
                            <div className='homefeed-card-likes'>
                                <p>___ likes</p>
                            </div>
                            <div className='homefeed-card-caption'>
                                <p>{photo.caption}</p>
                            </div>
                        </div>
                    ))
                    :
                    <h1>Nothing to show :(</h1>
                }

            </div>
        )
    }
}

export default Home 