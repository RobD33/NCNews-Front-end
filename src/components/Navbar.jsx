import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import * as api from '../api'

class Navbar extends Component {
    state = {
        topics: []
    }
    render() {
        return (
            <span className='navbar'>
                {this.state.topics.map(topic => {
                    return <NavLink to={`/topic/${topic.slug}`}  className='navlink' key={topic._id}>{topic.title}</NavLink>
                })}
            </span>
        );
    }

    componentDidMount() {
        api.fetchTopics()
          .then(topics => {
          this.setState({
            topics
          })
        })
    }
  
}

export default Navbar;