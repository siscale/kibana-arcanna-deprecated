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
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import {HealthCheck} from './health_check';
import {JobList} from './list_jobs';
import {CreateJob} from './create_job';




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
                <h1>Arcanna</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
              Automated Root Cause Analysis Neural Network Assisted
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent panelPaddingSize="s">
            {/* <ArcannaRouter httpClient={this.props.httpClient}/> */}
            <BrowserRouter basename={this.props.baseUrl}>
              <Switch>
                <Route path="/" component={HealthCheck} exact/>
                <Route path="/list_jobs" component={JobList}/>
                <Route path="/create_job" component={
                  (props) => {
                    return (<CreateJob {...props} baseUrl={this.props.baseUrl} />)}
                  }/>
              </Switch>
            </BrowserRouter>
            <EuiSpacer size="m"/>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}