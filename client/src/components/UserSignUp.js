import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UserSignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errorMessage: ''
    }

    handleInputChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSignUp = (e) => {
        e.preventDefault();

        const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;

        // if first name is blank, show error
        if (firstName === '') {
            this.setState({
                errorMessage: 'Enter your first name'
            })
          // if last name is blank, show error
        } else if (lastName === '') {
            this.setState({
                errorMessage: 'Enter your last name'
            })
        // if email is blank, show error
        } else if (emailAddress === '') {
            this.setState({
                errorMessage: 'An email address is required'
            })
        // if password is blank, show error
        } else if (password === '') {
            this.setState({
                errorMessage: 'A password is required'
            })
         // if password inputs dont match, show error
        } else if (password !== confirmPassword) {
            this.setState({
                errorMessage: 'The passwords do not match'
            })
        } else {
            // if everything is entered correctly, make request
            axios.post('http://localhost:5000/api/users', { firstName, lastName, emailAddress, password })
                .then(res => {
                    // if response is successful
                    if (res.status === 201) {
                        this.setState({
                            errorMessage: ''
                        })
                        this.props.signIn(null, emailAddress, password);
                    }
                }).catch(error => {
                    console.log('Oops!', error);
                });
        }
    }

    render() {

        const { firstName, lastName, emailAddress, password, errorMessage } = this.state;

        return (
            <div className='bounds'>
                <div className='grid-33 centered signin'>
                    <h1>Sign Up</h1>
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

                        <form onSubmit={e => this.handleSignUp(e, firstName, lastName, emailAddress, password)}>
                            <div>
                                <input
                                    id='firstName'
                                    name='firstName'
                                    type='text'
                                    className=''
                                    placeholder='First Name'
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    id='lastName'
                                    name='lastName'
                                    type='text'
                                    className=''
                                    placeholder='Last Name'
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    id='emailAddress'
                                    name='emailAddress'
                                    type='text'
                                    className=''
                                    placeholder='Email Address'
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    className=''
                                    placeholder='Password'
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    type='password'
                                    className=''
                                    placeholder='Confirm Password'
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className='grid-100 pad-bottom'>
                                <button className='button' type='submit'>Sign Up</button>            
                                <button className='button button-secondary' to='#' onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to='/signin'>Click here</Link> to sign in!</p>
                </div>
            </div>

        )
    }
}

export default UserSignUp;