import React from 'react';
import './Profile.css'
import Topbar from "../../Components/Topbar/Topbar"
import Sidebar from '../../Components/Sidebar/Sidebar';
import Feed from "../../Components/Feed/Feed"
import {Container, Row, Col} from 'react-bootstrap'
import Rightbar from '../../Components/Rightbar/Rightbar';
import {useEffect, useState} from 'react'
import Axios from 'axios';
import { useParams } from 'react-router';

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const fullName = useParams().fullName;

    useEffect(() =>{
        const fetchUsers =  async () => {
            const res = await Axios.get(`http://localhost:4000/app/users?fullName=${fullName}`);
            setUser(res.data);
        };
        fetchUsers();
    }, [fullName]);

    return (
        <>
            <Topbar/>
        <div className="profile">
            <div className="profileRight">
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <Sidebar/>
                        </Col>
                        <Col md={9}>
                        <div className="profileRightTop">
                            <img src={`${PF}chatWork.svg`} alt="" className="profileCoverPage"/>
                            <img src={`${PF}chatWork.svg`} alt="" className="profileUserImg"/>
                        </div>
                            <Row>
                                <Col>
                                    <div className="profileInfo">
                                        <h4 className="profileInfoName">{user.fullName}</h4>
                                        <span className="profileInfoDescription">{user.description}</span>
                                    </div>
                                    <div className="profileRIghtBottom">
                                        <Feed fullName={fullName}/>
                                        <Rightbar user={user}/>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        </>
    );
}

export default Profile;