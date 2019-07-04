// import React
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';


// import components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
// import UserSignIn from './components/UserSignIn';
// import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
// import UpdateCourse from './components/UpdateCourse';
// import Header from './components/Header';
// import UserSignOut from './components/UserSignOut';


class App extends Component {

  constructor() {
    super();
    this.state = {};
    this.signIn = this.signIn.bind(this);
  }
   
  // handle sign in
  handleSignIn(userInfo) {
    // request user info
    axios.get('http://localhost:5000/api/users', {
      auth: {
        username: userInfo.emailAddress,
        password: userInfo.password
      }
    }).then(res => {
      console.log(res.data)
      // save user preferences locally
      window.localStorage.setItem('FirstName', res.data.firstName)
      window.localStorage.setItem('LastName', res.data.lastName)
      window.localStorage.setItem('Email', userInfo.emailAddress)
      window.localStorage.setItem('Password', userInfo.password)
      window.localStorage.setItem('UserId', JSON.stringify(res.data._id))
      window.localStorage.setItem('IsLoggedIn', JSON.stringify(true))
      window.location.assign('/')
    })
  }

  handleSignOut = () => {
    // clear user preferences
    localStorage.clear();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={Courses} />
            <PrivateRoute path='/courses/create' component={CreateCourse} />
            <Route exact path='courses/:id' component={CourseDetail} />
            <PrivateRoute path='/courses/:id/update' component={UpdateCourse} />
            <Route exact path='/UserSignUp' component={UserSignUp} />
            <Route exact path='/UserSignIn' component={() => <UserSignIn handleSignIn={this.handleSignIn} />} />
            <Route exact path='/UserSignOut' component={UserSignOut} />
          </Switch>   
        </div>
      </BrowserRouter>
    )
  }
};

export default App;