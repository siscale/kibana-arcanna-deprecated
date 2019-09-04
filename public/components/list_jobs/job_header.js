
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import { GenericRequest } from '../../utils/requests';

import { JobEntry } from './job_entry';

import {

  EuiFlexGroup,
  EuiFlexItem,
  EuiButton
} from '@elastic/eui';
import { EuiText } from '@elastic/eui';



export class JobListHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount() {

  }

  componentWillUnmount() {

  }

  onClickCreateJob = () => {
    window.location.href = '#/create_job';
  }


  render() {
    return (
      <Fragment>
        <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween">
          <EuiFlexGroup direction="row" grow={false}>
            <EuiFlexItem>
              <EuiText>Some explanation 1</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText>Some explanation 2</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText>Some explanation 3</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText>Some explanation 4</EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiButton fill onClick={this.onClickCreateJob}>
              Create new job
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </Fragment>
    );
  }
}