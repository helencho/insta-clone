import React from 'react'
import { Route, Link, Switch } from "react-router-dom"
import './profile.css'
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
           
                <div class='rowOfPics'> 
              
                
                    {this.props.images.map(img => (
                        <div className= 'image'id={img.photo_id}>
                        <Link to= {`photo/${img.photo_id}`}> 
                            <img  alt='img' src={img.photo_link} width='223' height='223'/>
                        </Link>
                        </div>
                    ))}
                    </div>
          
        )
    }
}

export default ProfileImages