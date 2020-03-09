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

  onClickButton = () => {
    this.props.history.push('something');
  }

  componentDidMount() {
  }


  render() {
    return (
      <Fragment>
        <EuiButton onClick={this.onClickButton} />
        <h3>My very cool table</h3>
      </Fragment>
    );
  }
}