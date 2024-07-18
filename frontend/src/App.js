import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/new" element={<PostForm />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={<PostForm />} />
      </Routes>
    </Router>
  );
}

export default App;
