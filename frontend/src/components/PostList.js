import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../api/posts";

function PostList() {
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        fetchPosts().then(response => setPosts(response.data));
    },[]);

    return (
        <div>
            <h1>Posts</h1>
            <Link to='/new'>New Post</Link>
            <ul>
                {posts.map(post=> (
                    <li key={post.id}>
                        <Link to={'/post/${post.id'}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;