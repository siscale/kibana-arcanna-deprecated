
import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
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
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HealthCheck} exact/>
        </Switch>
      </BrowserRouter>
    );
  }
}