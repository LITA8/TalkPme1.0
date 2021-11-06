import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import './MyContacts.css'
import { FiMessageSquare, FiVideo } from 'react-icons/fi'
import Axios from 'axios'
import { useState, useEffect } from 'react';

const MyContacts = ({currentId}) => {
    const [contacts, setContacts] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getContacts = async () => {
            const res = await Axios.get("http://localhost:4000/app/users/allUsers");
            setContacts(res.data);
        }
        getContacts();
    },[]);

    const handleClick = async (user) => {
        try {
            const res = await Axios.get(`http://localhost:4000/app/conversations/find/${currentId}/${user._id}`);
            console.log(currentId);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="myContacts">
            <div className="myContactsWrapper">
                        <h5>My Contacts</h5>
                <Container fluid>
                    <Row>
                        {
                            contacts.map((c)=>(
                                <Col md={2} className="mycontactsProfile">
                                    <img src={c.profilePicture ? PF + c.profilePicture : PF + "chatWork.svg"} alt="" className="myContactsProfilePicture"/>
                                    <div className="myContactsOptionsIcons">
                                        <h4 className="myContactsProfileName">{c.fullName}</h4>
                                        <span className="myContactsIcons">
                                            <button className="myContactsIcon myContactsIconColorMessage appBackgroundColor"><FiMessageSquare /></button>
                                            <button className="myContactsIcon myContactsIconColorVideo"><FiVideo /></button>
                                        </span>
                                    </div>
                                </Col> 
                            ))
                        }
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default MyContacts;