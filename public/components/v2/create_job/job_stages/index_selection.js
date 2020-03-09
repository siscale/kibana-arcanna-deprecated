import React, {
  Component, Fragment,
} from 'react';

import {
  EuiInMemoryTable,
  EuiBasicTable,
  EuiHealth,
  EuiButton,
  EuiForm
} from '@elastic/eui';


export class IndexSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log("I'm in indexSelection")
    console.log(this.props);
  }


  componentDidMount() {
  }


  render() {
    return (
      <Fragment>
        <h3>My very cool table</h3>
      </Fragment>
    );
  }
}