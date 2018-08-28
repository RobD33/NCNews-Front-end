import React, { Component } from 'react';
import * as api from '../api'
import { Redirect } from 'react-router-dom';

class UserProfile extends Component {
    state = {
        user: {},
        error:null
    }
    render() {
        const { user } = this.state
        if(this.state.error) {
            const state = this.state.error
            const pathname = `/${state.status}`
            return <Redirect to={{pathname, state}}/>
        } else return (
            <div>
                <p>Name: {user.name}</p>
                <p>Username: {user.username}</p>
                <img src={user.avatar_url} alt='avatar'/>
            </div>
        );
    }

    componentDidMount() {
        const {params: {username}} = this.props.match;
        api.fetchUser(username)
            .then(response => {
                if(response.msg){
                    this.setState({
                        error: response
                    })
                } else {
                    this.setState({
                        user: response
                    })
                }
            })
    }
}

export default UserProfile;