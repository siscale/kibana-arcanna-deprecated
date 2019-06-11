
import React, {
  Fragment
} from 'react';

import PropTypes from 'prop-types';

import {
  EuiSwitch,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiBetaBadge,
  EuiFieldText,
  EuiIconTip
} from '@elastic/eui';
import { width } from 'window-size';


export class MappingField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      mappingNewName: this.props.fieldName,
      textFieldVisibility: "hidden"
    };
  }

  static propTypes = {
    fieldName: PropTypes.string,
    indexName: PropTypes.string,
    fieldType: PropTypes.string,
    onActivate: PropTypes.func,
    onDeactivate: PropTypes.func
  }

  onChangeSwitch = () => {
    if(this.state.checked === false) { 
      //Change to true
      this.setState({checked: true});
      this.setState({textFieldVisibility: "visible"})
      this.props.onActivate(
        this.props.indexName, 
        this.props.fieldName,
        this.state.mappingNewName,
        this.props.fieldType
      );
      
    }
    else { 
      this.setState({checked: false}); 
      this.setState({textFieldVisibility: "hidden"})
      this.props.onDeactivate(
        this.props.indexName,
        this.props.fieldName
      );
    }

  };


  onChangeTextField = e => {
    const newVal = e.target.value;
    this.setState({ mappingNewName: newVal})
    this.props.onActivate(
      this.props.indexName,
      this.props.fieldName,
      newVal,
      this.props.fieldType
    )
  }

  // renderCheckedElements = () => {
  //   if(this.state.checked === true) {
  //     return (
  //       <EuiFlexItem>
  //         <EuiFieldText 
  //           value={this.state.mappingNewName} 
  //           onChange={this.onChangeTextField}
  //           disabled={this.state.textFieldStatus}
  //           compressed
  //         />
            
  //       </EuiFlexItem>
  //     )
  //   } else {
  //     return null;
  //   }
  // }


  componentDidMount() {
  }

  render() {
    const key = this.props.indexName + '_' + this.props.fieldName;
    return (
      <Fragment>
          {/* <tr>
            <td style={{paddingRight:10}}>
              <EuiSwitch
                checked={this.state.checked}
                onChange={this.onChange}
              />
            </td>
            <td style={{minWidth: 300}}>
              <EuiText size="s">
                {this.props.fieldName}
              </EuiText>
            </td>
            <td style={{textAlign: "right"}}>
              <EuiBetaBadge label={this.props.fieldType}/>
            </td>
          </tr> */}        
          
          <EuiFlexGroup gutterSize="l" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiSwitch 
                key={'switch-' + key}
                checked={this.state.checked}
                onChange={this.onChangeSwitch}
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false} style={{minWidth:250}}>
              <EuiText size="s" key={'fname-' + key}>
                <h4>{this.props.fieldName}</h4>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false} style={{minWidth:130}}>
              <EuiBetaBadge key={'badge-' + key} label={this.props.fieldType}/>
            </EuiFlexItem>
            <EuiFlexItem style={{visibility: this.state.textFieldVisibility}}>
              <EuiFlexGroup alignItems="center">
                <EuiFlexItem grow={false} style={{minWidth: 200}}>
                  <EuiFieldText 
                    key={'newfname-' + key}
                    fullWidth={true}
                    value={this.state.mappingNewName} 
                    onChange={this.onChangeTextField}
                    compressed
                  />
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                <EuiIconTip
                  key={'help-' + key}
                  type="iInCircle"
                  color="subdued"
                  position="right"
                  content={<span>If desired, you can change the name of the field for the ML job from this text field.</span>}
                />
                </EuiFlexItem>
              </EuiFlexGroup>
              
              
            </EuiFlexItem>
            {/* {this.renderCheckedElements()} */}
            {/* <EuiFlexItem style={{visibility:"hidden"}}>
            <EuiFieldText compressed></EuiFieldText>
            </EuiFlexItem> */}
          </EuiFlexGroup>
      </Fragment>
    );
  }
}