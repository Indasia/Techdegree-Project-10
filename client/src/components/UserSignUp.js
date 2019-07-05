import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
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

        if (password === '') {
            this.setState({
                errorMessage: 'A password is required'
            })
        } else if (password !== confirmPassword) {
            this.setState({
                errorMessage: 'The passwords do not match'
            })
        } else {
            axios.post('http://localhost:5000/api/users', { firstName, lastName, emailAddress, password })
                .then(res => {
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
        return (
            
        );
    }




}

export default UserSignUp;