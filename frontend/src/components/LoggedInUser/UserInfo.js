import React from 'react'
import { Route, Link, Switch, Redirect } from "react-router-dom"
import './profile.css';
import axios from 'axios'

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            userID: this.props.user.user_id,
            userName: this.props.user.username,
            numOfPosts: '',
            numOfFollowers: '',
            numOfFollowing: '',
            userImageURL: this.props.user.profile_pic,
            fullName: this.props.user.fullname,
            userDescription: this.props.user.user_description
        }
    }

    getUserFollowing = () => {
        const { userID, numOfFollowing } = this.state
        const id = userID
        console.log('we is ABOUT to call axios')
        axios
            .get(`/users/u/${id}/following`)
            .then(res => {
                let Following = res.data.data
                let NumberOfFollowing = Following.length
                console.log('THE USER IS FOLLOWING NUMBER', NumberOfFollowing)
                this.setState({
                    numOfFollowing: NumberOfFollowing
                })

            })
    }

    getUserFollowers = () => {
        const { userID, numOfFollowers } = this.state
        const id = userID
        console.log('we is ABOUT to call axios FOLLOWERS')
        axios
            .get(`/users/u/${id}/followers`)
            .then(res => {
                let Followers = res.data.data
                let NumberOfFollowers = Followers.length
                console.log('THE USER HAS FOLLOWER NUMBER', NumberOfFollowers)
                this.setState({
                    numOfFollowers: NumberOfFollowers
                })

            })
    }

    getNumberOfPosts = () => {
        const { userID, numOfPosts } = this.state
        const id = userID
        console.log('we is ABOUT to call axios FOLLOWERS')
        axios
            .get(`/users/u/${id}/photos`)
            .then(res => {
                let photos = res.data.data
                let numberOfPhotos = photos.length
                console.log('THE USER HAS this many posts ', numberOfPhotos)
                this.setState({
                    numOfPosts: numberOfPhotos
                })

            })


    }


    componentDidMount() {
        console.log('component is mounted')
        this.getUserFollowing()
        this.getUserFollowers()
        this.getNumberOfPosts()
    }





    render() {
        const { user, userID, userName, numOfFollowers, numOfPosts, numOfFollowing, userImageURL, fullName, userDescription } = this.state
        console.log('USERID IS ', userID)
        console.log(this.state)
        return (
            <div>
                <div className="infoContainer" width='905px'>

                    <div className="userImageContainer">
                        <div className="containerForBtn">
                            <div className="divForBtn">
                               <Link to={`edit`}> <button>
                                    <img className="userIMG" src={userImageURL} alt={`Image of ${userName}`} />
                                </button> </Link>
                            </div>
                        </div>
                    </div>
                    <header className="allUserInfo">
                        <section className="userStats">



                            <div className='overAllUserInfo' width='613.33px'>
                                <div className="usernameDiv">
                                    <span className='username'> <h1 id="usernameH1">{userName}</h1>
                                        <span className='button'>
                                            <button> FOLLOWING </button>
                                        </span>
                                    </span>



                                </div>

                                <div className="containerForNumberStats">
                                    <div className="stat"><bold>{numOfPosts} </bold> {"Posts"} </div>
                                    <div className="statFollow"><bold>{numOfFollowers} </bold> {"Followers"} </div>
                                    <div className="statFollow"> <bold>{numOfFollowing} </bold> {"Following"} </div>
                                </div>
                                <div className='nameAndBio'>
                                    <div className='name'>
                                        <span className='fullname'>
                                            <h3>{fullName} </h3>
                                            <span className='bio'>
                                                {userDescription}
                                            </span>
                                        </span>

                                    </div>

                                </div>
                                
                            </div>
                        </section>
                    </header>
                    
                </div>
            </div>


        )
    }
}

export default UserInfo