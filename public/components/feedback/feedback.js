import React, {
  Component, Fragment,
} from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { RcaFeedback} from './rca_feedback';

import PropTypes from 'prop-types';

export class FeedbackMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static propTypes = {
    jobDetails: PropTypes.object.isRequired
  }

  

  updateIndexList = (newList) => {
    this.setState({selectedIndexList: newList})
  }

  updateFieldMappings =(newMapping) => {
    this.setState({indexFieldMappings: newMapping});
  }


  componentDidMount() {
    console.log(this.props.jobDetails);
    if(this.props.jobDetails.jobType === undefined) {
      this.props.jobDetails.jobType = 'rca';
    }
    this.props.history.push(`${this.props.match.path}/${this.props.jobDetails.jobType}`);
  }


  render() {
    const self = this;
    return (
      <Fragment>
        <h2>Feedback</h2>
        <div>
              <Switch>
                <Route exact path={self.props.match.path} component={Fragment}/>
                <Route path={`${self.props.match.path}/rca`} render={
                  (props) => {
                    return (<RcaFeedback {...props} jobDetails={self.props.jobDetails}/>)
                  }
                }/>
                <Route path={`${self.props.match.path}/binary`} render={(props) => {return (<h2>binary</h2>)}}/>
              </Switch>
        </div>
        <p>Hello, Arcanna!</p>
      </Fragment>
    );
  }

  

}