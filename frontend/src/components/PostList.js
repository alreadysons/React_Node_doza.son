import React from 'react';
import PostItem from './PostItem';

function PostList({ posts, onUpdate, onDelete }) {
  return (
    <>
      {posts.map(post => (
        <PostItem
          key={post._id}
          post={post}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}

export default PostList;