import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import { GenericRequest } from '../../utils/requests';

import {
  EuiButton,
  EuiText,
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

  onNoFeedbackModalClose = async () => {
    window.location.href = '#/list_jobs';
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
        {modal}
      </Fragment>
    )
  }

}