import React, { useEffect, useState } from "react";
import {useHistory,useParams} from 'react-router-dom';
import { createPost,fetchPostById,updatePost } from "../api/posts";

function PostForm(){
    const {id} = useParams();
    const history = userHistory();
    const [title,setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(()=> {
        if(id) {
            fetchPostById(id).then(response => {
                setTitle(response.data.title);
                setContent(response.data.content);
            });
        }
    },[id]);

    const handleSummit = (e) => {
        e.preventDefault();
        const post = {title,content};

        if(id) {
            updatePost(id,post).then(()=> history.push('/post/${id}'));
        }
        else {
            createPost(post).then(()=> history.push('/'));
        }
    };
    return (
        <div>
            <h1>{id ? 'Edit Post' : 'New Post'}</h1>
            <form onSubmit={handleSummit}>
                <div>
                    <label>Title</label>
                    <input value={title} onChange={(e)=> setTitle(e.target.value)}/>
                </div>
                <div>
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type = 'submit'> {id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    )
}