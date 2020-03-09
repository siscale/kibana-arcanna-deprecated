
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import { GenericRequest } from '../../../utils/requests';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiTextColor,
  EuiSpacer,
  EuiCodeBlock,
  EuiCode
} from '@elastic/eui';

import arcannaSettings from './kibana.html';

import 'brace/mode/yaml';


export class HomepageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ""
    };
    this.genericRequest = new GenericRequest();
  }


  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
  }

  loadData = async () => {
    const self = this;
    const data = await this.genericRequest.request('tensorflow/health_check', 'GET');
    if('error' in data) {
      self.setState({errorMessage: 
        (
          <Fragment>
            <EuiTextColor color="danger">
              <p>The endpoint could not be reached. Please make sure that the endpoint is online and reachable.</p>
              <EuiSpacer/>
              <p>Also, make sure that you have the following settings added in the <strong>kibana.yml</strong> file:</p>
            </EuiTextColor>
            <EuiSpacer size="s"/>
            <EuiCodeBlock language="yaml">
              {arcannaSettings}
            </EuiCodeBlock>
          </Fragment>
          
        )})
    } else {
      // window.location.href = '#/list_jobs';
    }
  }

  
  render() {
    return (
      <Fragment>
        <EuiSpacer/>
        <EuiFlexGroup>
          <EuiFlexItem>
              {this.state.errorMessage}
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer/>
      </Fragment>
    );
  }
}