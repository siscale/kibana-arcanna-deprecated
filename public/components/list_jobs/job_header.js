
import React, { Fragment } from 'react';

import {

  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiSpacer,
  EuiText
} from '@elastic/eui';
import { EuiIcon } from '@elastic/eui';





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
        <EuiSpacer size="m"/>
        <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween" alignItems="center">
          <EuiFlexGroup direction="column" grow={false} gutterSize="none" style={{paddingLeft: 10}}>
            <EuiFlexItem>
              <EuiText size="s">
                <EuiIcon type="string" size="m" color="warning"/>
                = Some explanation 1
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText size="s">
                <EuiIcon type="play" size="m" color="secondary"/>
                = Some explanation 2
              </EuiText>
            </EuiFlexItem>
              <EuiFlexItem>
              <EuiText size="s">
                <EuiIcon type="indexEdit" size="m" color="text" />
                = Some explanation 3
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText size="s"> 
                <EuiIcon type="stopFilled" size="m" color="danger"/>
                = Some explanation 4
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexItem grow={false} style={{paddingRight: 10}}>
            <EuiButton fill onClick={this.onClickCreateJob}>
              Create new job
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="l"/>
      </Fragment>
    );
  }
}