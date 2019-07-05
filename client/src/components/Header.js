import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
    return localStorage.getItem('id') ? (
        <div className='header'>
            <div className='bounds'>
                <h1 className='header--logo'>Courses</h1>
                <nav>
                    <span>Welcome {localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</span>
                    <Link className='signout' to='/signout'> Sign Out </Link>
                </nav>
            </div>
        </div>
    ) : (
            <div className='header'>
                <div className='bounds'>
                    <h1 className='header--logo'>
                        <NavLink to='/courses'>Courses</NavLink>
                    </h1>
                    <nav>
                        <Link className='signup' to={'/UserSignUp'}> Sign Up </Link>
                        <Link className='signin' to={'/UserSignIn'}> Sign In </Link>
                    </nav>
                </div>
            </div>
    );
};

export default Header;