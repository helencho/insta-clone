import React from 'react'
import {Route, Link, Switch} from "react-router-dom"
import '../App.css';

const UserInfo = (props) => {
    const {
        user,
        numOfPosts,
        numOfFollowers,
        numOfFollowing,
        userImageURL,
        userName,
        fullName
    } = props
    return (
        <div className="infoContainer">
            <header className="allUserInfo">
                <section className="userStats">
                    <div className="usernameDiv">
                        <h1 id="usernameH1">{userName}</h1>
                    </div>
                    <div className="userImageContainer">
                        <div className="containerForBtn">
                            <div className="divForBtn">
                                <button>
                                    <img className="userIMG" src={userImageURL} alt={`Image of ${userName}`}/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="containerForNumberStats">
                        <div className="numOfPosts">{"numOfPosts"}</div>
                        <div className="numOfFollowers">{"numOfFollowers"}</div>
                        <div className="numOfFollowing">{"numOfFollowing"}</div>
                    </div>
                </section>
            </header>
        </div>
    )
}

export default UserInfo