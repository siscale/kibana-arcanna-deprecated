
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import { GenericRequest } from '../../utils/requests';


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


export class FeedbackNext extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('bbb');
    window.location.href = '#/feedback';
    console.log('aaa');
  }

  componentWillUnmount() {
    
  }

  render() {
    return (
      <Fragment>
        <EuiText>
          <h3>Loading...</h3>
        </EuiText>  
      </Fragment>
    );
  }
}