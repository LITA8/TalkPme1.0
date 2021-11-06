import React from 'react';
import './Topbar.css';
import { Col, Container, Row, NavDropdown,Navbar,FormControl,Nav,Form,Card,Carousel,Button} from 'react-bootstrap';
import {MdPhoneInTalk, MdNotifications, MdVerifiedUser, MdHome, MdDrafts, MdMenu } from 'react-icons/md';
import {FiAlertOctagon, FiBell, FiHome, FiMessageCircle} from 'react-icons/fi'
import {AuthContext} from "../../Context/AuthContext";
import {useContext} from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';


const  Topbar = () => {
     const { user } = useContext(AuthContext);
     const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="ToopbarContainer" >
            <>
                <Navbar bg="default" className="ToopbarContainer" fixed="top" variant="dark" style={{boxShadow:'0px 5px 8px -9px rgba(0, 0, 0, 0.75)', backgroundColor:'whitesmoke', height:'60px'}}>
                    <Container>
                        <Navbar.Brand href="#">
                            <MdPhoneInTalk style={{color:'rgb(0, 132, 255)'}} className="sizeIconLogo"/>
                            <span className="appColor logoName">TalkPme</span> 
                        </Navbar.Brand>

                        <Nav className="me-auto">
                            <Nav.Link href="#" style={{color:'rgb(0, 132, 255)', display:'flex'}}>
                                <Link to="/" style={{display:'flex'}}>
                                    <FiHome className="topbarSizeIcon"/> 
                                    <div className="topbarIconName">Home</div>
                                </Link>
                            </Nav.Link>
                            
                            <Nav.Link href="#" style={{color:'rgb(0, 132, 255)', display:'flex'}}> 
                                <Link to="#">
                                    <FiBell className="topbarSizeIcon" /> 
                                    <div className="notificationCount">1</div>
                                </Link>
                            </Nav.Link>
                            <Nav.Link href="#" style={{color:'rgb(0, 132, 255)', display:'flex'}}> 
                                <Link to="/messenger">
                                    <FiMessageCircle className="topbarSizeIcon"/> 
                                    <div className="notificationCount">9+</div>
                                </Link>
                            </Nav.Link>
                        </Nav>

                        <Nav className="me-auto" >
                            <Nav.Link href="#" style={{color:'rgb(0, 132, 255)'}} >
                                <Link to={`profile/${user.fullName}`}>
                                    <div className="topbarProfileContainer" style={{display:'flex'}}>
                                        <div className="topbarProfileInfo" style={{height:'45px', width:'45px', borderRadius:'90px'}} >
                                            <img 
                                                className="profilePicture"  
                                                src={
                                                    user.profilePicture 
                                                    ? PF + user.profilePicture 
                                                    : PF+"chatWork.svg"
                                                } 
                                                alt=""
                                            />
                                        </div>
                                        <span className="profileUnsername">{user.fullName}</span>
                                    </div>
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <button>
                    <MdMenu/>
                    <div className="showMenu">
                        <ul className="Menu">
                            <li>My option</li>
                            <li>My contacts</li>
                        </ul>
                    </div>
                </button>
            </>
        </div>
    );
}

export default Topbar;