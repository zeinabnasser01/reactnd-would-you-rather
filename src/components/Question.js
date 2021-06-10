import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Question = (props) => {
  const { question, answered } = props;
  console.log(question.author);
  return (
    <div className='card question-card'>
      <div className='card-header'>{question.author.name}</div>
      <div className='card-body'>
        <div className='avatar'>
          <img
            src={question.author.avatarURL}
            alt={question.author.name + ' avatar'}
            className='question-avatar'
          />
        </div>
        <div className='question-content'>
          <h5>Would You Rather</h5>
          <p>{question.optionOne.text.slice(0, 15)}...</p>
          {answered === 'answered' ? (
            <Link
              to={'/questions/' + question.id}
              style={{ textDecoration: 'none' }}
              className='btn btn-primary'
            >
              Results
            </Link>
          ) : (
            <Link
              to={'/questions/' + question.id}
              style={{ textDecoration: 'none' }}
              className='btn'
            >
              Answer Poll
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ questions, users }, { id, answered }) {
  const question = { ...questions[id], author: users[questions[id].author] };
  return {
    question,
    answered,
  };
}

export default connect(mapStateToProps)(Question);
