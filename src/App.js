import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import './App.css';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import NewQuestion from './components/NewQuestion';
import LeaderBoard from './components/LeaderBoard';
import Poll from './components/Poll';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authedUser } = this.props;
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          {authedUser ? (
            <Route path='/' component={Login} />
          ) : (
            <React.Fragment>
              <Route exact path='/' component={Home} />
              <Route path='/new-question' component={NewQuestion} />
              <Route path='/leader-board' component={LeaderBoard} />
              <Route path='/questions/:id' component={Poll} />
            </React.Fragment>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser === null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
