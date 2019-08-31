
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
  EuiBadge,
  EuiAccordion,
  EuiCodeBlock,
  EuiCode
} from '@elastic/eui';


export class FeedbackEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      indexName: '',
      documentContent: '',
      arcanna: {},
      status: {
        color: 'warning',
        checked: false
      }
    };
    this.genericRequest = new GenericRequest();
    this.feedbackStatusMapping = {
      SYMPTOM: {
        id: "SYMPTOM",
        color: 'warning',
        displayName: "Symptom",
        checked: false
      },
      ROOT_CAUSE: {
        id: "ROOT_CAUSE",
        displayName: "Root cause",
        color: 'danger',
        checked: true
      }
    }
  }

  static propTypes = {
    event: PropTypes.object,
    onSwitchChange: PropTypes.func
  }

  componentDidMount() {
    const source = this.props.event.origDocument;
    // delete source.arcanna;
    this.setState({
      id: this.props.event._id,
      indexName: this.props.event.arcanna.source_index,
      documentContent: JSON.stringify(source, null, 2),
      arcanna: this.props.event.arcanna,
      // status: this.feedbackStatusMapping[this.props.event.arcanna.arcanna_class]
      status: this.feedbackStatusMapping["SYMPTOM"]
    });
  }

  onChangeSwitch = () => {
    if(this.state.status.id === "SYMPTOM") {
      const newStatus = this.feedbackStatusMapping.ROOT_CAUSE;
      this.setState({status: newStatus})
      this.props.onSwitchChange(this.state.indexName, this.state.id, newStatus.id);
    } else {
      const newStatus = this.feedbackStatusMapping.SYMPTOM;
      this.setState({status: newStatus});
      this.props.onSwitchChange(this.state.indexName, this.state.id, newStatus.id);
    }
  }

  render() {
    const accordionContent = (
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem grow={false}>
        <EuiBadge>{this.state.indexName}</EuiBadge>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText>
            <h4>{this.state.id}</h4>
          </EuiText>
        </EuiFlexItem>
        
      </EuiFlexGroup>
    );
    return (
      
      <EuiFlexGroup>
        <EuiFlexItem style={{minWidth:500}} grow={false}>
          <EuiAccordion buttonContent={accordionContent}>
            <EuiCodeBlock language="json">
              {this.state.documentContent}
            </EuiCodeBlock>
          </EuiAccordion>
          {/* <EuiText>
            <h4>{this.state.id}</h4>
          </EuiText> */}
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
        <EuiSwitch 
          checked={this.state.status.checked}
          onChange={this.onChangeSwitch}
        />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiBadge color={this.state.status.color}>
            {this.state.status.displayName}
          </EuiBadge>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}