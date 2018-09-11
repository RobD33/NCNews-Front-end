import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom'
import ArticlesPage from './components/ArticlesPage';
import ArticlePage from './components/ArticlePage';
import LogIn from './components/LogIn';
import Error from './components/Error';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';


class App extends Component {
  state = {
    topics:[],
    user:{}
  }

  render() {
    return (
      <div className="App">
        <Link to='/' className='header'><img src = {require('./Images/Northcoders.png')} alt='Northcoders' className='headerimg'/></Link>
        <LogIn setUser={this.setUser} user={this.state.user} />
        <Navbar />
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

  setUser = (user) => {
    this.setState({
      user
    })
  }
}

export default App;
