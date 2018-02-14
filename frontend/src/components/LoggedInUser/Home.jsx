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
            photoFeed: [],
            liked: false,
            likedByUsers: []
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

                        // add to photoFeed using spread operator
                        this.setState({
                            photoFeed: photos
                        }, () => {

                            // Then get all users who like each photo 
                            this.usersWhoLikePhoto()
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })

        }
    }
    // Map through liked by users 
    // If photo_id matches photo_id, 
    // Count the total 
    // Render into ___ likes 

    usersWhoLikePhoto = () => {
        // Get request to grab information on who liked the photo 
        const { photoFeed } = this.state

        // Map through each photo information 
        photoFeed.map(photo => {
            let id = photo.photo_id

            // Get detailed information on each photo 
            axios
                .get(`/users/p/${id}/details`)
                .then(res => {
                    let detailData = res.data.data
                    this.setState({
                        likedByUsers: [...this.state.likedByUsers, detailData]
                    })
                })
                .catch(err => {
                    console.log(err)
                }) // End ajax request 
        })
    }

    render() {
        const { loggedInAs, followings, photoFeed } = this.state
        console.log(this.state)

        return (
            <div className='homefeed-page-container'>
                {photoFeed.length > 0 ?
                    photoFeed.map(photo => (
                        <div className='homefeed-card-container'>
                            <div className='homefeed-card-meta'>
                                <img src={photo.profile_pic} alt={`Picture`} className='homefeed-card-userprof' />
                                <p className='homefeed-card-username'><Link to={`/users/u/${photo.user_id}/profile`}>{photo.username}</Link></p>
                            </div>
                            <div className='homefeed-card-img'>
                                <img src={photo.photo_link} alt='Awesome photo' />
                            </div>
                            <div className='homefeed-card-heart'>
                                <i class="far fa-heart"></i>
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