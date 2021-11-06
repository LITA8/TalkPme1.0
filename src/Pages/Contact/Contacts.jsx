import React from 'react';
import Topbar from "../../Components/Topbar/Topbar"
import Sidebar from '../../Components/Sidebar/Sidebar';
import Feed from "../../Components/Feed/Feed"
import {Container, Row, Col} from 'react-bootstrap'
import Rightbar from '../../Components/Rightbar/Rightbar';
import Help from '../../Components/Help/Help';
import MyContacts from '../../Components/MyContacts/MyContacts';


const Contacts = () => {
    return (
        <div className="contacts">
            <Topbar/>
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <div className="contactsContainer">
                        <Sidebar/>
                        </div>
                    </Col>
                    <Col  md={9}>
                        <MyContacts/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Contacts;