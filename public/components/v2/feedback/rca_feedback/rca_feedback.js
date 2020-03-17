
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import { GenericRequest } from '~services';

import { FeedbackEvent } from './feedback_event';

import {Legend} from './legend';

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
  EuiTextColor,
  EuiSwitch,
  EuiCheckbox,
  EuiSpacer,
  EuiBadge,
  EuiOverlayMask,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiToast
} from '@elastic/eui';


export class RcaFeedback extends React.Component {

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
  }

  static propTypes = {
    jobDetails: PropTypes.object
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    this.genericRequest = null;

  }

  onSwitchChange = (indexName, id, status) => {
    for (let i = 0; i < this.state.newStates.length; i++) {
      if (this.state.newStates[i].indexName === indexName && this.state.newStates[i].id === id) {
        this.state.newStates[i].status = status;
        break;
      }
    }
  }

  onNoFeedbackModalClose = () => {
    // Go back home
    this.props.history.push('');
  }

  onSubmit = async () => {
    const body = {
      events: this.state.newStates,
      jobId: this.props.jobDetails._id
    };
    this.setState({ submitButtonIsLoading: true });

    const resp = await this.genericRequest.request('give_feedback', 'POST', JSON.stringify(body));
    if ('error' in resp) {
      console.error(resp.error);
      this.setState({ submitButtonIsLoading: false });
    } else {
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
    const body = { jobId: self.props.jobDetails._id }

    const incidentData = await self.genericRequest.request('get_incident', 'POST', JSON.stringify(body));
    if ('incident' in incidentData) {
      if (incidentData.incident.length == 0) {
        self.setState({ isNoFeedbackModalVisible: true });
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
      self.setState({ isNoFeedbackModalVisible: true });
    }
  }

  renderFeedbackBatchTitle() {
    if (this.state.events.length > 0) {
      return (
        <EuiText>
          <h3>Incident ID: <EuiTextColor color="secondary">{this.state.events[0].arcanna.batch_id}</EuiTextColor></h3>
        </EuiText>
      );
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
    if (this.state.isNoFeedbackModalVisible) {
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
            <Legend/>
          </EuiFlexItem>
          <EuiFlexItem>
            {this.renderFeedbackBatchTitle()}
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
        {modal}
        <EuiToast dismissToast={() => {console.log("AAAA")}} toastLifeTimeMs={2000}/>
      </Fragment>
    );
  }
}