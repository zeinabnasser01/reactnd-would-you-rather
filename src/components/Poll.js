import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddAnswer } from '../actions/shared';

class Poll extends Component {
  state = {
    userAnswer: '',
    authedUser: this.props.authedUser,
    question: this.props.question,
    answer: this.props.answer,
  };

  handleChange = (e) => {
    e.preventDefault();
    const answer = e.target.value;
    this.setState({ userAnswer: answer });
  };

  handleSubmit = (e) => {
    const { authedUser, question, userAnswer } = this.state;
    e.preventDefault();
    if (!this.state.userAnswer) {
      alert('Please enter your answer !');
    } else {
      this.props.dispatch(
        handleAddAnswer({ authedUser, qid: question.id, answer: userAnswer })
      );
    }
  };

  render() {
    const { userAnswer, authedUser, answer } = this.state;
    const { author, optionOne, optionTwo } = this.state.question;
    const votes = optionOne.votes.length + optionTwo.votes.length;
    return answer ? (
      <React.Fragment>
        <div className='card poll-card'>
          <div className='card-header'>{'Asked By ' + author.name}</div>
          <div className='card-body'>
            <div className='avatar'>
              <img src={'/' + author.avatarURL} alt={author.name + ' image'} />
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
      </React.Fragment>
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
              <form onSubmit={this.handleSubmit}>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='radio'
                    id='option-one'
                    value='optionOne'
                    checked={userAnswer === 'optionOne'}
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
  }
}

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const { id } = match.params;
  const answers = users[authedUser].answers;
  const exist = Object.keys(questions).includes(id) && authedUser;
  const question = exist
    ? { ...questions[id], author: users[questions[id].author] }
    : null;
  const answer = exist ? Object.keys(answers).includes(id) : null;

  return {
    authedUser,
    question,
    answer,
  };
}

export default connect(mapStateToProps)(Poll);
