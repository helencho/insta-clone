import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class SinglePhoto extends Component {
    constructor() {
        super()
        this.state = {
            authorId: '',
            authorName: '',
            following: false,
            photoUrl: '',
            photoCaption: '',
            likedByUsers: [],
            liked: false
        }
    }

    componentDidMount() {
        this.getSinglePhoto()
        this.getPhotoDetails()
    }

    getSinglePhoto = () => {
        // Photo id 
        const id = props.params.match.id

        axios
            .get(`/p/${id}`)
            .then(res => {
                let data = console.log(res.data)
                // authorId: user_id 
                // photoUrl: photo_link 
                // photoCaption: caption 
            })
            .catch(err => {
                console.log(err)
            })
    }

    getPhotoDetails = () => {
        // Photo id 
        const id = props.params.match.id

        axios
            .get(`/p/${id}/details`)
            .then(res => {
                let data = console.log(res.data)

                // Map through the array of objects and grab information we need 
                data.map(item => {
                    let user = {
                        id: item.liked_by_user_id,
                        username: item.username,
                        picUrl: item.profile_pic
                    }
                    this.setState({
                        likedByUsers: [...this.state.likedByUsers, user]
                    })
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    doesUserLikePhoto = () => {
        // true or false depending on whether current user's ID is included in the likedByUsers array 
        const { authorId, likedByUsers } = this.state
        const userFound = likedByUsers.find(user => user.id === authorId)
    }

    // Clicking on heart will toggle true or false 
    // Will also send an ajax request (post request) to a route that doesn't exist yet 

    render() {
        const { authorId, authorName, following, photoUrl, photoCaption, likedByUsers, liked } = this.state
        console.log(this.state)
        const totalLikes = likedByUsers.length

        return (
            <div className='single-photo-container'>
                <div className='single-photo'>
                    <img alt='image' />
                </div>
                <div classname='single-photo-details'>
                    <div>profile pic, author, Following || {following ? 'Following' : 'Unfollowing'}</div>
                    <div>author, caption</div>
                    <div>{liked ? 'heart' : 'empty heart'}</div>
                    <div>{totalLikes} likes</div>
                    <div>Add a comment...</div>
                </div>
            </div>
        )
    }
}

export default SinglePhoto 