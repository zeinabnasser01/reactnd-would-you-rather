import React from 'react';
import { connect } from 'react-redux';

const LeaderBoard = (props) => {
  return (
    <React.Fragment>
      <ul className='list-unstyled'>
        {props.usersBoard.map((user) => (
          <li key={user.id}>
            <div className='card user-card'>
              <div className='avatar'>
                <img src={user.avatarURL} alt={user.name + 's avatar'} />
              </div>
              <div className='user-details'>
                <h5>{user.name}</h5>
                <ul className='list-unstyled'>
                  <li>Answered Questions : {user.answeredQuestions}</li>
                  <li>Created Questions : {user.createdQuestions}</li>
                </ul>
              </div>
              <div className='score'>
                <div className='score-content'>
                  <h6>Score</h6>
                  <div className='score-number'>
                    <span>{user.userScore}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

function mapStateToProps({ users }) {
  const usersBoard = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answeredQuestions: Object.values(user.answers).length,
      createdQuestions: user.questions.length,
      userScore: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => a.userScore - b.userScore);
  return {
    usersBoard,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
