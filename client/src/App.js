import React, { Fragment } from 'react'
import './App.css'
import Navbar from '../src/components/layouts/Navbar'
import Home from '../src/components/pages/Home'
import About from '../src/components/pages/About'
import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alerts from './components/layouts/Alerts'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
