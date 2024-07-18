import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import { Navbar, Container } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Blog</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/new" element={<PostForm />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<PostForm />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App; // default export 추가
