import React from 'react'
import { Route, Link, Switch } from "react-router-dom"
import '../App.css'
import axios from "axios";
import ProfileImages from './profileImages';
import UserInfo from './UserInfo';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            images: []
        }
    }


    componentDidMount = () => {
        axios
            .get('/users/p')
            .then (res => {
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
        const { images,user } = this.state
        console.log("the user is:", user)
        return (
            <div>
                <UserInfo user={ user } userImageURL={ images } />
                <ProfileImages images={ images } />
            </div>
        )
    }
}

export default Profile 