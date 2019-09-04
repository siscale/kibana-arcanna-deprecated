
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
        <EuiSpacer size="s"/>
        <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween" alignItems="center">
          <EuiFlexGroup direction="column" grow={false} gutterSize="none" style={{paddingLeft: 10}}>
            <EuiFlexItem>
              <EuiIcon type="string" size="l" color="warning"/>
            <EuiText> = Some explanation 1</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiIcon type="play" size="l" color="secondary"/>
              <EuiText> = Some explanation 2</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiIcon type="indexEdit" size="l" color="text" />
              <EuiText> = Some explanation 3</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiIcon type="stopFilled" size="l" color="danger"/>
              <EuiText> = Some explanation 4</EuiText>
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