import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  state = {
    path: '',
  };
  render() {
    const handleLogout = () => {
      this.props.setAuthedUser();
      this.setState({ path: '/login' });
    };
    return (
      <React.Fragment>
        <button
          className='nav-btn btn btn-danger'
          type='button'
          onClick={handleLogout}
        >
          Logout
        </button>
        <Redirect to={this.state.path} />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: () => {
      dispatch(setAuthedUser(null));
    },
  };
}
export default connect(null, mapDispatchToProps)(Logout);
