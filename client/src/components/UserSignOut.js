import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class UserSignOut extends Component {

    // User is redirected to "/Courses" after logging out
    render() {
        return (
            <Redirect to="/Courses" />
        )
    }
}

export default UserSignOut;