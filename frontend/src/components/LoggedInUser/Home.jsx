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
        const { loggedInAs, followings } = this.state

        // If user follows people 
        if (followings.length > 0) {

            // Map through each following user 
            followings.map(user => {

                // Get photos by current user 
                axios
                    .get(`/users/u/${user.following_id}/photos`)
                    .then(res => {
                        let photos = res.data.data

                        // Map through each photo by user 
                        photos.map(singlePhoto => {
                            let id = singlePhoto.photo_id
                            let newPhoto = { ...singlePhoto }

                            // Get likes per photo 
                            axios
                                .get(`/users/p/${id}/likes`)
                                .then(res => {
                                    let detailData = res.data.data
                                    let newPhotoFeedState = [...this.state.photoFeed]

                                    // If there's something in the photo feed already 
                                    if (newPhotoFeedState.length > 0) {

                                        // Look through the feed 
                                        newPhotoFeedState.map(current => {

                                            // Find a photo that matches current photo 
                                            if (current.photo_id === id) {

                                                // Add to the total likes 
                                                current.total_likes = detailData.total_likes
                                                this.setState({
                                                    photoFeed: newPhotoFeedState
                                                })
                                            }

                                            // If no photo matches current photo 
                                            else {
                                                // Add total likes to the new photo object 
                                                newPhoto.total_likes = detailData.total_likes

                                                // Add this new photo to the feed 
                                                newPhotoFeedState = [...newPhotoFeedState, newPhoto]
                                                this.setState({
                                                    photoFeed: newPhotoFeedState
                                                })
                                            }

                                        })
                                    } // If there's nothing in the photo feed 
                                    else {
                                        // Add new photo 
                                        // Add total likes to the new photo object 
                                        newPhoto.total_likes = detailData.total_likes

                                        // Add this new photo to the feed 
                                        newPhotoFeedState = [...newPhotoFeedState, newPhoto]
                                        this.setState({
                                            photoFeed: newPhotoFeedState
                                        })
                                    }

                                    // console.log(newPhotoFeedState)
                                    // return [...this.state.photoFeed, newPhotoFeedState]
                                })
                                // .then(feed => {
                                //     this.setState({
                                //         photoFeed: feed
                                //     })
                                // })
                                .catch(err => {
                                    console.log(err)
                                }) // End second ajax request 

                            // Get details per photo 
                            // axios
                            //     .get(`/users/p/${id}/details`)
                            //     .then(res => {
                            //         let details = res.data.data
                            //         let userFound = details.find(item => item.liked_by_user_id === loggedInAs.user_id)
                            //         let newPhotoFeedState = [...this.state.photoFeed]
                            //         newPhotoFeedState.map(current => {
                            //             if (current.photo_id === id) {
                            //                 current.liked = true
                            //             }
                            //         })
                            //         return newPhotoFeedState
                            //     })
                            //     .then(feed => {
                            //         this.setState({
                            //             photoFeed: feed
                            //         })
                            //     })
                            //     .catch(err => {
                            //         console.log(err)
                            //     }) // End third ajax request 
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    }) // End first ajax request 
            })

        }
    }


    favePhoto = e => {
        const { loggedInAs } = this.state
        let user_id = loggedInAs.user_id
        let photo_id = e.target.name
        console.log(photo_id)

        axios
            .post(`/users/p/${photo_id}/faved`, {
                user_id: user_id,
                photo_id: photo_id
            })
            .then(res => {
                // console.log(res.data)
                this.getPhotosFromFollowing()
            })
            .then(err => {
                console.log(err)
            })
    }

    unfavePhoto = e => {
        const { loggedInAs } = this.state
        let user_id = loggedInAs.user_id
        let photo_id = e.target.name
        console.log(photo_id)
    }

    render() {
        const { loggedInAs, followings, photoFeed } = this.state
        console.log(this.state)

        return (
            <div className='homefeed-page-container'>
                {photoFeed.length > 0 ?
                    photoFeed.map((photo) => (
                        <div className='homefeed-card-container'>
                            <div className='homefeed-card-meta'>
                                <img src={photo.profile_pic} alt={`Picture`} className='homefeed-card-userprof' />
                                <p className='homefeed-card-username'><Link to={`/users/u/${photo.user_id}/profile`}>{photo.username}</Link></p>
                            </div>
                            <div className='homefeed-card-img'>
                                <img src={photo.photo_link} alt='Awesome photo' />
                            </div>
                            <div className='homefeed-card-heart'>
                                {photo.liked ?
                                    <button
                                        name={photo.photo_id}
                                        onClick={this.unfavePhoto}
                                        className='homefeed-card-liked-button'></button>
                                    :
                                    <button
                                        name={photo.photo_id}
                                        onClick={this.favePhoto}
                                        className='homefeed-card-unliked-button'></button>}
                            </div>
                            <div className='homefeed-card-likes'>
                                <p>{photo.total_likes} likes</p>
                            </div>
                            <div className='homefeed-card-caption'>
                                <p><span className='homefeed-caption-username'>{photo.username}</span> {photo.caption}</p>
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