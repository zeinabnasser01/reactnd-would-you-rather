import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Question from './Question';
class Home extends Component {
  state = {
    active: false,
  };
  handleToggle = (boolean) => {
    this.setState({
      active: boolean,
    });
  };
  render() {
    const { unansweredQuestions, answeredQuestions, authedUser } = this.props;
    return (
      <React.Fragment>
        {authedUser ? (
          <div className='home'>
            <div className='home-nav'>
              <button
                className={!this.state.active ? 'active-btn' : ''}
                onClick={() => this.handleToggle(false)}
              >
                Unanswered Questions
              </button>
              <button
                className={this.state.active ? 'active-btn' : ''}
                onClick={() => this.handleToggle(true)}
              >
                Answered Questions
              </button>
            </div>
            <div className='home-content'>
              {this.state.active
                ? answeredQuestions.map((id) => (
                    <Question key={id} id={id} answered='answered' />
                  ))
                : unansweredQuestions.map((id) => (
                    <Question key={id} answered='unanswered' id={id} />
                  ))}
            </div>
          </div>
        ) : (
          <Redirect to='/login' />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  const user = users[authedUser];
  const answeredQuestions = user
    ? Object.keys(user.answers).sort(
        (a, b) => user.answers[b].timestamp - user.answers[a].timestamp
      )
    : [];
  return {
    unansweredQuestions: Object.keys(questions)
      .filter((qid) => !answeredQuestions.includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions,
    authedUser,
  };
}

export default connect(mapStateToProps)(Home);
