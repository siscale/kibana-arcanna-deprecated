import React, {
  Component, Fragment,
} from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

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
  }


  componentDidMount() {
  }


  render() {
    return (
      <Fragment>
        <h2>Create new ML job</h2>
        <div>
          <BrowserRouter basename={this.props.history.pathname}>
            <Switch>
              <Route path="/" component={IndexSelection} exact/>
              <Route render={() => {return (<h2>something</h2>)}}/>
            </Switch>
          </BrowserRouter>
        </div>
      </Fragment>
    );
  }
}