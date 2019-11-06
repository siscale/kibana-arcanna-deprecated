
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import { GenericRequest } from '../../utils/requests';

import { FeedbackEvent } from './feedbackEvent';

import {

  EuiTable,
  EuiTableHeader,
  EuiTableFooter,
  EuiTableBody,
  EuiTableHeaderCell,
  EuiTableRow,
  EuiTableRowCell,
  EuiFlexGroup,
  EuiFlexGrid,
  EuiFlexItem,
  EuiButton,
  EuiText,
  EuiSwitch,
  EuiSpacer,
  EuiBadge,
  EuiOverlayMask,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter
} from '@elastic/eui';


export class FeedbackComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      newStates: [],
      submitButtonIsLoading: false,
      submitButtonIsDisabled: true,
      isNoFeedbackModalVisible: false
    };
    this.genericRequest = new GenericRequest();
    // this.feedbackStatusMapping = {
    //   IRRELEVANT: {
    //     color: 'default',
    //     checked: false
    //   },
    //   SYMPTOM: {
    //     color: 'warning',
    //     checked: false
    //   },
    //   ROOT_CAUSE: {
    //     color: 'danger',
    //     checked: true
    //   }
    // }
  }

  static propTypes = {
    feedbackJobInformation: PropTypes.object
  }

  componentDidMount() {
    if (!('jobInformation' in this.props.feedbackJobInformation)) {
      window.location.href = '#/list_jobs';
      return;
    }
    this.loadData();
  }

  componentWillUnmount() {

  }

  onSwitchChange = (indexName, id, status) => {
    for (let i = 0; i < this.state.newStates.length; i++) {
      if (this.state.newStates[i].indexName === indexName && this.state.newStates[i].id === id) {
        this.state.newStates[i].status = status;
        break;
      }
    }
  }

  onNoFeedbackModalClose = async () => {
    window.location.href = '#/list_jobs';
  }

  onSubmit = async () => {
    const body = {
      events: this.state.newStates,
      jobId: this.props.feedbackJobInformation.jobInformation._id
    };
    this.setState({submitButtonIsLoading: true});

    const resp = await this.genericRequest.request('give_feedback', 'POST', JSON.stringify(body));
    if('error' in resp) {
      console.error(resp.error);
      this.setState({submitButtonIsLoading: false});
    } else {
      window.location.href = '#/feedback_next';
      // this.render();
    }
  }

  loadData = async () => {
    const self = this;
    // const indexList = []

    // this.props.feed
    // this.props.feedbackJobInformation.jobInformation.indexData.forEach( (indexData) => {
    // indexList.push(indexData.index);
    // });

    // const body = { indexList: indexList };
    const body = { jobId: self.props.feedbackJobInformation.jobInformation._id }

    const incidentData = await self.genericRequest.request('get_incident', 'POST', JSON.stringify(body));
    if ('incident' in incidentData) {
      if(incidentData.incident.length == 0) {
        console.log("No new incidents to give feedback");
        self.setState({isNoFeedbackModalVisible: true});        
      }
      self.setState({ events: incidentData.incident });
      const newStates = [];
      incidentData.incident.forEach((incident) => {
        newStates.push({
          indexName: incident.arcanna.source_index,
          status: incident.arcanna.best_match,
          id: incident._id
        });
      });
      self.setState({
        newStates: newStates
      });
    } else {
      console.log("No new incidents to give feedback");
      self.setState({isNoFeedbackModalVisible: true});
    }
  }

  renderFeedbackElements() {
    var rows = [];
    this.state.events.forEach((event) => {
      rows.push(
        <FeedbackEvent
          event={event}
          key={event._id}
          onSwitchChange={this.onSwitchChange}
        />
      )
    });
    return rows;
  }

  render() {
    let modal;
    if(this.state.isNoFeedbackModalVisible) {
      modal = (
        <EuiOverlayMask>
          <EuiModal onClose={this.onNoFeedbackModalClose}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Feedback</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiText>There are no more incidents to give feedback to, at the current time. Please close this message to go back to the job list.</EuiText>
            </EuiModalBody>
            <EuiModalFooter>
              <EuiButton onClick={this.onNoFeedbackModalClose}>Go back to job list</EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      )
    }
    return (
      <Fragment>
        <EuiFlexGroup direction="column">
          <EuiFlexItem>
            <EuiFlexItem>
              <EuiSpacer size="m"/>
              <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween" alignItems="center">
                <EuiFlexGroup direction="column" grow={false} gutterSize="none" style={{paddingLeft: 30}}>
                  <EuiFlexItem>
                    <EuiText size="s" color="subdued">
                      <EuiSwitch checked={false} compressed/> 
                      This means that ...
                    </EuiText>
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiFlexGroup gutterSize="s" direction="row">
                      <EuiFlexItem grow={false}>
                        <EuiSwitch checked={true}/> 
                      </EuiFlexItem>
                      <EuiFlexItem>
                        <EuiText size="s" color="subdued" compressed>
                          This means that ...
                        </EuiText>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiFlexItem>
                  
                </EuiFlexGroup>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup direction="column">
                <EuiFlexItem>
                  <EuiFlexGroup direction="rowReverse">
                    <EuiFlexItem grow={false} style={{paddingRight:30}}>
                      <EuiButton fill onClick={this.onSubmit} isLoading={this.submitButtonIsLoading}>
                        Submit
                      </EuiButton>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGrid>
              <EuiFlexItem>
                <EuiTable>
                  <EuiTableBody>
                    {this.renderFeedbackElements()}
                  </EuiTableBody>
                </EuiTable>
              </EuiFlexItem>
              <EuiFlexItem>
              </EuiFlexItem>
            </EuiFlexGrid>
          </EuiFlexItem>
        </EuiFlexGroup>


        {/* <EuiFlexGroup  direction="column">
          <EuiFlexItem>
            <EuiFlexGroup direction="rowReverse">
              <EuiFlexItem grow={false} style={{paddingRight:30}}>
                <EuiButton fill onClick={this.onSubmit} isLoading={this.submitButtonIsLoading}>
                  Submit
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGrid>
              <EuiFlexItem>
                <EuiTable>
                  <EuiTableBody>
                    {this.renderFeedbackElements()}
                  </EuiTableBody>
                </EuiTable>
              </EuiFlexItem>
              <EuiFlexItem>
              </EuiFlexItem>
            </EuiFlexGrid>
          </EuiFlexItem>
        </EuiFlexGroup> */}
        {modal}
      </Fragment>
    );
  }
}