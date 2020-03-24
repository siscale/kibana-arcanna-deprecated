import React, {
  Component
} from 'react';

// import { ArcannaRouter } from './router';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { HealthCheck } from './health_check';
import { JobList } from './list_jobs';
import { CreateJob } from './create_job';
import { FeedbackMain } from './feedback';




export class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackSelectedJobDetails: {}
    }
  }

  updateFeedbackJobDetails = (jobDetails) => {
    this.setState({ feedbackSelectedJobDetails: jobDetails });
  }

  render() {
    return (
      <Switch>
        <Route path="/" component={HealthCheck} exact />
        <Route path="/list_jobs" render={
          (props) => {
            return (<JobList {...props} updateFeedbackJobDetails={this.updateFeedbackJobDetails} />)
          }
        } />

        <Route path="/create_job" render={
          (props) => {
            return (<CreateJob {...props} />)
          }
        } />

        <Route path="/feedback" render={
          (props) => {
            return (<FeedbackMain {...props} jobDetails={this.state.feedbackSelectedJobDetails} />)
          }
        } />

      </Switch>
    );
  }
}