import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import User from './User';
import Logout from './Logout';

const Navbar = (props) => {
  return (
    <React.Fragment>
      <nav className='navbar navbar-expand-lg navbar-light'>
        <div className='container'>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <React.Fragment>
              <ul className='navbar-nav mb-0'>
                <li className='nav-item'>
                  <NavLink className='nav-link' exact to='/'>
                    Home
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/add'>
                    New Question
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/leader-board'>
                    Leader Board
                  </NavLink>
                </li>
              </ul>

              {props.authedUser ? (
                <ul className='navbar-nav navbar-user ml-auto'>
                  <li className='nav-item'>
                    <div className='nav-link nav-user'>
                      <User />
                    </div>
                  </li>
                  <li className='nav-item'>
                    <Logout />
                  </li>
                </ul>
              ) : (
                <ul className='navbar-nav navbar-user ml-auto'>
                  <li className='nav-item'>
                    <NavLink
                      to='/login'
                      exact
                      className='nav-btn btn btn-login'
                    >
                      Login
                    </NavLink>
                  </li>
                </ul>
              )}
            </React.Fragment>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Navbar);
