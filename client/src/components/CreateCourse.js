import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateCourse extends Component {

    state = {
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: ''
    }

    // handle user input changes
    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // handle created course
    handleCreateCourse = e => {
        e.preventDefault();

        const { title, description } = this.state;
        if (title === '') {
            this.setState({
                errorMessage: 'Please enter a title'
            })
        } else if (description === '') {
            this.setState({
                errorMessage: 'A description must be entered'
            })
        } else {
            axios({
                method: 'post',
                url: 'http://localhost:5000/api/courses',
                auth: {
                    username: localStorage.getItem('username'),
                    password: localStorage.getItem('password')
                },
                data: {
                    title: this.state.title,
                    description: this.state.description,
                    estimatedTime: this.state.estimatedTime,
                    materialsNeeded: this.state.materialsNeeded
                }
            }).then(alert("New course successfully created"))
                .then(() => {
                    this.props.history.push('/');
                }).catch(error => {
                    console.log('Oops!', error);
                    console.log(error.response.data);
                })
                
        }
        
    }
    render() {
        const { title, description, estimatedTime, materialsNeeded, errorMessage } = this.state;
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    {errorMessage ? (
                        <div>
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors">
                                <ul>
                                    <li>{errorMessage}</li>
                                </ul>
                            </div>
                        </div>
                    ) : ''}
                    <form onSubmit={e => this.handleCreateCourse(e, localStorage.getItem('username'), localStorage.getItem('password'), title, description, materialsNeeded, estimatedTime)}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input
                                        value={this.state.title}
                                        onChange={this.handleInputChange}
                                        className="input-title course--title--input"
                                        placeholder="Course title..."
                                        id="title"
                                        name="title"
                                        type="text"
                                    />
                                </div>
                                <p>{localStorage.user}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Course description..."
                                        value={this.state.description}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input
                                                id="estimatedTime"
                                                name="estimatedTime"
                                                type="text"
                                                className="course--time--input"
                                                placeholder="Hours"
                                                value={this.state.estimatedTime}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea
                                                id="materialsNeeded"
                                                name="materialsNeeded"
                                                placeholder="List materials..."
                                                value={this.state.materialsNeeded}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Create Course</button>
                            <Link to="/" className="button button-secondary">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    
    }
}

export default CreateCourse;