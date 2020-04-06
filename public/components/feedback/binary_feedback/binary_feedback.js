
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import { GenericRequest } from '../../../services';

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


export class BinaryFeedback extends React.Component {

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
  /*
  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    this.genericRequest = null;

  }


  onNoFeedbackModalClose = () => {
    // Go back home
    this.props.history.push('');
  }

*/
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
        {modal}
      </Fragment>
    );
  }
}