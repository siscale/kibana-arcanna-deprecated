
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
  EuiBadge
} from '@elastic/eui';


export class FeedbackComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      newStates: [],
      submitButtonIsLoading: false,
      submitButtonIsDisabled: true
    };
    this.genericRequest = new GenericRequest();
    this.feedbackStatusMapping = {
      SYMPTOM: {
        color: 'warning',
        checked: false
      },
      ROOT_CAUSE: {
        color: 'danger',
        checked: true
      }
    }
  }

  static propTypes = {
    feedbackJobInformation: PropTypes.object
  }

  componentDidMount() {
    console.log('aaaa');
    if(!('jobInformation' in this.props.feedbackJobInformation)) {
      window.location.href = '#/list_jobs';
      return;
    }
    // this.loadData();
  }

  componentWillUnmount() {
    
  }

  onSwitchChange = (indexName, id, status) => {
    for(let i = 0; i < this.state.newStates.length; i++) {
      if(this.state.newStates[i].indexName === indexName && this.state.newStates[i].id === id) {
        this.state.newStates[i].status = status;
        break;
      }
    }
  }

  onSubmit = async () => {
    const body = {
      events: this.state.newStates
    };
    console.log(body);
    this.setState({submitButtonIsLoading: true});
    const resp = await this.genericRequest.request('give_feedback', 'POST', JSON.stringify(body));
    console.log('success' in resp);
    if('error' in resp) {
      console.error(resp.error);
      this.setState({submitButtonIsLoading: false});
    } else {
      console.log(resp);
      window.location.href = '#/feedback_next';
      // this.render();
    }
  }

  loadData = async () => {
    const self = this;
    const indexList = []
    this.props.feedbackJobInformation.jobInformation.indexData.forEach( (indexData) => {
      indexList.push(indexData.index);
    });
    
    const body = { indexList: indexList };

    const incidentData = await self.genericRequest.request('get_incident', 'POST', JSON.stringify(body));
    if('incident' in incidentData) {
      self.setState({events: incidentData.incident});
      const newStates = [];
      incidentData.incident.forEach((incident) => {
        newStates.push({
          indexName: incident.hit._index,
          status: incident.arcanna.arcanna_class,
          id: incident._id
        });
      });
      self.setState({
        newStates: newStates
      });
    } else {
      console.log("No new incidents to give feedback");
    }
  }

  renderFeedbackElements = () => {
    const rows = [];
    if(this.state.events.length === 0) {
      this.setState({submitButtonIsDisabled: true})
      return (
        <EuiText>
          <h3>There are not items to give feedback to. Please try again later.</h3>
        </EuiText>
      );
    } else {
      this.setState({submitButtonIsDisabled: false})
      this.state.events.forEach((event) => {
        rows.push(
          <FeedbackEvent
            event={event}
            key={event._id}
            onSwitchChange={this.onSwitchChange}
          />
          // <EuiTableRow>
          //   <EuiTableRowCell>
          //     <EuiText>
          //       <h4>{event._id}</h4>
          //     </EuiText>
          //   </EuiTableRowCell>
          //   <EuiTableRowCell>
          //     <EuiSwitch/>
          //   </EuiTableRowCell>
          //   <EuiTableRowCell>
          //     <EuiBadge>{event.arcanna.arcanna_class}</EuiBadge>
          //   </EuiTableRowCell>
          // </EuiTableRow>
        );
      });
      return rows;
    }
  }

  render() {
    return (
      <Fragment>
        <EuiFlexGroup  direction="column">
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
        </EuiFlexGroup>  
      </Fragment>
    );
  }
}