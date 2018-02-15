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

        // if(this.state.photoFeed.length > 0) {
        //     this.checkIfUserLikesPhoto() 
        // }
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
                            let singlePhotoToFeed = { ...singlePhoto }

                            // Get likes per photo 
                            axios
                                .get(`/users/p/${id}/likes`)
                                .then(res => {
                                    let detailData = res.data.data
                                    // let { likedByUsers } = this.state
                                    singlePhotoToFeed.total_likes = detailData.total_likes

                                    // Add photo information to photo feed 
                                    this.setState({
                                        photoFeed: [...this.state.photoFeed, singlePhotoToFeed]
                                    })

                                })
                                .catch(err => {
                                    console.log(err)
                                }) // End second ajax request 


                            // Get details per photo 
                            axios
                                .get(`/users/p/${id}/details`)
                                .then(res => {
                                    let details = res.data.data
                                    let userFound = details.find(item => item.liked_by_user_id === loggedInAs.user_id)
                                    // console.log(userFound) 
                                    if (userFound) {
                                        // console.log('user liked photo')
                                        singlePhotoToFeed.liked = true
                                        // console.log(newPhoto)
                                        this.setState({
                                            photoFeed: [...this.state.photoFeed, singlePhotoToFeed]
                                        })
                                    } else {
                                        singlePhotoToFeed.liked = false
                                        this.setState({
                                            photoFeed: [...this.state.photoFeed, singlePhotoToFeed]
                                        })
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                }) // End third ajax request 
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    }) // End first ajax request 
            })

        }
    }

    // checkIfUserLikesPhoto = () => {
    //     const { loggedInAs, photoFeed } = this.state

    //     // Map through each photo in photo feed 
    //     photoFeed.map(photo => {
    //         let newPhoto = { ...photo }
    //         let id = photo.photo_id

    //         // Get details per photo 
    //         axios
    //             .get(`/users/p/${id}/details`)
    //             .then(res => {
    //                 let details = res.data.data
    //                 let userFound = details.find(item => item.liked_by_user_id === loggedInAs.user_id)
    //                 // console.log(userFound) 
    //                 if (userFound) {
    //                     // console.log('user liked photo')
    //                     newPhoto.liked = true
    //                     // console.log(newPhoto)
    //                     this.setState({
    //                         photoFeed: [...this.state.photoFeed, newPhoto]
    //                     })
    //                 } else {
    //                     newPhoto.liked = false
    //                     this.setState({
    //                         photoFeed: [...this.state.photoFeed, newPhoto]
    //                     })
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     })

    // }


    toggleHeart = e => {
        // 
    }


    render() {
        const { loggedInAs, followings, photoFeed } = this.state
        console.log(this.state)

        return (
            <div className='homefeed-page-container'>
                {photoFeed.length > 0 ?
                    photoFeed.map((photo, index) => (
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