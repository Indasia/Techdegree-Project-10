import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignIn extends Component {

    state = {
        // set state (empty strings)
        emailAddress: '',
        password: ''
    }

    // as the value of input changes, set state value
    handleInputChange = e => {
        // prevent default
        e.preventDefault();
        // use name ref and field value
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        let userInfo = { password: this.state.password, emailAddress: this.state.emailAddress }
        this.props.signIn(userInfo)
    };


    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div> 
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                {/* email address input */}
                                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleInputChange} />
                            </div>
                            <div>
                                {/* password input */}
                                <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handleInputChange} />
                            </div>
                            <div className="grid-100 pad-bottom">
                                {/* sign in button */}
                                <button className="button" type="submit">Sign In</button>
                                {/* cancel button which redirects to courses */}
                                <Link className="button button-secondary" to="/courses" >Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account?<Link to="/signup"> Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    };
}


export default UserSignIn;