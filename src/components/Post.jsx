import React, { Component } from 'react';
import * as api from '../api';
import PropTypes from 'prop-types';
import './Post.css'

class Post extends Component {
    state = {
        title:'',
        body:'',
        postFailed: false
    }
    render() {
        const { type } = this.props
        return (
            <div className='post'>
                <form onSubmit={this.submit}>
                    {type === 'article' && 
                        <input
                            type='text' placeholder='Title'
                            onChange={this.changeTitle}
                            value={this.state.title}
                            className='titleBox'
                    />}
                    <input 
                        type='text' 
                        placeholder={type==='article' ? 'Article text' : 'What are your thoughts?'}
                        onChange={this.changeBody}
                        value={this.state.body}
                        className='bodyBox'
                    />
                    <button className='subButton'>{`Post ${type==='article' ? 'Article' : 'Comment'}`}</button>
                    {!this.props.user.name && <p>You must be logged in to post!</p>}
                    {this.state.postFailed && <p>Post failed, please check fields and resubmit!</p>}
                </form>
            </div>
        );
    }

    changeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    changeBody = (event) => {
        this.setState({
            body: event.target.value
        })
    }

    submit = (event) => {
        event.preventDefault();
        const content = {
            title: this.state.title,
            body: this.state.body,
            created_by: this.props.user._id,
            user: this.props.user._id,
        }
        api.postContent(this.props.path, content)
            .then(() => {
                this.props.addContent(content) 
                this.setState({
                    title: '',
                    body: '',
                    postFailed: false
                })
            })
            .catch(() => {
                this.setState({
                    postFailed: true
                })
            })
        
      
    }
}

Post.propTypes = {
    type: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    addContent: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Post;