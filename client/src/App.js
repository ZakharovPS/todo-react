import React, { Component } from 'react';
import Tasks from './components/Tasks'
import Task from './components/Task'
import Error from './components/Error'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={Tasks} />
            <Route path="/error" component={Error} />
            <Route path="/task/:id" component={Task} />
          </Switch>
      </Router>
    )
  }
}

export default App;