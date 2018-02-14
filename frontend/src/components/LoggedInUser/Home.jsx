import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import axios from 'axios'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInAs: '',
            followings: []
        }
    }

    componentDidMount() {
        // set loggedInAs as the current user logged in 
        this.setState({
            loggedInAs: this.props.user
        })
    }

    // Make ajax request to see who the user follows 
    getFollowing = () => {
        const { loggedInAs } = this.state
        if (loggedInAs) {
            axios
                .get(`/u/${loggedInAs.user_id}/following`)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    // Grab all photos posted by these users 

    // Map through the photos 

    // Display inside render() 

    render() {
        const { loggedInAs } = this.state
        console.log(loggedInAs)

        return (
            <div>

                <div>
                    <h1>This is the home feed.</h1>
                    <p>Store logged in user in state.Look for users that the logged in user follows. Grab all photos that these users have posted, and feed them to this 'Home' page.</p>
                    <div>
                        <p><Link to={`/users/u/${1}/profile`}>OptimusPrime</Link></p>
                        <img alt='awesome photo url from an ajax request' />

                    </div>
                </div>
            </div>
        )
    }
}

export default Home 