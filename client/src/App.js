// import React
import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import './styles/global.css';

// import components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';


class App extends Component {

  constructor() {
    super();
    this.state = {};
    this.handleSignIn = this.handleSignIn.bind(this);
  }
   

  // handle sign in
  handleSignIn(userInfo) {
    // request user info
    axios.get('http://localhost:5000/api/users', {
      // set authorization header
      auth: {
        username: userInfo.emailAddress,
        password: userInfo.password
      }
    }).then(res => {
        // if request succeeds
        if (res.status === 200) {
          // save user preferences locally
          window.localStorage.setItem('FirstName', res.data.firstName)
          window.localStorage.setItem('LastName', res.data.lastName)
          window.localStorage.setItem('Email', userInfo.emailAddress)
          window.localStorage.setItem('Password', userInfo.password)
          window.localStorage.setItem('UserId', JSON.stringify(res.data.id))
          window.localStorage.setItem('IsLoggedIn', JSON.stringify(true))
          window.location.assign('/')

        } else {
          localStorage.clear();
          window.location.assign('/usersignup')
        }
    })
  }


  handleSignOut = () => {
    // clear user preferences
    localStorage.clear();
    window.location.assign('/courses')
  }

  render() {
    return (

        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Redirect exact from='/' to='/courses' />
              <Route exact path='/courses' render={() => <Courses />} />
              <PrivateRoute exact path='/courses/create' component={CreateCourse} />
              <Route exact path='/courses/:id' component={CourseDetail} />
              <Route exact path='/UserSignIn' render={() => <UserSignIn signIn={this.handleSignIn} />} />
              <PrivateRoute exact path='/courses/:id/update' component={UpdateCourse} />
              <Route exact path='/UserSignUp' render={() => <UserSignUp signIn={this.handleSignIn} />} />
              <Route exact path='/UserSignOut' component={UserSignOut} />
            </Switch>
          </div>
        </BrowserRouter>
      
    );
  }
}

export default App;