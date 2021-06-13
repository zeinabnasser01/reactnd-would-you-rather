import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddAnswer } from '../actions/shared';
import Page404 from './404';

const Poll = (props) => {
  const [userAnswer, setuserAnswer] = useState('');

  if (!props.authedUser)
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { referrer: '/questions/' + props.match.params.id },
        }}
      />
    );

  if (!props.exist) return <Page404 />;

  const { answer, question, authedUser, handleAddAnswer } = props;
  const { optionOne, optionTwo } = question;
  const votes = optionOne.votes.length + optionTwo.votes.length;
  const author = question ? question.authorDetails : null;

  const handleChange = (e) => {
    const value = e.target.value;
    setuserAnswer(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userAnswer) {
      alert('Please enter your answer !');
    } else {
      handleAddAnswer({
        authedUser,
        qid: question.id,
        answer: userAnswer,
      });
    }
  };

  return answer ? (
    <div className='card poll-card'>
      <div className='card-header'>{'Asked By ' + author.name}</div>
      <div className='card-body'>
        <div className='avatar'>
          <img src={'/' + author.avatarURL} alt={author.name + ' avatar'} />
        </div>
        <div className='poll-content'>
          <h4>Results</h4>
          <div
            className={
              optionOne.votes.includes(authedUser)
                ? 'poll-option-active'
                : 'poll-option'
            }
          >
            <span
              className='vote-badge'
              style={{
                display: optionOne.votes.includes(authedUser)
                  ? 'block'
                  : 'none',
              }}
            >
              your vote
            </span>
            <h6>{'Would You Rather ' + optionOne.text + '?'}</h6>
            <div className='progress'>
              <div
                className='progress-bar'
                role='progressbar'
                aria-valuenow={
                  ((optionOne.votes.length / votes) * 100).toFixed(1) + '%'
                }
                aria-valuemin='0'
                aria-valuemax='100'
                style={{
                  width: (optionOne.votes.length / votes) * 100 + '%',
                }}
              >
                {((optionOne.votes.length / votes) * 100).toFixed(1) + '%'}
              </div>
            </div>
            <span className='vote'>
              {optionOne.votes.length + ' out of ' + votes + ' votes'}
            </span>
          </div>

          <div
            className={
              optionTwo.votes.includes(authedUser)
                ? 'poll-option-active'
                : 'poll-option'
            }
          >
            <div
              className='vote-badge'
              style={{
                display: optionTwo.votes.includes(authedUser)
                  ? 'block'
                  : 'none',
              }}
            >
              your vote
            </div>
            <h6>{'Would You Rather ' + optionTwo.text + '?'}</h6>
            <div className='progress'>
              <div
                className='progress-bar'
                role='progressbar'
                aria-valuenow={
                  ((optionTwo.votes.length / votes) * 100).toFixed(1) + '%'
                }
                aria-valuemin='0'
                aria-valuemax='100'
                style={{
                  width: (optionTwo.votes.length / votes) * 100 + '%',
                }}
              >
                {((optionTwo.votes.length / votes) * 100).toFixed(1) + '%'}
              </div>
            </div>
            <span className='vote'>
              {optionTwo.votes.length + ' out of ' + votes + ' votes'}
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <React.Fragment>
      <div className='card poll-card'>
        <div className='card-header'>{author.name + ' asks:'}</div>
        <div className='card-body'>
          <div className='avatar'>
            <img
              src={'/' + author.avatarURL}
              alt={author.name + ' avatar'}
              className='unans-poll-avatar'
            />
          </div>
          <div className='poll-content'>
            <h5>Would You Rather</h5>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  id='option-one'
                  value='optionOne'
                  checked={userAnswer === 'optionOne'}
                  onChange={(e) => handleChange(e)}
                />
                <label className='form-check-label' htmlFor='option-one'>
                  {optionOne.text}
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='radio'
                  id='option-two'
                  value='optionTwo'
                  checked={userAnswer === 'optionTwo'}
                  onChange={(e) => handleChange(e)}
                />
                <label className='form-check-label' htmlFor='option-two'>
                  {optionTwo.text}
                </label>
              </div>
              <button type='submit' className='btn'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

function mapStateToProps({ users, questions, authedUser }, { match }) {
  const { id } = match.params;
  const exist = Object.keys(questions).includes(id) && authedUser;
  const question = exist
    ? {
        ...questions[id],
        authorDetails: users[questions[id].author],
      }
    : null;

  const answer = exist
    ? Object.keys(users[authedUser].answers).includes(id)
    : null;

  return {
    authedUser,
    question,
    answer,
    exist,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleAddAnswer: (authedUser, qid, answer) => {
      dispatch(handleAddAnswer(authedUser, qid, answer));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
