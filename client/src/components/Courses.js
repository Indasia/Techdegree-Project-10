import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Courses extends Component {
    
    // set state of output from API request in empty array
    state = {
        courses: []
    };

    // get the courses when component is mounted
    componentDidMount() {
        this.Courses();
    }

    // get list of courses from request
    Courses = () => {
        axios.get('http://localhost:5000/api/courses/')
            .then(res => { this.setState(res.data) })
            .catch(error => {
                // catch any errors and write message in console
                console.log('Oops! We have ran into an error', error);
            })
    }

    render() {
        return (
            <div className="bounds">
                {/* go over courses and display the appropiate links */}
                {this.state.courses.map((course, index) => (
                    <div className="grid-33" key={index}>
                        {/* links should send you to the correct course detail information when clicked */}
                        <Link className="course--module course--link" to={'/courses/' + course.id}>
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    </div>
                ))}
                <div className="grid-33">
                    {/* show link to create course*/}
                    <Link className="course--module course--add--module" to="/courses/create">
                        <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>
                            New Course
                        </h3>
                    </Link>
                </div>
            </div>
       )}

}
 
export default Courses;