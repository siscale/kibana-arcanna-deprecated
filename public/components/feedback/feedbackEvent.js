
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

export class FeedbackEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      errorMessage: '',
      fullUrl: '',
      hostname: '',
      indexName: '',
      documentContent: '',
      arcanna: {},
      status: {
        color: 'warning',
        checked: false
      },
      isRelevant: true,
      isSwitchDisabled: false,
      oldSwitchStatus: false
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

  generateId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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

  nameMappingToClass(name) {
    if(name === "IRRELEVANT") {
      return -1;
    } else if(name === "SYMPTOM") {
      return 0;
    } else if(name === "ROOT_CAUSE") {
      return 1;
    }
  }

  static propTypes = {
    event: PropTypes.object,
    onSwitchChange: PropTypes.func
  }

  parseEventHeader() {
    const self = this;
    const event = self.props.event;
    var fullUrl = ""
    var errorMsg = ""
    var hostname = ""
    if("full_url" in event.arcanna) {
      fullUrl = event.arcanna.full_url
    }
    
    if("error_stripped" in event.arcanna) {
      errorMsg = event.arcanna.error_stripped
    } else {
      if("error_message" in event.arcanna) {
        errorMsg = event.arcanna.error_message
      }
    }
    if("host" in event.arcanna) {
      hostname = event.arcanna.host
    }
    if(fullUrl === "" && errorMsg === "" && hostname === "") {
      return [event._id, '', '']
    }
    return [fullUrl, hostname, errorMsg]
  }

  componentDidMount() {
    const source = this.props.event.origDocument;
    // delete source.arcanna;
    const isRelevant = ((this.props.event.arcanna.best_match === -1) ? false : true);
    const [url, host, errorMsg] = this.parseEventHeader();
    this.setState({
      id: this.props.event._id,
      fullUrl: url,
      hostname: host,
      errorMessage: errorMsg,
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
      this.props.onSwitchChange(this.state.indexName, this.state.id, this.nameMappingToClass(newStatus.id));
    } else if(this.state.status.id === "ROOT_CAUSE") {
      const newStatus = this.feedbackStatusMapping.SYMPTOM;
      this.setState({ status: newStatus });
      this.props.onSwitchChange(this.state.indexName, this.state.id, this.nameMappingToClass(newStatus.id));
    }
  }

  onChangeCheckbox = () => {
    if(this.state.isRelevant) {
      // make it irrelevant
      this.setState({isRelevant: false});
      this.setState({isSwitchDisabled: true});
      const newStatus = this.feedbackStatusMapping.IRRELEVANT;
      this.setState({oldSwitchStatus: this.state.status.checked}); //to know previous state
      this.setState({status: newStatus});
      this.props.onSwitchChange(this.state.indexName, this.state.id, this.nameMappingToClass(newStatus.id));
    } else {
      this.setState({isRelevant: true});
      this.setState({isSwitchDisabled: false});
      var newStatus = this.feedbackStatusMapping.SYMPTOM;
      if(this.state.oldSwitchStatus) {
        newStatus = this.feedbackStatusMapping.ROOT_CAUSE;
      }
      this.setState({status: newStatus});
      this.props.onSwitchChange(this.state.indexName, this.state.id, this.nameMappingToClass(newStatus.id));
    }
  }

  render() {
    const accordionContent = (
      <EuiFlexGroup gutterSize="xs">
        <EuiFlexItem grow={false}>
          <EuiBadge>{this.state.indexName}</EuiBadge>
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <EuiText size="m">
          <span style={{fontWeight: "bold"}}>{this.state.fullUrl}</span> 
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={1}>
          <EuiText size="m">
            <span>Host: {this.state.hostname}</span>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={7}>
          <EuiText size="s">
            <p>{this.state.errorMessage}</p>
          </EuiText>
        </EuiFlexItem>

      </EuiFlexGroup>
    );
    return (

      <EuiFlexGroup>
        <EuiFlexItem style={{ minWidth: 1024 }} grow={false}>
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
            disabled={this.state.isSwitchDisabled}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiCheckbox
            id={this.generateId(8)}
            checked={this.state.isRelevant}
            onChange={this.onChangeCheckbox}
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