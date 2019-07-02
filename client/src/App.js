// import React
import React, { Component } from 'react';
import './App.css';
import Courses from './components/Courses';
// import './App.css';
import {
  BrowserRouter,
  // Route
} from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  // store the output from API request
  state = {
    courses: []
  };


  componentDidMount() {
    axios.get('http://localhost:5000/api/')
    // request API
    axios.get('http://localhost:5000/api/courses')
      // parse output to JSON
      .then(res => res.json())
      // set value of the state to the output from API
      .then((data) => {
        this.setState({ courses: data })
      })
      // log errors to console
      .catch(console.log)
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Courses courses={this.state.courses} />
        </div>
      </BrowserRouter>
    )
  }
};

export default App;