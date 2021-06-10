import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import logo from '../logo.svg';

class Login extends Component {
  state = {
    userId: '',
  };

  handleSelect = (e) => {
    e.preventDefault();
    const userId = e.target.value;
    this.setState({ userId: userId });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { userId } = this.state;
    if (userId) {
      this.props.dispatch(setAuthedUser(userId));
    } else {
      alert('Please select user !');
    }
  };

  render() {
    const { users } = this.props;
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
            <form onSubmit={this.handleSubmit}>
              <select
                className='form-select'
                value={this.state.userId}
                onChange={this.handleSelect}
              >
                <option value='' disabled>
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
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}

export default connect(mapStateToProps)(Login);
