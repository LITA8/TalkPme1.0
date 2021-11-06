import React,{useEffect} from 'react';
import './Home.css';
import Topbar from "../../Components/Topbar/Topbar"
import Sidebar from '../../Components/Sidebar/Sidebar';
import Feed from "../../Components/Feed/Feed"
import {Container, Row, Col} from 'react-bootstrap'
import Rightbar from '../../Components/Rightbar/Rightbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Home = () => {

    return (
        <div className="home">
            <Topbar/>
            <div className="homeContainer">
                <Sidebar className="homeSidebar"/>
                <Feed className="homeFeed" />
                <Rightbar className="homeRightbar" />
            </div>
            
        </div>
    );
}

export default Home;