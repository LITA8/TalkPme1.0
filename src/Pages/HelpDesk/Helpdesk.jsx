import React from 'react';
import './HelpDesk.css'
import Topbar from "../../Components/Topbar/Topbar"
import Sidebar from '../../Components/Sidebar/Sidebar';
import Feed from "../../Components/Feed/Feed"
import {Container, Row, Col} from 'react-bootstrap'
import Rightbar from '../../Components/Rightbar/Rightbar';
import Help from '../../Components/Help/Help';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const Helpdesk = () =>{
    return (
        <div className="helpdesk">
            <Topbar/>
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <div className="HelpDeskContainer">
                            <Sidebar/>
                        </div>
                    </Col>
                    <Col  md={9}>   
                        <Help/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Helpdesk;