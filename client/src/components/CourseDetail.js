import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

class CourseDetail extends Component {

    state = {
        course: {},
        courseId: '',
        createdBy: ''
    };

    // when component mounts, get course details
    componentDidMount() {
        this.handleCourse();
    }

    // course details
    handleCourse = () => {
        // request API data
        axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)
            // once data is recieved
            .then(res => {
                // grab desired course data
                const course = res.data;
                // set state to current course
                this.setState({
                    course,
                    courseId: course.id,
                    createdBy: course.User.id
                });
            })
    }


    // delete course
    handleDeleteCourse = (e) => {
        e.preventDefault();

        // deletion request
        axios.delete('http://localhost:5000/api/courses/' + this.props.match.params.id, {
            method: 'DELETE',
            // set authoriation header
            auth: {
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            },
            data: {
                id: this.state.courseId
            }
        }).then(res => {
            this.props.history.push('/courses');
            console.log("This course has been successfully deleted");
        })
    }
        // cancel
        handleCancel = e => {
            e.preventDefault();
            this.props.history.push('/courses');
        };

        render() {
            const { createdBy } = this.state;
            return (
                <div>
                    <div className='actions--bar'>
                        <div className='bounds'>
                            <div className='grid-100'>
                                {/* render update and delete buttons only if user is logged in */}
                                {(localStorage.getItem('id') !== '') && parseInt(localStorage.getItem('id')) === createdBy ? (

                                    <span>
                                        {/* update course */}
                                        <Link className='button' to={'/courses' + this.state.course.id + '/update'}>Update Course</Link>
                                        {/* delete course */}
                                        <Link className='button' onClick={e => this.handleDeleteCourse()}>Delete Course</Link>
                                    </span>
                                ) : "" }
                                <Link className='button button-secondary' to='/'>Return to List</Link>
                            </div>
                        </div>
                    </div>

                    {/* title of course */}
                    <div className='bounds course--detail'>
                        <div className='grid-66'>
                            <div className='course--header'>
                                <h4 className='course-label'>Course</h4>
                                <h3 className='course--title'>{this.state.course.title}</h3>
                                <p>By {this.state.username}</p>
                            </div>
                        </div>
                    </div>

                    {/* course description*/}
                    <div className='course--description'>
                        {/* use <ReactMarkdown> to render the course description property */}
                        <ReactMarkdown soure={this.state.course.description} />
                    </div>

                    {/* side bar */}
                    <div className='grid-25 grid-right'>
                        <div className='course--stats'>
                            <ul className='course--stats--list'>

                                {/* estimated time */}
                                <li className='course--stats--list--item'>
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.course.estimatedTime}</h3>
                                </li>

                                {/* materials needed */}
                                <li className='course--stats--list--item'>
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        {/* use <ReactMarkdown> to render the materialsNeeded property */}
                                        <ReactMarkdown source={this.state.course.materialsNeeded} />
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )};
}

export default CourseDetail;