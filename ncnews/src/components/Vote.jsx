import React, { Component } from 'react';
import * as api from '../api';
import PropTypes from 'prop-types';

class Vote extends Component {
    state={
        vote:0
    }
    render() {
        return (
            <div className='vote'> 
                <button 
                    onClick={() => this.changeVote(1)} 
                    disabled={!this.props.user.name}>
                    <span role='img' aria-label='vote up'>👆</span>
                </button>
                <p>votes: {this.props.votes + this.state.vote}</p>             
                <button 
                    onClick={() => this.changeVote(-1)} 
                    disabled={!this.props.user.name}>
                    <span role='img' aria-label='vote down'>👇</span>
                </button>   
            </div>
        );
    }

    changeVote = (vote) => {
        if(this.props.user.name) {
            let total = this.state.vote + vote, direction, calls;
            if(total === 2 || total === -2) {
                direction = vote === 1 ? 'down' : 'up'
                calls = 1
                vote = 0
            }
            if(total === 1 || total === -1) {
                direction = vote === 1 ? 'up' : 'down'
                calls = 1
            } 
            if(total === 0) {
                direction = vote === 1 ? 'up' : 'down'
                calls = 2;
            }
            while (calls > 0) {
                api.patchVotes(this.props.path, direction);
                calls--;
            }
            this.setState({
                vote
            })
        }
    }
}

Vote.propTypes = {
    user: PropTypes.object.isRequired
}

export default Vote;