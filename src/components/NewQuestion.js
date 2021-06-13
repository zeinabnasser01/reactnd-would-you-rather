import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { handleAddQuestion } from '../actions/shared';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    success: false,
  };

  handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    this.props.handleAddQuestion(optionOne, optionTwo);
    this.setState({ success: true });
  };

  render() {
    if (this.state.success) return <Redirect to='/' />;
    return this.props.authedUser ? (
      <React.Fragment>
        <div className='new-question'>
          <h1> Create New Question </h1>
          <div className='text-left'>
            <p>Complete the question:</p>
            <label>Would You Rather?</label>
            <form onSubmit={this.handleSubmit}>
              <input
                type='text'
                className='form-control'
                name='optionOne'
                value={this.state.optionOne}
                placeholder='Enter option one'
                onChange={this.handleChange}
              />
              <span>or</span>
              <input
                type='text'
                className='form-control'
                name='optionTwo'
                value={this.state.optionTwo}
                placeholder='Enter option two'
                onChange={this.handleChange}
              />
              <button className='btn' type='submit'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { referrer: '/add' },
        }}
      />
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleAddQuestion: (optionOne, optionTwo) => {
      dispatch(handleAddQuestion(optionOne, optionTwo));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
