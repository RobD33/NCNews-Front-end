import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../api';
import Comment from './Comment';
import Article from './Article';
import Post from './Post';
import PropTypes from 'prop-types';
import { Wave } from 'react-animated-text';
import './ArticlePage.css'

class ArticlePage extends Component {
    state = {
        article:null,
        comments:[], 
        error:null
    }
    render() {
        if(this.state.error) {
            const state = this.state.error
            const pathname = `/${state.status}`
            return <Redirect to={{pathname, state}}/>
        } else return (
            <div className='page'>
                {!this.state.article && <h1><Wave 
                    text="Loading..."
                    direction='right'
                    delay={1}
                    speed={25}
                    effect='color'
                    effectChange='red'
                    effectDuration={1}
                    /></h1>}
                {this.state.article && <Article 
                                            article={this.state.article} 
                                            user={this.props.user}
                                            short={false}
                                            />}
                {this.state.article && <Post 
                                            type='comment' 
                                            path={`articles/${this.state.article._id}/comments`} 
                                            addContent={this.addContent} user={this.props.user} 
                                            />}
                <span className='comments'>{this.state.comments.map(comment => {
                    return <Comment comment={comment} key={comment._id} user={this.props.user} removeComment={this.removeComment}/>
                })}</span>
            </div>
        );
    }

    componentDidMount() {
        const {article_id} = this.props.match.params
        Promise.all([api.fetchComments(article_id), api.fetchArticle(article_id)])
            .then(([commentsResponse, articleResponse]) => {
                if(commentsResponse.msg || articleResponse.msg) {
                    const error = commentsResponse.msg ? commentsResponse : articleResponse
                    this.setState({
                        error
                    })
                } else {
                    let comments = commentsResponse;
                    const article = articleResponse
                    comments = comments.sort((a, b) => b.votes - a.votes)
                    this.setState({
                        comments,
                        article
                    })
                }
            })
    }

    addContent = (content) => {
        const comments = [...this.state.comments, content]
        this.setState({
            comments
        })
        const {article_id} = this.props.match.params
        api.fetchComments(article_id)
            .then(response => {
                if(response.msg) {
                    this.setState({
                        error: response
                    })
                } else {
                     this.setState({
                        comments: response
                    })
                }
            })
        
    }

    removeComment = (comment_id) => {
        const comments = [...this.state.comments].filter(comment => {
            return comment._id !== comment_id
        })
        this.setState({
            comments
        })

    }
}

ArticlePage.propTypes = {
    user: PropTypes.object.isRequired
}

export default ArticlePage;