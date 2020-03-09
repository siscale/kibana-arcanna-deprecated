
import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import {HealthCheck} from '../health_check';



export class ArcannaRouter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount() {
  }

  componentWillUnmount() {
  }


  
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={HealthCheck} exact/>
        </Switch>
      </Router>
    );
  }
}