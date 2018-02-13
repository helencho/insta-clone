import React from 'react'
import {Route, Link, Switch} from "react-router-dom"

const UserInfo = (props) => {
    const {user} = props
    return (
        <div className="infoContainer">
            <header className="allUserInfo">
                <div className="userImage">
                    <div className="containerForBtn">
                        <div className="divForBtn">
                            <button onClick={/*run some function*/}>
                                <img/>
                            </button>
                        </div>
                    </div>
                </div>
                <section className="userStats">
                    <div className="usernameDiv">
                        <h1 id="usernameH1">USERNAME</h1>
                    </div>
                    <div className="containerForNumberStats">
                        <div className="numOfPosts">Number of Posts here</div>
                        <div className="numOfFollowers">Number of Followers here</div>
                        <div className="numOfFollowing">Number of Following here</div>
                    </div>
                </section>
            </header>
        </div>
    )
}

export default UserInfo