import React, { Component } from 'react';
import * as api from '../api';
import PropTypes from 'prop-types';

class LogIn extends Component {
    state = {
        username:''
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className='login'>
                <h4>{this.props.user.name ? `Logged in as ${this.props.user.name}` : 'Log In'}</h4>
                {!this.props.user.name && <input type='text' placeholder='Username' onChange={this.handleChange} value={this.state.username}/>}
                <button>{this.props.user.name ? 'Log Out' : 'Log In'}</button>
            </form>
        );
    }

    handleChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(!this.props.user.name) {
            api.fetchUser(this.state.username)
                .then(user => {
                        this.props.setUser(user)
                    })
        } else {
            this.props.setUser({})
        }
    }
}

LogIn.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired
}
export default LogIn;