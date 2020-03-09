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
            {/* <ArcannaRouter httpClient={this.props.httpClient}/> */}
            <BrowserRouter>
              <Switch>
                <Route path ="/" render={() => {return (<h1>This might work?</h1>)}}/>
                <Route render={() => {return (<h1>This does not work</h1>)}}/>
                {/* <Route path="#/" component={HealthCheck} exact/> */}
                {/* <Route path="/list_jobs" component={JobList}/> */}
              </Switch>
            </BrowserRouter>
            <EuiSpacer size="m"/>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}