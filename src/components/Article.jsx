import React from 'react';
import { Link } from 'react-router-dom';
import Vote from './Vote';
import './Article.css';
import PropTypes from 'prop-types';


const Article = ({ article, user, short }) => {
        return (<div className = 'article'>
                    
                    <span className='title'><Link to={`/article/${article._id}`} ><h2>{article.title}</h2></Link></span>
                    <span className='user'><Link to={`/users/${article.created_by.username}`} ><h5>posted by {article.created_by.username}</h5></Link></span>
                    <p className='body'>{short ? `${article.body.slice(0, 150)}...` : article.body}</p>
                    <p className='comments'>comments: {article.comments}</p>
                    <Vote path={`articles/${article._id}`} votes={article.votes} user={user} />
                </div>
            
        );
}

Article.propTypes = {
    article: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    short: PropTypes.bool.isRequired
}

export default Article;