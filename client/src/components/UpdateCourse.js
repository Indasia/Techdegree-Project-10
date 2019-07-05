import React, { Component } from 'react';
import axios from 'axios';

class UpdateCourse extends Component {

    state = {
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userid: '',
        createdBy: '',
        errorMessage: ''
    }

    // when update course component mounts, get course info
    componentDidMount() {
        this.handleCourses();
    }

    // handle changes to user input
    handleCourses = e => {
        // request info
        axios.get('http://localhost:5000/api/courses' + this.props.match.params.id)
            // when info come backs
            .then(res => {

                // course info
                const courseInfo = res.data;

                // set state to the current course
                this.setState({
                    userid: courseInfo.userid,
                    id: courseInfo.id,
                    title: courseInfo.title,
                    description: courseInfo.description,
                    estimatedTime: courseInfo.estimatedTime,
                    materialsNeeded: courseInfo.materialsNeeded,
                    errorMessage: ''
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
                url: 'http://localhost:5000/api/course' + this.props.match.paramslid,
                auth: {
                    username: localStorage.getItem('username'),
                    password: localStorage.getItem('password')
                },
                data: {
                    userId: this.state.userId,
                    id: this.state.id,
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
        const { title, description, estimatedTime, materialsNeeded, errorMessage } = this.state;
        return (
            <div className='bounds course--detail'>
                <h1>Update Course</h1>
                <div>
                    {errorMessage ? (
                        <div>
                            <h2 className='validation--errors--label'>Validation errors</h2>
                            <div className='validation-errors'>
                                <ul>
                                    <li>{errorMessage}</li>
                                </ul>
                            </div>
                        </div>
                    ) : ''}
                    {/* should this be create course?*/}
                    <form onSubmit={e => this.handleCreateCourse(e, localStorage.getItem('username'), localStorage.getItem('password'), title, description, materialsNeeded, estimatedTime)}>
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
                                        value={this.course.title}
                                        onChange={this.handleSubmit}
                                    />
                                </div>
                                <p>By {this.state.username}}</p>
                            </div>
                            <div className='course--description'>
                                <div>
                                    <textarea
                                        id='description'
                                        name='description'
                                        className=''
                                        placeholder='Course description'
                                        value={this.course.description}
                                        onChange={this.handleSubmit} >
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
                                                value={this.course.estimatedTime}
                                                onChange={this.handleSubmit}
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
                                                value={this.course.materialsNeeded}
                                                onChange={this.handleSubmit} >
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
                            <button className='button button-secondary' to='#' onClick={this.handleCancel.bind(this)}> Cancel </button>
                        </div>
                    </form>
                </div>
            </div>            
        );
    }
}




export default UpdateCourse;