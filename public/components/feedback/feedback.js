
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
    if (!('jobInformation' in this.props.feedbackJobInformation)) {
      window.location.href = '#/list_jobs';
      return;
    }
    // this.loadData();
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <p>????</p>
    )
  }
}