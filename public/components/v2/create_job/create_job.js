import React, {
  Component, Fragment,
} from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  EuiInMemoryTable,
  EuiBasicTable,
  EuiHealth,
  EuiButton,
  EuiForm
} from '@elastic/eui';

import { IndexSelection } from './job_stages';

export class CreateJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log("I'm in create Job");
    console.log(this.props);
  }


  componentDidMount() {
  }


  render() {
    const self = this;
    return (
      <Fragment>
        <h2>Create new ML job</h2>
        <div>
          <BrowserRouter basename={self.props.location.pathname}>
            <Switch>
              <Route path="/" component={IndexSelection} exact/>
              <Route render={() => {console.log(this.props);return (<h2>something</h2>)}}/>
            </Switch>
          </BrowserRouter>
        </div>
      </Fragment>
    );
  }
}