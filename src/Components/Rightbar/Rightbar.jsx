import React, { useReducer } from 'react';
import './Rightbar.css'
import { MdVerifiedUser } from 'react-icons/md';
import ChatOnline from '../ChatOnline/ChatOnline';
import Axios from 'axios';

const Rightbar = ({user}) =>{

    const HommeRightBar = () => {
        return(
            <>
                <div className="rightbarTitle">Online Contacts</div>
                <ul className="rightbarList">
                    <ChatOnline />
                </ul>
            </>
        );
    }

    const ProfileRightbar = () =>{
        const handleClick =  async () => {
            const newPresent = {
            userId: user._id,
        }
            const res = await Axios.post("http://localhost:4000/app/present/signPresent/" ,newPresent);
        }
        return(
            <>
                <h4 className="rightbarTitle">Hey This is my profile</h4>
                <button className="rightbarSingPresentBotton appBackgroundColor" onClick={handleClick}><MdVerifiedUser/> Je suis Present</button>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Division :{user.division}</span><br/>
                        <span className="rightbarInfoKey">Status : Au travail...</span><br/>
                        <span className="rightbarInfoKey">email : {user.email} </span>
                    </div>
                </div>
            
            
            </>
        );
    }

    return (
        <div className="rightbar">
            <div className="rigthbarWrapper">
               {user ? <ProfileRightbar/> : <HommeRightBar/>}
            </div>
        </div>
    );
}

export default Rightbar;