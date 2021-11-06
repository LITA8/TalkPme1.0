import React from 'react';
import { Col, Container, Row, Form, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './Register.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {useRef} from 'react'
import {CircularProgress} from '@material-ui/core';
import { MdPhoneInTalk } from 'react-icons/md';

const RegisterForm = () => {
    const history = useHistory();
    const fullName = useRef();
    const division = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();


    const handleForm = async(e) => {
        e.preventDefault();

        if (confirmPassword.current.value !== password.current.value) {
            password.current.setCustomValidity("password don't match!")
        }else{
            const user = {
                fullName: fullName.current.value,
                email: email.current.value,
                division: division.current.value,
                password: password.current.value,
                confirmPassword : confirmPassword.current.value
            };

            try {
                await Axios.post("http://localhost:4000/app/auth/register",user);
                history.push("/login")
            } catch (error) {
                console.log(error);
            }
        }
    };
  
    return (
            <div className="registerForm" id="RegisterForm">
                <Container fluid>
                    <Row>
                        <Col md={6}>
                            <div className="formDescription"> 
                                <img className="appPhoto" src="./assets/emailling.svg" alt=""/>
                                <div className="insideFormDescription">
                                    <h2 style={{display:'flex', alignItems:'center'}} className="appName appColor"><MdPhoneInTalk className="appName"/>TalkPme</h2>
                                    <p className="appNameDescription">Comuniquer avec le reste du personnel</p>    
                                </div>  
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="formContainer">
                                <h2>Sign In</h2>
                                <Form className="login_form" onSubmit={handleForm}>
                                    <Form.Label className="formLabel"></Form.Label>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text"
                                            className="FormInput fText"
                                            placeholder="Noms et prenoms"
                                            ref={fullName}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Label className="formLabel"></Form.Label>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label></Form.Label>
                                        <Form.Control type="text"
                                            className="FormInput fText"
                                            placeholder="Division"
                                            ref={division}
                                            required 
                                        />
                                    </Form.Group>

                                    <Form.Label className="formLabel"></Form.Label>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control type="email"
                                            className="FormInput fText" 
                                            placeholder="Email"
                                            ref={email}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Label className="formLabel"></Form.Label>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control type="password"
                                            className="FormInput fText" 
                                            placeholder="Mot de passe"
                                            ref={password} 
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Label className="formLabel"></Form.Label>
                                    <Form.Group controlId="exampleForm.ControlInput2">
                                        <Form.Control type="password"
                                            className="FormInput fText" 
                                            placeholder="Confirmer le mot de passe"
                                            ref={confirmPassword}
                                            required 
                                            minLength="6"
                                        />
                                    </Form.Group>

                                    <button className="connexionButton appBackgroundColor" type="submit"> <CircularProgress color="inherit" size={16} /> S'inscrire</button>
                                    <Link to="/login" > J'ai déja un compte</Link><br/>
                                    <Link to="/ForgotPassword"> Mot de passe oublier</Link>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
    );
}

export default RegisterForm;