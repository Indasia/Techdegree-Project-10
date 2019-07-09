import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class UpdateCourse extends Component {

    state = {
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
                                                                                                  userId: '',
        createdBy: '',
        errorMessage: '',
        firstName: '',
        lastName: ''
    }

    // when update course component mounts, get course info
    componentDidMount() {
        // this.handleCourses();
    }

    // handle changes to user input
    handleCourses = e => {
        // request info
        axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)
            // when info come backs
            .then(res => {

                // course info
                const courseInfo = res.data.course;

                // set state to the current course
                this.setState({
                    userid: courseInfo.userId,
                    id: courseInfo.id,
                    title: courseInfo.title,
                    description: courseInfo.description,
                    estimatedTime: courseInfo.estimatedTime,
                    materialsNeeded: courseInfo.materialsNeeded,
                    errorMessage: '',
                    firstName: courseInfo.course.firstName,
                    lastName: courseInfo.lastName
                })
            }) // catch error?
    };

    handleInputChange = e => {
        // prevent default needed?

        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { title, description } = this.state;

        if (title === '') {
            this.setState({errorMessage: 'You must enter a title'});
        } else if (description === '') {
            this.setState({errorMessage: 'You must enter a description'})
        } else {
            axios({
                method: 'put',
                url: 'http://localhost:5000/api/courses/' + this.props.match.params.id,
                auth: {
                    username: localStorage.getItem("Email"),
                    password: localStorage.getItem('Password')
                },
                data: {
                    userId: localStorage.getItem("UserId"),
                    id: this.props.match.params.id,
                    title: this.state.title,
                    description: this.state.description,
                    estimatedTime: this.state.estimatedTime,
                    materialsNeeded: this.state.materialsNeeded

                }
            }).then(res => {
                this.props.history.push('/courses/' + this.props.match.params.id);
            })
        }
    }


    render() {
        const courseOwner = `${this.state.firstName} ${this.state.lastName}`;
        const { title, description, estimatedTime, materialsNeeded, errorMessage } = this.state;
        return (
            <div className='bounds course--detail'>
                <h1>Update Course</h1>
                <div>
                    {errorMessage ? (
                        <div>
                            <h2 className='validation--errors--label'>Uh oh!</h2>
                            <div className='validation-errors'>
                                <ul>
                                    <li>{errorMessage}</li>
                                </ul>
                            </div>
                        </div>
                    ) : ''}
                    {/* should this be create course?*/}
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <div className='grid-66'>
                            <div className='course--header'>
                                <h4 className='course--label'>Course</h4>
                                <div>
                                    <input
                                        id='title'
                                        name='title'
                                        type='text'
                                        className='input-title course--title--input'
                                        placeholder='Course title'
                                        value={title}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <p>By {courseOwner}</p>
                            </div>
                            <div className='course--description'>
                                <div>
                                    <textarea
                                        id='description'
                                        name='description'
                                        className=''
                                        placeholder='Course description'
                                        value={description}
                                        onChange={this.handleInputChange}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className='grid-25 grid-right'>
                            <div className='course--stats'>
                                <ul className='course--stats--list'>
                                    <li className='course--stats--list--item'>
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input
                                                id='estimatedTime'
                                                name='estimatedTime'
                                                type='text'
                                                className='course--time--input'
                                                placeholder='Hours'
                                                value={estimatedTime}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </li>
                                    <li className='course--stats--list--item'>
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea
                                                id='materialsNeeded'
                                                name='materialsNeeded'
                                                className=''
                                                placeholder='Materials needed'
                                                value={materialsNeeded}
                                                onChange={this.handleInputChange} >
                                            </textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='grid-100 pad-bottom'>

                            {/* renders an 'Update Course' button that when clicked sends a PUT request to the REST API's /api/courses/:id route.  */}
                            <button className='button' type='submit'> Update Course </button>
                            {/* renders a 'Cancel' button that returns the user to the 'Course Detail' screen. */}
                            <Link className='button button-secondary' to='/courses/:id/update'> Cancel </Link>
                        </div>
                    </form>
                </div>
            </div>            
        );
    }
}




export default UpdateCourse;