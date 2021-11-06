import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Conversation.css'

const Conversation = ({conversation, currentUser}) => {
    const [user, setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() =>{
        const freindId = conversation.menbers.find((m) => m !== currentUser._id);
        const getUser = async () =>{
            try {  
                const res = await Axios.get('http://localhost:4000/app/users?userId=' + freindId);
                setUser(res.data);
            } catch (error) {
                console.log(error)
            }
        };
        getUser();
    },[currentUser, conversation]);
    return (
        <div className ="conversation">
            <img src={ user?.profilePicture ? user.profilePicture : PF + "chatWork.svg"} alt="" className="conversationImage" />
            <span className="coversationName">{user?.fullName}</span>
        </div>
    );
}

export default Conversation;