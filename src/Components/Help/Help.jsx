import React, { useEffect, useRef, useState, useContext } from 'react';
import './Help.css'
import Axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import HelpItems from '../HelpsItems/HelpItems';
import { FiSend } from 'react-icons/fi';

const Help = () => {
    const helpMessage = useRef();
    const {user} = useContext(AuthContext);
    const [helps, setFindHelp] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;



    const submitHandler = async (e) => {
        e.preventDefault();
        const newHelp = {
            userId: user._id,
            helpMessageContent:helpMessage.current.value
        }
        try {
            await Axios.post("http://localhost:4000/app/helpdesk/",newHelp);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="help">
            <div className="helpWrapper">
                <div className="helpInputcontainer">
                    <input 
                        type="text"  
                        placeholder={"Vous avez un probleme.. " +user.fullName + "?"}
                        className="helpInput"
                        ref={helpMessage}
                    />
                    <button className="helpButton appBackgroundColor" onClick={submitHandler}><FiSend/> </button>
                </div>

                <h5 className="helpListTitle">D'autres requetes</h5> 
                <div className="helpList">
                    <div className="helpListItems">
                        <HelpItems/>
                    </div>       
                </div>
            </div>
        </div>
    );
}

export default Help;