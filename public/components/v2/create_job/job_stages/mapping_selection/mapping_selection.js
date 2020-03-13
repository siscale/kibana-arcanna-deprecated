
import React, { Fragment }from 'react';

import PropTypes from 'prop-types';

import { GenericRequest } from '~services';

// import 'brace/theme/github';
import 'brace/mode/json';
// import 'brace/snippets/json';
// import 'brace/ext/language_tools';

import exampleQueries from './example_queries.json'

import {
  EuiAccordion,
  EuiSpacer,
  EuiHorizontalRule,
  EuiPanel,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlexGrid,
  EuiText,
  EuiTextColor,
  EuiTextArea,
  EuiCodeEditor,
  EuiIconTip,
  EuiFlyout,
  EuiTitle,
  EuiCodeBlock,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiSwitch
} from '@elastic/eui';

// import { MappingField } from './mapping_field';

export class MappingSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.genericRequest = new GenericRequest();
    console.log(this.props);
  }

  static propTypes = {
    selectedIndexList: PropTypes.array
  }

  componentDidMount() {
    this.setState({selectedIndexList: this.props.selectedIndexList});
  }



  render() {
    return (
      <Fragment>
        <h2>{this.state.selectedIndexList}</h2>
      </Fragment>
    );
  }
}