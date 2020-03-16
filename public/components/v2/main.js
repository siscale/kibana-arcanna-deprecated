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
// import { ArcannaRouter } from './router';
import {MainContent} from './mainContent';



export class Main extends Component {
  constructor(props) {
    super(props);
    this.state= {
      feedbackItem: 
    }
  }

  render() {
    return (
      <EuiPage restrictWidth={false}>
        <EuiPageBody restrictWidth={false}>
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="m">
                <h1>Arcanna</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
              Automated Root Cause Analysis Neural Network Assisted
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent panelPaddingSize="s">
            <MainContent/>         
            <EuiSpacer size="m"/>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}