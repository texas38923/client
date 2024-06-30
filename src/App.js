import React from 'react';

import { Container } from '@material-ui/core';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  return (
    <GoogleOAuthProvider clientId='1056170580747-c0ku6dcl3l53qmq7aapq2t1enga31na7.apps.googleusercontent.com'>
      <BrowserRouter>
        <Container maxWidth='lg'>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/auth' exact component={Auth} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
