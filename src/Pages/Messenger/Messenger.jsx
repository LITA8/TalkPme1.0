import React, { useEffect, useRef, useState } from 'react';
import Conversation from '../../Components/Conversations/Conversation';
import Topbar from "../../Components/Topbar/Topbar"
import Message from "../../Components/Messages/Message"
import ChatOnline from "../../Components/ChatOnline/ChatOnline"
import './Messenger.css'
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Axios from 'axios'
import {io} from 'socket.io-client';

const Messenger = () =>{
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null); 
    const [onlineUsers, setOnlineUsers] = useState([]); 
    const socket = useRef();
    const [currentChat, setCurrentChat] = useState(null);
    const {user} = useContext(AuthContext);
    const scrollRef = useRef();
    const [users, setUsers] = useState([]);


    //ws: web socket

    useEffect(() =>{
        socket.current = io("ws://localhost:5000");
        socket.current.on("getMessage", data =>{
            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt: Date.now(),
            })
        })
    },[]);


    useEffect(() => {
        arrivalMessage && currentChat?.menbers.includes(arrivalMessage.sender)&&
        setMessages((prev) => [...prev,arrivalMessage]);
    },[arrivalMessage, currentChat]);

    useEffect(() =>{
        const getusers = async () => {
            try {
               const res = await Axios.get("http://localhost:4000/app/users/allUsers"); 
               setUsers(res.data);
            } catch (error) {
                console.log(error)
            }
        };
        getusers();
    }, []);

    //send Event to the sever we use socket.emit
    //take Event from server socket.on
    useEffect(()=>{
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers",(users) =>{
            setOnlineUsers(users.filter((u) => onlineUsers.u == users._id))
        })
    },[user]);

    useEffect(() =>{
        const getConvesations = async () => {
            try {
               const res = await Axios.get("http://localhost:4000/app/conversations/" + user._id); 
               setConversations(res.data);
            } catch (error) {
                console.log(error)
            }
        };
        getConvesations();
    }, [user._id]);

    

    
    useEffect(() => {
        const getMessages = async () =>{
            try {
                const res = await Axios.get("http://localhost:4000/app/message/" + currentChat?._id);
                setMessages(res.data);
            } catch (error) {
                console.log(error)
            }
        };
        getMessages();
    },[currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            sender : user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.menbers.find(menber => menber !==user._id)

        socket.current.emit("sendMessage",{
            senderId:user._id,
            receiverId,
            text:newMessage,
        })
        try {
            const  res = await Axios.post("http://localhost:4000/app/message/", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() =>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages])
    return (
        <>
            <Topbar />
            <div className="messenger">
               <div className="chatMenu">
                   <div className="chatMenuWrapper">
                        <input type="text" placeholder="Trover des collegues" className="chatMenuInput" />
                        {
                            conversations.map((c)=>(
                                <div onClick={()=> setCurrentChat(c)}>
                                     <Conversation  conversation={c} currentUser={user}/>
                                </div>
                            ))
                        }
                   </div>
               </div>
               <div className="chatBox">
                   <div className="chatBoxWrapper">
                   {   currentChat ?
                        
                        <>
                    <div className="chatBoxTop">

                        {
                            messages.map((m) =>(
                                <div ref={scrollRef}>
                                    <Message message={m} own={m.sender === user._id}/>
                                </div>
                            ))
                        }
                    </div>
                    <div className="chatBoxBottom">
                        <textarea 
                         name=""  
                         placeholder="Write somethings..." 
                         onChange={(e)=>setNewMessage(e.target.value)}
                         value={newMessage}
                         className="chatMessageInput"></textarea>
                         <button onClick={handleSubmit} className="chatSubmitButton appBackgroundColor">Send</button>
                    </div></> : <span>Open a conversation to start chating</span>}
                   </div>
               </div>
               <div className="chatOnline">
                   <div className="ChatOnlineWrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers} 
                            currentId={user._id} 
                            setOnlineUsers={setOnlineUsers}
                        />
                   </div>
               </div>
            </div>
        </>
    );
}

export default Messenger;