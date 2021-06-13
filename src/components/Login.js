import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import logo from '../logo.svg';

const Login = (props) => {
  const [userId, setUserId] = useState(null);
  const [redirectHome, setRedirectHome] = useState(false);

  const handleSelect = (e) => {
    e.preventDefault();
    const userId = e.target.value;
    setUserId(userId);
  };

  const redirect = props.location.state ? props.location.state.referrer : '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      props.dispatch(setAuthedUser(userId));
      setRedirectHome(true);
    } else {
      alert('Please select user !');
    }
  };

  console.log(redirect);
  if (redirectHome) {
    return <Redirect to={redirect} />;
  }

  const { users } = props;
  console.log(users);

  return (
    <React.Fragment>
      <div className='card login'>
        <div className='card-header'>
          <h5>Welcome to the Would You Rather App!</h5>
          <p>please sign in to continue</p>
        </div>
        <div className='card-body'>
          <img src={logo} alt='logo' className='logo' />
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <select className='form-select' onChange={handleSelect}>
              <option value='-1' defaultChecked>
                Select user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.id}
                </option>
              ))}
            </select>
            <button className='btn' type='submit'>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users: Object.values(users),
  };
}

export default withRouter(connect(mapStateToProps)(Login));
