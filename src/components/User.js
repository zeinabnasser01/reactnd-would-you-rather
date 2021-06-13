import React from 'react';
import { connect } from 'react-redux';

const User = (props) => {
  const { user } = props;
  return (
    <React.Fragment>
      <img src={user.avatarURL} alt={user.name} className='nav-avatar' />
      <span>{user.name}</span>
    </React.Fragment>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    user: authedUser ? users[authedUser] : null,
  };
}

export default connect(mapStateToProps)(User);
