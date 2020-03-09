import React, {
  Component, Fragment,
} from 'react';

import { BrowserRouter } from 'react-router-dom';

import {
  EuiInMemoryTable,
  EuiBasicTable,
  EuiHealth,
  EuiButton,
  EuiForm
} from '@elastic/eui';


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
      </Fragment>
    );
  }
}