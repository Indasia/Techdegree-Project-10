import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

class CourseDetail extends Component {

    state = {
        course: {},
        courseId: '',
        createdBy: '',
        errorMessage: '',
        isLoading: true
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
                const courseInfo = res.data;
                console.log(courseInfo);
                // set state to current course
                this.setState({
                    courseInfo,
                    courseId: courseInfo.course.id,
                    createdBy: courseInfo.course.userId,
                    isLoading: false
                });
            }).catch(error => {
                // catch errors and show error in console
                console.log('Oops! We have ran into an error', error);
            })
    }


    // delete course
    handleDeleteCourse = (e) => {
        // prevent default
        e.preventDefault();

        // deletion request
        axios.delete('http://localhost:5000/api/courses/' + this.props.match.params.id, {
            method: 'DELETE',
            // set authoriation header
            auth: {
                username: localStorage.getItem('Email'),
                password: localStorage.getItem('Password')
            },
            data: {
                id: this.state.courseId
            }
        }).then(res => {
            this.props.history.push('/courses');
            console.log("This course has been successfully deleted");
        }).catch(error => {
            // catch errors and show error in console
            console.log('Oops! We have ran into an error', error);
        })
    }


        // cancel
    handleCancel = e => {
        // prevent default
        e.preventDefault();
        // show course
        this.props.history.push('/courses');
    }


    render() {
            if (this.state.isLoading) {
                return <h1> Loading </h1>
        }
        console.log(this.state.courseInfo);
            const { createdBy } = this.state;
            const { id, title, materialsNeeded, estimatedTime, description, User } = this.state.courseInfo.course;
        return (
                <div>
                    <div className='actions--bar'>
                        <div className='bounds'>
                            <div className='grid-100'>
                                {/* render update and delete buttons only if user is logged in */}
                                {(localStorage.getItem('IsLoggedIn')) && parseInt(localStorage.getItem('UserId')) === createdBy ? (
                                    <span>
                                        {/* update course */}
                                        <Link className='button' to={'/courses/' + id + '/update'}>Update Course</Link>
                                        {/* delete course */}
                                        <button className='button' onClick={e => this.handleDeleteCourse(e)}>Delete Course</button>
                                    </span>
                                ) : ("")}
                                <Link className='button button-secondary' to='/'>Return to List</Link>
                            </div>
                        </div>
                    </div>

                    {/* title of course */}
                    <div className='bounds course--detail'>
                        <div className='grid-66'>
                            <div className='course--header'>
                                <h4 className='course-label'>Course</h4>
                              
                    </div>

                    {/* title of course */}
                    <div className='bounds course--detail'>
                        <div className='grid-66'>
                            <div className='course--header'>
                                <h4 className='course-label'>Course</h4>
                                <h3 className='course--title'>{title}</h3>
                                <p>By {User.firstName} {User.lastName}</p>
                                </div>
                                {/* course description*/}
                                <div className='course--description'>
                                {/* use <ReactMarkdown> to render the course description property */}
                                <ReactMarkdown source={description} />
                                </div>
                        </div>
                    </div>


                    {/* side bar */}
                    <div className='grid-25 grid-right'>
                        <div className='course--stats'>
                            <ul className='course--stats--list'>

                                {/* estimated time */}
                                <li className='course--stats--list--item'>
                                    <h4>Estimated Time</h4>
                                    <h3>{estimatedTime}</h3>
                                </li>

                                {/* materials needed */}
                                <li className='course--stats--list--item'>
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        {/* use <ReactMarkdown> to render the materialsNeeded property */}
                                        <ReactMarkdown source={materialsNeeded} />
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            )};
}

export default CourseDetail;