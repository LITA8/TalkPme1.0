import React, { useContext, useReducer } from 'react';
import Post from '../Post/Post';
import Share from '../Share/Share';
import './Feed.css'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from'axios'
import { AuthContext } from '../../Context/AuthContext';

const Feed = ({fullName}) => {

    const[posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() =>{
        const fetchPosts =  async () => {
            const res = fullName
                ? await Axios.get("http://localhost:4000/app/posts/profile/"+fullName)
                : await Axios.get("http://localhost:4000/app/read/");
            setPosts(res.data.sort((p1,p2)=>{
                return new Date(p2.createdAt)- new Date(p1.createdAt);
            }));
        };
        fetchPosts();
    }, [fullName]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {
                    posts.map((p) => (
                        <Post key={p._id} post={p} />
                    ))
                }
            </div>
        </div>
    );
}

export default Feed;