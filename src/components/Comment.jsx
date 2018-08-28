import React, { Component } from 'react';
import Vote from './Vote';
import * as api from '../api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Comment.css'

class Comment extends Component {
    state = {
        userComment: false
    }
    render() {
        const { comment } =this.props
        return (
            <div className='comment'>
                {this.state.userComment && <button onClick={this.deleteComment} className='delbutton'>X</button>}
                <Link to={`/users/${comment.created_by.username}`} className='user'>{comment.created_by.username}</Link>
                <p className='body'>{comment.body}</p>
                <Vote path={`comments/${comment._id}`} votes={comment.votes} user={this.props.user} className='vote'/>
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            this.checkUser()
        }
    }

    componentDidMount() {
        this.checkUser()
    }

    checkUser = () => {
        if(this.props.user._id === this.props.comment.created_by._id){
            this.setState({
                userComment: true
            })
        } else {
            this.setState({
                userComment: false
            })
        }
    }

    deleteComment = () => {
        const { _id } = this.props.comment
        this.props.removeComment(_id)
        api.deleteComment(_id)   
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired
}

export default Comment;