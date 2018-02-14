import React from 'react'
import { Route, Link, Switch } from "react-router-dom"
import '../App.css'
import axios from "axios";
import ProfileImages from './profileImages';
import UserInfo from './UserInfo';
import SinglePhoto from './SinglePhoto';



class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            images: [],
            userPhoto: ""
        }
    }


    componentDidMount = () => {
        
        // axios
        //     .get('/users/') //need to get by username
        //     .then (res => {
        //         //array of objects
        //         console.log(res.data.data)
        //         console.log("res dot!!!!!! data", res.data)
        //         const photoData= res.data.data
        //         console.log("res.data.data", res.data.data)
        //         console.log(photoData.map(photo=> photo.photo_link))
        //         this.setState({
        //             user: res.data,
        //             images: res.data.data
        //         })
        //     })
        //         .catch(err => {
        //             console.log(err)
        //         })
        }
   
    render() {
        const { images,user } = this.state
    console.log(this.state)
        console.log("the user is:", user)
        // console.log("single photo info", SinglePhoto.authorUsername)
        return (
            <div>
                {/* <SinglePhoto /> */}
                <UserInfo user={ user } userImageURL={ images } />
                <ProfileImages images={ images } />
            </div>
        )
    }
}

export default Profile 