import React from 'react';
import './Sidebar.css';
import { FiActivity, FiGithub, FiHelpCircle, FiMail, FiMessageSquare, FiPhoneCall, FiVideo } from 'react-icons/fi'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
               <ul className="sidebarList">
                    <Link to="/">
                        <li className="sidebarListItem">
                            <FiActivity className="sidebarIcon"/>
                            <span className="sidebarListItemText">APME Actu</span>
                        </li>
                    </Link>
                    <Link to="helpdesk">
                        <li className="sidebarListItem">
                            <FiHelpCircle className="sidebarIcon"/>
                            <span className="sidebarListItemText">HelpDesk</span>
                        </li>
                    </Link>
                    {/*<Link to="contacts">
                        <li className="sidebarListItem">
                            <FiPhoneCall className="sidebarIcon"/>
                            <span className="sidebarListItemText">Contacts</span>
                        </li>
                    </Link>*/}
                    <Link to="messenger">
                        <li className="sidebarListItem">
                            <FiMessageSquare className="sidebarIcon"/>
                            <span className="sidebarListItemText">Chats</span>
                        </li>
                   </Link>
                   <Link to="video-chat">
                        <li className="sidebarListItem">
                            <FiVideo className="sidebarIcon"/>
                            <span className="sidebarListItemText">VideoConference</span>
                        </li>
                    </Link>
               </ul>
                <hr className="divideHr"/>
               <div className="talktothewebmaster">
                    <a href="https://github.com/LITA8">
                        <button className="mailTheWebmaster">
                            <FiGithub className="sidebarIcon"/>About Me
                        </button>
                    </a>
               </div>
            </div>
        </div>
    );
}

export default Sidebar;