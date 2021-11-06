import React, { useState,useEffect, useContext } from 'react';
import './Post.css'
import { FiMoreVertical } from 'react-icons/fi'
import Axios from "axios"
import {format} from "timeago.js";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from '../../Context/AuthContext';
import {BiLike} from 'react-icons/bi'


const Post = ({post}) => {
    const {user:currentUser} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.likes.length);
    const [isLike, setIsLike] = useState(false);
    const[user, setUsers] = useState({});

    useEffect(() => {
        setIsLike(post.likes.includes(currentUser._id))
    }, [currentUser._id,post.likes])

    useEffect(() =>{
        const fetchUsers =  async () => {
            const res = await Axios.get(`http://localhost:4000/app/users?userId=${post.userId}`);
            setUsers(res.data);
        };
        fetchUsers();
    }, [post.userId]);

    const likeHandler = () => {

        try {
            Axios.put(" http://localhost:4000/app/posts/" + post._id + "/like", {userId: currentUser._id});
        } catch (error) {
            console.log(error);
        }
        setLike(isLike ? like-1 : like+1);
        setIsLike(!isLike);
    }

    const handleDeletePost = async() => {
        try {
            await Axios.delete(`http://localhost:4000/app/posts/${post._id}/${currentUser._id}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }


    const showEditOptions = () => {
    }
    showEditOptions();
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.fullName}`}>
                            <img
                                src={user.profilePicture? PF + user.profilePicture : PF + "chatWork.svg"}
                                alt="" 
                                className="postProfilePicture"
                            />
                            <span className="postUsername">
                                {user.fullName}
                            </span>
                        </Link>
                        <span className="postDate">
                        {format(post.createdAt)}
                        </span>
                    </div>
                    <div className="postTopRight">
                        <FiMoreVertical/>
                        <div className="postEditOptions" onClick={showEditOptions} id="postEditOptions"  style={{display:"none"}}>
                            <ul>
                                <li>Update</li>
                                <li onClick={handleDeletePost}>Delete</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="postCenter">
                    <div> 
                        <span className="postText">{post?.description}</span>
                        {
                            post.typePost == "img" ?
                            <>
                                <span className="postText">{post?.description}</span>
                                <img className="postImage" id="postImage" src={PF+post.img} alt=""/>
                            </>
                            :
                            <>
                                <video id="postVideo" width="100%" controls>
                                    <source src={PF+post.img} />
                                </video>
                            </>
                        }
                    </div> 
                </div>
                <hr/>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <div className="likeIcon appBackgroundColor"><BiLike className="sizeICON" color="white" onClick={likeHandler}/></div>
                        <span className="postCommentText">{like} personnes on liker</span>
                    </div>
                    <div className="postBottomRight">
                        <img className="likeIcon" src="assets/chatWork.svg" alt=""/>
                        <span className="postCommentText">{post.comment}  personnes on liker</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;