import React, { Component } from 'react'
import axios from 'axios'

class SinglePhoto extends Component {
    constructor() {
        super()
        this.state = {
            photoUrl: ''
        }
    }

    componentDidMount() {
        this.getSinglePhoto() 
    }

    getSinglePhoto = () => {
        const id = props.params.match.id

        axios
            .get(`/p/${id}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    getPhotoDetails = () => {
        // /p/:id/details
    }

    render() {
        const { photoUrl } = this.state

        return (
            <div className='single-photo-container'>
                {/* <img src={photoUrl} alt='photo' /> */}
            </div>
        )
    }
}

export default SinglePhoto 