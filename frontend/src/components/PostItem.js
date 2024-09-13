import React, { useState } from 'react';
import PostForm from './PostForm';

function PostItem({ post, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedPost) => {
    onUpdate(post._id, updatedPost);
    setIsEditing(false);
  };

  return (
    <article className="w-full bg-white p-4 rounded-lg shadow mb-4">
      {isEditing ? (
        <PostForm
          initialData={post}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h2 className="text-xl font-bold text-blue-600">{post.title}</h2>
          <p className="mt-2 text-gray-700">{post.content}</p>
          <p className="mt-1 text-gray-500 text-sm">
            <small>By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</small>
          </p>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(post._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export default PostItem;