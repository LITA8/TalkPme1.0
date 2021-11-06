import React from 'react';
import './App.css';
import { Container,Col,Row,NavDropdown,Navbar,FormControl,Nav,Form,Card,Carousel,} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom/cjs/react-router-dom.min';
import {useContext} from 'react';
import { AuthContext } from './Context/AuthContext';
import { Redirect } from 'react-router';
import Home from "./Pages/Homes/Home";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Forms/Login"
import Register from "./Pages/Forms/Register"
import Helpdesk from './Pages/HelpDesk/Helpdesk';
import Contacts from './Pages/Contact/Contacts';
import Messenger from './Pages/Messenger/Messenger';
import VideoChat from './Pages/Video/VideoChat';
import Rooms from './Pages/Rooms/Rooms';

const App = () =>{
  
  const {user} = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <div className="app">
          <Container fluid>
            <Row>
              <Col>
                {/*<Header/>
                <Route path="/"  exact component={LoginForms}>
                  {user ? <AppBody/>  : <RegisterForm/>}
                </Route>
                <Route path="/LoginForms"  exact component={LoginForms}>
                  {user ? <Redirect to="/"/> : <LoginForms/>}
                </Route>
                <Route path="/RegisterForm"  exact component={RegisterForm}>
                  {user ? <Redirect to="/"/> : <RegisterForm/>}
                </Route>
                <Route path="/Home"  exact component={AppBody}/>
                <Route path="/Home/UserPage"  exact component={AppBody}/>
                <Route path="/Home/HelpDesk"  exact component={AppBody}/>
                <Route path="/Home/Contacts"  exact component={AppBody}/>
                <Route path="/Home/Contacts/idContact"  exact component={AppBody}/>*/}
                
                  <Route path="/" exact>
                    {user ? <Home/>  : <Register/>}
                  </Route>

                  <Route path="/profile/:fullName">
                    <Profile />
                  </Route>

                  <Route path="/helpdesk" exact>
                    <Helpdesk/>
                  </Route>
                  
                  <Route path="/contacts" exact>
                    <Contacts/>
                  </Route>

                  <Route path="/login" exact>
                    {user ? <Redirect to="/"/>  : <Login/>}
                  </Route>

                  <Route path="/register" exact>
                    {user ? <Redirect to="/register"/> : <Register/>}
                  </Route>

                <Route path="/messenger" exact>
                  <Messenger /> 
                </Route>

                <Route path="/video-chat" exact>
                  <VideoChat />
                </Route>

                <Route path="/video-chat/room/:roomID" exact>
                  <Rooms/>
                </Route>
              </Col>   
            </Row>
          </Container>
        </div>
      </Switch>
    </Router>
  );
}

export default App;