import React, {
  Component
} from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiPageHeaderSection,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from '@elastic/eui';


export class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <EuiPage restrictWidth={false}>
        <EuiPageBody restrictWidth={false}>
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="m">
                <h2>Perform analyze via _analyze API</h2>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent panelPaddingSize="s">
            <h1>HAAHAHA</h1>
            <EuiSpacer size="m"/>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}