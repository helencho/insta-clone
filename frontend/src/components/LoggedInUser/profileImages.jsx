import React from 'react'
import { Route, Link, Switch } from "react-router-dom"
import '../App.css'
import axios from "axios";


class ProfileImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images
        }
    }
       
    render() {
        const { images } = this.state
        console.log(this.state)

        return (
            <div>
                <div class='rowOfPics'> 
                </div>
                
                    {this.props.images.map(img => (
                        <figure id={img.photo_id}>
                        <Link to= {`photo/${img.photo_id}`}> 
                            <img  alt='img' src={img.photo_link} width='223' height='223'/>
                        </Link>
                        </figure>
                    ))}
            </div>
        )
    }
}

export default ProfileImages