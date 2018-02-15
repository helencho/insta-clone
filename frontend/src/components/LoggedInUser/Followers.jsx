
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Followers extends Component {
    constructor(props){
        super(props);
        this.state={
            allFollowing:this.props.followers
        }
    }

    render() {
    const {allFollowing} = this.state
    console.log('HELLLLOOOO PRINCESS', allFollowing)
        return (
            <div>
                <h1>Followers</h1>
            <div>
                {this.props.followers.map(user => (
                    <div className='users' id= {user.follower_id}>
                    <div>
                        <Link to ={`/users/u/${user.follower_id}/profile`} >
                        <div class='FollowerProfilePic'>
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

export default Followers;
