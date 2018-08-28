import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import * as api from '../api';
import Article from './Article';
import Post from './Post';
import PropTypes from 'prop-types';
import { Wave } from 'react-animated-text';

class ArticlesPage extends Component {
    state = {
        articles:[],
        error: null
    }
    render() {
        const { topic_slug } = this.props.match.params
        if(this.state.error) {
            const state = this.state.error
            const pathname = `/${state.status}`
            return <Redirect to={{pathname, state}}/>
        } else return (
            <div className='page'>
                {!this.state.articles.length && <h2><Wave 
                    text="Loading..."
                    direction='right'
                    delay={1}
                    speed={25}
                    effect='color'
                    effectChange='red'
                    effectDuration={1}
                    /></h2>}
                {topic_slug && <Post type='article' 
                                    path={`topics/${topic_slug}/articles`} 
                                    addContent={this.addContent} 
                                    user={this.props.user}/>}
                {this.state.articles.map(article => {
                    return <Article article={article} key ={article._id} user={this.props.user} short={true}/>
                })}
            </div>
        );
    }

    componentDidMount() {
        this.fetchArticles()
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            this.fetchArticles()
        }
    }
    
    fetchArticles = () => {
        const {params: {topic_slug}} = this.props.match;
        if(!topic_slug){
            api.fetchAllArticles()
            .then(this.handleResponse)
        } else {
            api.fetchArticlesByTopic(topic_slug)
                .then(this.handleResponse)
        }
    }

    addContent = (content) => {
        const articles = [...this.state.articles, content]
        this.setState({
            articles
        })
    }

    handleResponse = (response) => {
        if(response.msg) {
            this.setState({
                error: response
            })
        } else {
             this.setState({
                articles: response
            })
        }  
    }
}

ArticlesPage.propTypes = {
    user: PropTypes.object.isRequired
}

export default ArticlesPage;