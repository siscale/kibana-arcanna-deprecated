
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
  EuiCode,
  EuiCheckbox
} from '@elastic/eui';
import makeId from '@elastic/eui/src/components/form/form_row/make_id';


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
      },
      isRelevant: true,
      isSwitchDisabled: false
    };
    this.genericRequest = new GenericRequest();
    // this.feedbackStatusMapping = {
    //   SYMPTOM: {
    //     id: "SYMPTOM",
    //     color: 'warning',
    //     displayName: "Symptom",
    //     checked: false
    //   },
    //   ROOT_CAUSE: {
    //     id: "ROOT_CAUSE",
    //     displayName: "Root cause",
    //     color: 'danger',
    //     checked: true
    //   }
    // }
    this.feedbackStatusMapping = {
      IRRELEVANT: {
        id: "IRRELEVANT",
        color: 'default',
        displayName: "Irrelevant",
        checked: false
      },
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

  classToNameMapping(cls) {
    if(cls === -1) {
      return "IRRELEVANT";
    } else if(cls === 0) {
      return "SYMPTOM";
    } else if(cls === 1) {
      return "ROOT_CAUSE";
    }
  }

  static propTypes = {
    event: PropTypes.object,
    onSwitchChange: PropTypes.func
  }

  componentDidMount() {
    const source = this.props.event.origDocument;
    // delete source.arcanna;
    const isRelevant = ((this.props.arcanna.best_match === -1) ? false : true);
    this.setState({
      id: this.props.event._id,
      indexName: this.props.event.arcanna.source_index,
      documentContent: JSON.stringify(source, null, 2),
      arcanna: this.props.event.arcanna,
      status: this.feedbackStatusMapping[this.classToNameMapping(this.props.event.arcanna.best_match)],
      isRelevant: isRelevant,
      isSwitchDisabled: !isRelevant

      // status: this.feedbackStatusMapping["SYMPTOM"]
    });
  }

  onChangeSwitch = () => {
    if (this.state.status.id === "SYMPTOM") {
      const newStatus = this.feedbackStatusMapping.ROOT_CAUSE;
      this.setState({ status: newStatus })
      this.props.onSwitchChange(this.state.indexName, this.state.id, newStatus.id);
    } else if(this.state.status.id === "ROOT_CAUSE") {
      const newStatus = this.feedbackStatusMapping.SYMPTOM;
      this.setState({ status: newStatus });
      this.props.onSwitchChange(this.state.indexName, this.state.id, newStatus.id);
    }
  }

  onChangeCheckbox = () => {
    if(this.state.isRelevant) {
      // make it irrelevant
      this.setState({isRelevant: false});
      this.setState({isSwitchDisabled: true});
      const newStatus = this.feedbackStatusMapping.IRRELEVANT;
      newStatus.checked = this.state.status.checked; //to know previous state
      this.setState({status: newStatus});
      this.props.onSwitchChange(this.state.indexName, this.state.id, newStatus.id);
    } else {
      this.setState({isRelevant: true});
      this.setState({isSwitchDisabled: false});
      var newStatus = this.feedbackStatusMapping.SYMPTOM;
      if(this.state.status.checked) {
        const newStatus = this.feedbackStatusMapping.ROOT_CAUSE;
      }
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
        <EuiFlexItem style={{ minWidth: 500 }} grow={false}>
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
            isDisabled={this.state.isSwitchDisabled}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiBadge color={this.state.status.color}>
            {this.state.status.displayName}
          </EuiBadge>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiCheckbox
            checked={this.state.isRelevant}
            onChange={this.onChangeCheckbox}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}