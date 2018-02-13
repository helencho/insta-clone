import React from 'react'
import { Route, Link, Switch } from "react-router-dom"
import '../App.css'
import axios from "axios";


class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            images: []
        }
    }


    componentDidMount = () => {
        axios
            .get('/users/p')
            .then (res =>{
                console.log(res.data.data)
                const photoData= res.data.data
                console.log(photoData.map(photo=> photo.photo_link))
                this.setState({
                    images: res.data.data
                })
            })
                .catch(err => {
                    console.log(err)
                })
        }
   
    render() {
        const { images } = this.state

        return (
            <div>
                <div class='rowOfPics'> 

                </div>
                
                    {images.map(img => (
                        <figure id={img.photo_id}>
                            <img  alt='img' src={img.photo_link} width='223' height='223'/>
                            {/* <figcaption> {img.caption} </figcaption> */}
                        </figure>
                    ))}
            </div>
        )
    }
}

export default Profile 