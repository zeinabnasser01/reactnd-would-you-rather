import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import './App.css';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import NewQuestion from './components/NewQuestion';
import LeaderBoard from './components/LeaderBoard';
import Poll from './components/Poll';
import Page404 from './components/404';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    // const { authedUser } = this.props;
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          {/* {authedUser ? (
            <Route path='/' component={Login} />
          ) : (
            <React.Fragment>
              <Route exact path='/' component={Home} />
              <Route path='/add' component={NewQuestion} />
              <Route path='/leader-board' component={LeaderBoard} />
              <Route path='/questions/:id' component={Poll} />
              <Route component={Page404} />
            </React.Fragment>
          )} */}

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/add' component={NewQuestion} />
            <Route path='/leader-board' component={LeaderBoard} />
            <Route path='/questions/:id' component={Poll} />
            <Route component={Page404} />
          </Switch>
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
