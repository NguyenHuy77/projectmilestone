import React from 'react';
import './App.css';
import Register from './pages/Register';
//import Draft from './pages/Draft';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import Contact from './pages/Contact';
import ContactForm from './pages/ContactForm';
import Header from './Header';
import LoginChange from './pages/LoginChange';
import RegisterChange from './pages/RegisterChange';




function App() {
  return (
    <div>
      {/* <Route exact path='/RouterTest' component={RouterTest} /> */}
      {/* <Header></Header> */}
      <Router>
        <Switch>
          
          
          <Route exact path='/' component={RegisterChange} />
          {/* <Route path='/register' component={Register} /> */}
          <Route path={`/Profile/:userName`} render={(props) =>
            <Profile {...props} />
          }>   
          </Route>
          
          <Route path ="/contactform" component ={ContactForm}/>
        </Switch>
        <Contact/>
      </Router>
      {/* <RegisterChange/> */}
      
    </div>

  );
}

export default App;
