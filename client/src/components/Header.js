import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
    // show whether or not someone is logged in
    return localStorage.getItem('IsLoggedIn') ? (
        <div className='header'>
            <div className='bounds'>
                <h1 className='header--logo'>Courses</h1>
                <nav>
                    {/* welcome user by their name */}
                    <span>Welcome {localStorage.getItem('FirstName')} {localStorage.getItem('LastName')}</span>
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
                        {/* sign up / sign in links */}
                        <Link className='signup' to={'/signup'}> Sign Up </Link>
                        <Link className='signin' to={'/signin'}> Sign In </Link>
                    </nav>
                </div>
            </div>
    );
};

export default Header;