
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
      self.setState({isNoFeedbackModalVisible: true});
    }
  }

  renderFeedbackBatchTitle() {
    if(this.state.events.length > 0) {
      return (
        <EuiText>
          {/* <h3>Incident ID: <EuiTextColor color="accent">{this.state.events[0].arcanna.batch_id}</EuiTextColor></h3> */}
          <h3>Incident ID: <EuiBadge color="hollow">{this.state.events[0].arcanna.batch_id}</EuiBadge></h3>
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
            <EuiFlexGroup direction="row" justifyContent="spaceBetween">
              <EuiFlexItem>
                <EuiSpacer size="m"/>
                <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween" alignItems="center">
                  <EuiFlexGroup direction="column" grow={false} gutterSize="xs" style={{paddingLeft: 30}}>
                    <EuiFlexItem>
                      <EuiFlexGroup gutterSize="none" direction="row" >
                        <EuiFlexItem grow={false} style={{minWidth: 60}}>
                          <EuiFlexItem style={{zoom: 0.8, "-moz-transform": "scale(0.8)"}}>
                            <EuiSwitch 
                              checked={true} 
                              onChange={()=>{}}
                            />
                          </EuiFlexItem>
                        </EuiFlexItem>
                        <EuiFlexItem>
                          <EuiText size="s" color="subdued">
                            the event represents the <EuiTextColor color="danger"><span style={{fontWeight: "bold"}}>root cause</span></EuiTextColor> of this incident.
                          </EuiText>
                        </EuiFlexItem>
                      </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem>
                      <EuiFlexGroup gutterSize="none" direction="row">
                        <EuiFlexItem grow={false} style={{minWidth: 60}}>
                          <EuiFlexItem style={{zoom: 0.8, "-moz-transform": "scale(0.8)"}}>
                            <EuiSwitch 
                              checked={false} 
                              onChange={()=>{}}
                            />
                          </EuiFlexItem>
                        </EuiFlexItem>
                        <EuiFlexItem>
                          <EuiText size="s" color="subdued">
                            the event represents a <EuiTextColor color="warning"><span style={{fontWeight: "bold"}}>symptom</span></EuiTextColor>.
                          </EuiText>
                        </EuiFlexItem>
                      </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem> 
                      <EuiFlexGroup gutterSize="none" direction="row" >
                        <EuiFlexItem grow={false} style={{ minWidth: 60, paddingLeft:15}}>
                          <EuiCheckbox
                            id="legendcheckboxChecked"
                            checked={true}
                            onChange={()=>{}}
                          />
                        </EuiFlexItem>
                        <EuiFlexItem>
                          <EuiText size="s" color="subdued">
                          the event is <EuiTextColor color="default"><span style={{fontWeight: "bold"}}>relevant</span></EuiTextColor> to this incident.
                          </EuiText>
                        </EuiFlexItem>
                      </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem>
                      <EuiFlexGroup gutterSize="none" direction="row">
                        <EuiFlexItem grow={false} style={{ minWidth: 60, paddingLeft:15}}>
                          <EuiCheckbox
                            id="legendcheckboxUnchecked"
                            checked={false}
                            onChange={()=>{}}
                          />
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                          <EuiText size="s" color="subdued">
                            the event is <EuiTextColor color="default"><span style={{fontWeight: "bold"}}>irrelevant</span></EuiTextColor> to this incident.
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
            </EuiFlexGroup>
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