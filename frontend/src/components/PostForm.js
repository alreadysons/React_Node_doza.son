import React, { useState, useEffect } from 'react';

function PostForm({ onSubmit, initialData, onCancel }) {
  const [postData, setPostData] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    if (initialData) {
      setPostData(initialData);
    }
  }, [initialData]);

  const handleChange = (event) => {
    setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(postData);
    setPostData({ title: '', content: '', author: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow mb-6">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={postData.title}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      <textarea
        name="content"
        placeholder="Content"
        value={postData.content}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
        rows="4"
      ></textarea>
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={postData.author}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {initialData ? 'Save' : 'Create Post'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default PostForm;