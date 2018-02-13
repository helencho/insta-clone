import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../SinglePhoto.css'

class SinglePhoto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authorId: '',
            authorName: '',
            authorUsername: '',
            authorImgUrl: '',
            following: false,
            photoUrl: '',
            photoCaption: '',
            likedByUsers: [],
            liked: false
        }
    }

    componentDidMount() {
        this.getPhoto()
    }

    getPhoto = () => {
        // Photo id 
        const id = this.props.match.params.id

        axios
            .get(`/users/p/${id}`)
            .then(res => {
                let photoData = res.data.data
                this.setState({
                    authorId: photoData.user_id,
                    authorName: photoData.fullname,
                    authorUsername: photoData.username,
                    authorImgUrl: photoData.profile_pic,
                    photoUrl: photoData.photo_link,
                    photoCaption: photoData.caption
                })

                axios
                    .get(`/p/${id}/details`)
                    .then(res => {
                        let detailData = res.data.data
                        let users = []

                        detailData.map(item => {
                            let user = {
                                id: item.liked_by_user_id,
                                username: item.username,
                                picUrl: item.profile_pic
                            }
                            users = [...users, user]
                            // this.setState({
                            //     likedByUsers: [...this.state.likedByUsers, user]
                            // })
                        })
                        this.setState({
                            likedByUser: users
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    doesUserLikePhoto = () => {
        const { authorId, likedByUsers } = this.state
        const userFound = likedByUsers.find(user => user.id === authorId)

        // If user is found, set liked to true 
        if (userFound) {
            this.setState({
                liked: true
            })
        } else {
            this.setState({
                liked: false
            })
        }
    }

    // toggleLike = () => {
    //     // Clicking on heart will toggle true or false 
    //     // Will also send an ajax request (post request) to a route that doesn't exist yet 
    // }


    render() {
        const { authorId, authorName, authorUsername, authorImgUrl, following, photoUrl, photoCaption, likedByUsers, liked } = this.state
        console.log(this.state.photoUrl)
        const totalLikes = likedByUsers.length

        return (
            <div className='single-photo-container'>
                <div className='single-photo'>
                    <img className='single-photo-img' src={photoUrl} alt='image' />
                </div>
                <div classname='single-photo-details'>
                    <div><img className='prof-img-small' src={authorImgUrl} /> {authorUsername} • {following ? 'Following' : 'Unfollowing'}</div>
                    <div>{authorUsername} {photoCaption}</div>
                    <div>{liked ? 'full heart' : 'empty heart'}</div>
                    <div>{totalLikes} likes</div>
                    <form><input type='text' placeholder='Add a comment...' /></form>
                </div>
            </div>
        )
    }
}

export default SinglePhoto 