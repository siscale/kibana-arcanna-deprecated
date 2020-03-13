
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

import { MappingField } from './mapping_field';

export class MappingSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      indices: {},
      selectedFields: {},
      selectionQueries: {},
      selectAllChecked:{},
      nextButtonDisabled: true,
      isFlyoutVisible: false,
      childrenReferences: {}
    };
    this.tempIndices = {};
    this.genericRequest = new GenericRequest();
  }

  static propTypes = {
    selectedIndexList: PropTypes.array
    // indexFieldMappings: PropTypes.object
  }

  componentDidMount() {
    // if(this.props.selectedIndexList.length === 0) {
    //   this.props.history.push('/');
    //   this.componentWillUnmount();
    //   return;
    // }
    this.retrieveData();
  }

  analyzeMappingField(mappingData, indexName, fieldName, fieldInfo) {
    const self = this;
    if('type' in fieldInfo) {
      mappingData[indexName].push({field_name: fieldName, type: fieldInfo.type});
    }
    if('properties' in fieldInfo) {
      Object.keys(fieldInfo.properties).forEach((propName) => {
        self.analyzeMappingField(
          mappingData,
          indexName, 
          fieldName + '.' + propName, 
          fieldInfo.properties[propName]
        );
      });
    }

    if('fields' in fieldInfo) {
      Object.keys(fieldInfo.fields).forEach((innerField) => {
        self.analyzeMappingField(
          mappingData,
          indexName, 
          fieldName + '.' + innerField, 
          fieldInfo.fields[innerField]
        );
      });
    }

  }

  async retrieveData() {
    const self = this;
    const indexData = await self.genericRequest.request('list_indices', 'GET');
    let mappingData = {};
    self.props.selectedIndexList.forEach((index) => {
      try {
        if(index.index_name in indexData) {
          var currentMapping = indexData[index.index_name].mappings[Object.keys(indexData[index.index_name].mappings)[0]].properties;
          mappingData[index.index_name] = [];
          Object.keys(currentMapping).forEach((fieldName) => {
            self.analyzeMappingField(mappingData, index.index_name, fieldName ,currentMapping[fieldName])
          });
        }
      } catch (error) {
        console.error(error);
      }
    });
    self.setState({indices: mappingData});
    Object.keys(mappingData).forEach((indexName) => {
      self.state.selectAllChecked[indexName] = false;
    });
  }

  onFieldActivated = (indexName, fieldName, newMappingName, fieldType) => {
    const self = this;
    if(!(indexName in self.state.selectedFields)) {
      self.state.selectedFields[indexName] = {};
    }
    // if(!(fieldName in self.state.selectedFields[indexName])) {
    self.state.selectedFields[indexName][fieldName] = {
      newMappingName: newMappingName,
      fieldType: fieldType
    };
    self.setState({nextButtonDisabled: false});
    // }
  }

  onFieldDeactivated = (indexName, fieldName) => {
    const self = this;
    if(indexName in self.state.selectedFields) {
      if(fieldName in self.state.selectedFields[indexName]) {
        delete self.state.selectedFields[indexName][fieldName];
      }
      if(Object.keys(self.state.selectedFields[indexName]).length === 0) {
        delete self.state.selectedFields[indexName];
      }
    }
    if(Object.keys(self.state.selectedFields).length === 0) {
      self.setState({nextButtonDisabled: true});
    }
  }

  onChangeQueryTextarea = (indexName, value) => {
    this.state.selectionQueries[indexName] = value;
  }
  onBlurQueryTextarea = () => {
    this.setState({selectionQueries: this.state.selectionQueries})
  }

  
  onClickNextPage = () => {
    const self = this;
    // if(Object.keys(this.state.selectedFields).length > 0) {
    //   //clear old indexFieldMappings
    //   Object.keys(this.props.indexFieldMappings).forEach((indexName) => {
    //     delete self.props.indexFieldMappings[indexName];
    //   });


    //   Object.keys(this.state.selectedFields).forEach((indexName) => {
    //     self.props.indexFieldMappings[indexName] = {};
    //     self.props.indexFieldMappings[indexName].mappings = self.state.selectedFields[indexName];
    //     if(indexName in self.state.selectionQueries) {
    //       self.props.indexFieldMappings[indexName].query = self.state.selectionQueries[indexName];
    //     } else {
    //       self.props.indexFieldMappings[indexName].query = '';
    //     }
    //   });
    //   window.location.href = "#/create_job_settings"
    // }
  }

  renderFlyout() {
    if(this.state.isFlyoutVisible) {
      // const exampleQuery1 = require('./example_queries/example1.json');
      const examples = [];
      exampleQueries.forEach((queryJson) => {
        const str = JSON.stringify(queryJson, undefined, 2);
        examples.push((
          <EuiCodeBlock language="js" paddingSize="s">
            {str}
          </EuiCodeBlock>
        ));
      });


      return (
        <EuiFlyout
          // ownFocus
          onClose={this.closeFlyout}
          size="s"
          aria-labelledby="flyoutTitle"
        >
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="s">
              <h2 id="flyoutTitle">Query selection of documents in an index</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              <p>
                If you wish select only particular documents from the index, you can add a 
                query that will be applied when retrieving documents. You must respect the 
                Elasticsearch query syntax.
              </p>
              <p>Here are some examples of valid queries:</p> 
              {examples}
            </EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      );
    } else {
      return null;
    }
  }

  closeFlyout = () => {
    this.setState({ isFlyoutVisible: false });
  }

  showFlyout = () => {
    this.setState({ isFlyoutVisible: true });
  }

  onSelectAll = (indexName) => {
    const self = this;
    if(self.state.selectAllChecked[indexName] === false) {
      self.state.selectAllChecked[indexName] = true;
    }
    else {
      self.state.selectAllChecked[indexName] = false;
    }
    self.state.indices[indexName].forEach((fieldData) => {
      const key = indexName + '.' + fieldData.field_name;
      self.state.childrenReferences[key].current.forceSwitchChange(self.state.selectAllChecked[indexName]); 
    });
  }

  renderFields(index) {
    const fieldRenderings = [];
    const self = this;
    this.state.indices[index].forEach((fieldData) => {
      const key = index + '.' + fieldData.field_name;
      self.state.childrenReferences[key] = React.createRef();
      // const keyTextArea = 'textarea-' + key;
      fieldRenderings.push(
        <EuiFlexGroup>
          <EuiFlexItem>
            {/* <MappingField 
              key={key} 
              ref={self.state.childrenReferences[key]}
              fieldName={fieldData.field_name}
              fieldType={fieldData.type}
              indexName={index}
              onActivate={this.onFieldActivated}
              onDeactivate={this.onFieldDeactivated}
            /> */}
          </EuiFlexItem>
        </EuiFlexGroup>
      )
    });
    return fieldRenderings;
  }


  renderIndices() {
    const self = this;
    const indexRenderings = [];
    
    Object.keys(self.state.indices).forEach((indexName) => {
      const renderAccordionContent = (<EuiText>
                                        <h3><EuiTextColor color="secondary">{indexName}</EuiTextColor></h3>
                                      </EuiText>
      );
      indexRenderings.push(
            <EuiAccordion 
              id={indexName}
              key={'accordion-' +indexName} 
              initialIsOpen={true}
              buttonContent={renderAccordionContent}
              paddingSize="m"
            >
            <EuiFlexGroup>
              <EuiFlexItem grow={false}> 
                <EuiSwitch
                  key={'switch-all-' + indexName}
                  checked={this.state.selectAllChecked[indexName]}
                  onChange={() => {self.onSelectAll(indexName)}}
                />
                <EuiSpacer size="s"/>
                {self.renderFields(indexName)}
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiFlexGroup gutterSize="xs" direction="column">
                  <EuiFlexItem grow={false}>
                    <EuiFlexGroup gutterSize="none">
                      <EuiFlexItem grow={false}>
                        <EuiButton onClick={this.showFlyout} iconType="questionInCircle">
                          Help
                        </EuiButton>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiCodeEditor
                      mode="json"
                      key={'textArea-' +indexName} 
                      value={this.state.selectionQueries[indexName]}
                      onBlur={this.onBlurQueryTextarea}
                      onChange={(value) => this.onChangeQueryTextarea(indexName, value) }
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
               
              </EuiFlexItem>
            </EuiFlexGroup>

            
            </EuiAccordion>
          // <EuiSpacer/>
      )
    });
    return indexRenderings;
  }


  render() {
    return (
      <Fragment>
        <EuiFlexGroup alignItems="flexEnd" direction="column">
          <EuiFlexItem grow={false} style={{paddingRight: 30}}>
            <EuiButton 
              fill 
              key="button"
              isDisabled={this.state.nextButtonDisabled} 
              onClick={this.onClickNextPage}
            >
              Next
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup gutterSize="m">
          <EuiFlexItem>
            {this.renderIndices()}
          </EuiFlexItem>
        </EuiFlexGroup>
        {this.renderFlyout()}
      </Fragment>
    );
  }
}