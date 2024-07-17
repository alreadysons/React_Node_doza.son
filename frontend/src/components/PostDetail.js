import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { fetchPostById,deletePosts } from "../api/posts";

function PostDetail() {
    const {id} = useParams();
    const history = useHistory();
    const [post,setPost] = useState(null);

    useEffect(()=>{
        fetchPostById(id).then(response => setPost(response.data));
    },[id]);
    const handleDelete = () => {
        deletePosts(id).then(() => history.push('/'));
    };

    if(!post) return <div>Loading...</div>;
    
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={()=> history.push('/edit/${id}')}>Edit</button>
        </div>
    );
}

export default PostDetail;