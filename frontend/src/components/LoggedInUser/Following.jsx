import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Following extends Component {
    constructor(props){
        super(props);
        this.state={
            allFollowing: this.props.following , 
        }
    }



    render() {
        const {allFollowing} = this.state
        console.log('HELLLLOOOO PRINCESS', allFollowing)
            return (
                <div>
                    <h1>Following</h1>
                <div>
                    {this.props.following.map(user => (
                        <div className='users' id= {user.following_id}>
                        <div>
                            <Link to ={`/users/u/${user.following_id}/profile`} >
                            <div class='FollowingProfilePic'>
                            <img src={user.profile_pic} />
                            </div>
                            <div className='FollowerUsername'>
                            <h2>{user.username} </h2>
                            </div>
                            </Link>
    
                            <div className='FollowerFullName'>
                            <h2> {user.fullname} </h2>
                            </div>
                        </div>
                        </div>
              ))}
              </div>
        </div>
        )
    }
    }
export default Following 