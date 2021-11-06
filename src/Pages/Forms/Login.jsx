import React, { useContext} from 'react';
import './Login.css';
import { Col, Container, FormGroup, Row,Form, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import RegisterForm from './Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useRef,useEffect } from 'react';
import Axios from 'axios';
import {loginCall} from "../../apiCalls";
import { AuthContext } from '../../Context/AuthContext';
import { MdPhoneInTalk } from 'react-icons/md';
import {CircularProgress} from '@material-ui/core';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';




const LoginForms = () => {
    const history = useHistory();

    const email = useRef();
    const password = useRef();
    const {user, isFeching, error, dispatch}= useContext(AuthContext);
    const [fetchUsers, setFetchUsers] = useState([]);
    
    
    const handleClick = async(e) =>{
        e.preventDefault();
        try {
            /*const res = await Axios.get("http://localhost:4000/app/users/allUsers");
            setFetchUsers(res.data);
            fetchUsers.filter((u)=>{
                sessionStorage.setItem("_id",u._id);
                sessionStorage.setItem("fullName",u.fullName);
                sessionStorage.setItem("division",u.division);
                sessionStorage.setItem("profilePicture",u.profilePicture);
                sessionStorage.setItem("email",email.current.value);
                sessionStorage.getItem("division");
                sessionStorage.getItem("fullName");
                console.log( sessionStorage.getItem("profilePicture"));
            })
            if(sessionStorage.getItem("email")){
                history.push("/")
            }*/
            
        } catch (error) {
            console.log(error);
            dispatch({type: "LOGIN_FAILURE", payload:error});
        }
        loginCall({email:email.current.value, password:password.current.value}, dispatch);
        sessionStorage.setItem("email",email.current.value)
        console.log(sessionStorage.getItem("email"))
    }
    
    return (
            <div className="loginForm" id="LoginForm">
                <Container fluid>
                    <Row>
                        <Col md={6}>
                            <div className="formDescription">
                                <Container>
                                    <Row>
                                        <Col>
                                            <img className="appPhoto" src="./assets/chatWork.svg" alt=""/>
                                            <div className="insideFormDescription">
                                                <h2 style={{display:'flex', alignItems:'center'}} className="appName appColor"> <MdPhoneInTalk/> TalkPme</h2>
                                                <p className="appNameDescription">Comuniquer avec le reste du personnel</p>    
                                            </div> 
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Col>

                        <Col md={6} xs={12}>
                            <div className="formContainer">
                                <h2>Conexion</h2>
                                <Form className="login_form" onSubmit={handleClick}>
                                    <Form.Label className="formLabel"></Form.Label>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control type="email"
                                        require
                                        ref={email}
                                            className="FormInput fText" placeholder="Your email" 
                                        />
                                    </Form.Group>

                                    <Form.Label className="formLabel"></Form.Label>
                                    <Form.Group controlId="exampleForm.ControlInput2">
                                        <Form.Control type="password"
                                            ref={password}
                                            require
                                            minLength="6"
                                            className="FormInput fText" placeholder="Your password" 
                                        />
                                    </Form.Group>
                                    
                                    <button className="connexionButton appBackgroundColor" disabled={isFeching}>{isFeching ? (<CircularProgress color="inherit" size={16} />) : "Connexion"}</button>

                                    <Link to="/register">Nouveau sur App?J'ai pas de compte</Link><br/>
                                    <Link> Mot de passe oublier</Link>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
    );
}

export default LoginForms;