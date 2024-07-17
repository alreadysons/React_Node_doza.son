import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={PostList}/>
        <Route path='/post/:id' component={PostDetail}/>
        <Route path='/new' component={PostForm}/>
        <Route path='/edit/:id' component={PostForm}/>

      </Switch>
    </Router>
  );
}

export default App;
