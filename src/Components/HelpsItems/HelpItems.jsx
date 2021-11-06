import React, { useEffect, useRef, useState, useContext } from 'react';
import './HelpItems.css'
import { FiHelpCircle, FiMessageSquare, FiVideoOff } from 'react-icons/fi';
import Axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { format } from 'timeago.js';
import { MdMore } from 'react-icons/md';

const HelpItems = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [helps, setFindHelp] = useState([]);
    useEffect(() =>{
        const fetchHelps = async() => {
            const res = await Axios.get("http://localhost:4000/app/helpdesk/helps");
            setFindHelp(res.data);
        }
        fetchHelps();
    },[]);

    return (
        <div className="helpItems">

            {
                helps.map((h) => (
                    <div className="helpListItem appBackgroundColor">
                        <img src={ h.profilePicture ? PF + h.profilePicture : PF + "chatWork.svg"} alt="" className="helpListProfilePicture"/>
                        <div className="helpListMessages">{h.helpMessageContent}</div>
                        <small className="dateSend" style={{fontSize:'10px'}}>{format(h.createdAt)}</small>
                        <div className="helpListOptionsIcons"> <MdMore/> </div>
                    </div>
                ))
            }
        </div>
    );
}

export default HelpItems;