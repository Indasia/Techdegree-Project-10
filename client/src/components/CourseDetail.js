import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

class CourseDetail extends Component {

    state = {
        course: {},
        courseId: '',
        createdBy: '',
        errorMessage: ''
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
                // set state to current course
                this.setState({
                    courseInfo,
                    courseId: courseInfo.id,
                    createdBy: courseInfo.User.id
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
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
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
            const { createdBy } = this.state;
            const { id, title, materialsNeeded, estimatedTime, description } = this.state.course;
            return (
                <div>
                    <div className='actions--bar'>
                        <div className='bounds'>
                            <div className='grid-100'>
                                {/* render update and delete buttons only if user is logged in */}
                                {(localStorage.getItem('id') !== '') && parseInt(localStorage.getItem('id')) === createdBy ? (
                                    <span>
                                        {/* update course */}
                                        <Link className='button' to={'/courses/' + id + '/update'}>Update Course</Link>
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
                                <h3 className='course--title'>{title}</h3>
                                <p>By {localStorage.getItem('name')}</p>
                            </div>
                        </div>
                    </div>

                    {/* course description*/}
                    <div className='course--description'>
                        {/* use <ReactMarkdown> to render the course description property */}
                        <ReactMarkdown soure={description} />
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
            )};
}

export default CourseDetail;