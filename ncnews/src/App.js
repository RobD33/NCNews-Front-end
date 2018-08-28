import React, { Component } from 'react';
import './App.css';
import { Route, NavLink, Link, Switch } from 'react-router-dom'
import * as api from './api';
import ArticlesPage from './components/ArticlesPage';
import ArticlePage from './components/ArticlePage';
import LogIn from './components/LogIn';
import Error from './components/Error';
import UserProfile from './components/UserProfile';


class App extends Component {
  state = {
    topics:[],
    user:{}
  }

  render() {
    return (
      <div className="App">
        <Link to='/' ><img src = {require('./Images/Northcoders.png')} alt='Northcoders' className='headerimg'/></Link>
        <LogIn setUser={this.setUser} user={this.state.user} />
        {this.state.topics.length && <span className='navbar'>{this.state.topics.map(topic => {
          return <span key={topic._id} ><NavLink to={`/topic/${topic.slug}`} className='navlink'>{topic.title}</NavLink>    </span>
        })}</span>}
        <Switch>
          <Route exact path='/' render={(props) => <ArticlesPage {...props} user={this.state.user}/>}/>
          <Route exact path='/topic/:topic_slug' render={(props) => <ArticlesPage {...props} user={this.state.user}/>}/>
          <Route exact path='/article/:article_id' render={(props) => <ArticlePage {...props} user={this.state.user}/>}/>
          <Route exact path='/users/:username' component={UserProfile} />
          <Route exact path='/*' component={Error}/>
        </Switch>
      </div>
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

  setUser = (user) => {
    this.setState({
      user
    })
  }
}

export default App;
