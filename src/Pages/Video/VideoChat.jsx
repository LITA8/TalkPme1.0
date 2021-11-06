import React from 'react';
import './VideoChat.css'
import {Col, Container, Row} from 'react-bootstrap';
import ChatOnline from "../../Components/ChatOnline/ChatOnline"
import CreateRooms from "../../Components/CreateRooms/CreateRooms"
import Sidebar from "../../Components/Sidebar/Sidebar"
import Topbar from "../../Components/Topbar/Topbar"

const VideoConfrence = () =>{ 
    return (
        <>
            <Topbar/>
            <div className="videoCoference">
            <Container fluid>
                    <Row>
                        <Col md={3}>
                            <Sidebar />
                        </Col>
                        <Col md={7}>
                            <CreateRooms/>
                        </Col>
                    </Row>
            </Container>
            </div>
        </>
    );
}

export default VideoConfrence;