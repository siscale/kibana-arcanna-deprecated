
import React, { Fragment }from 'react';

import PropTypes from 'prop-types';

import { GenericRequest } from '../../utils/requests';

import {
  EuiAccordion,
  EuiSpacer,
  EuiHorizontalRule,
  EuiPanel,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlexGrid,
  EuiForm,
  EuiFormRow,
  EuiFieldText
} from '@elastic/eui';

import { MappingField } from './mapping_field';

export class JobSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jobName: "",
      invalidFields: {
        jobName: {
          status: true,
          errorMsg: (<span>
                      The name should be composed of alphanumerical characters, '_' or '-'. 
                    </span>
          )
        }
      },
      submitButtonDisabled: true,
      submitButtonIsLoading: false,
    };
    this.genericRequest = new GenericRequest();
  }

  static propTypes = {
    indexFieldMappings: PropTypes.object
  }

  componentDidMount() {

    if(Object.keys(this.props.indexFieldMappings).length === 0) {
      window.location.href = '#/create_job_mappings';
      return;
    }
  }

  checkIfCanSubmit() {
    const self = this;
    let canSubmit = true;
    Object.keys(this.state.invalidFields).forEach((fieldName) => {
      if(self.state.invalidFields[fieldName].status === true) {
        canSubmit = false;
      }
    })
    if(canSubmit === true) {
      this.setState({submitButtonDisabled: false})
    } else {
      this.setState({submitButtonDisabled: true})
    }
  }

  submitJob = async () => {
    this.setState({submitButtonIsLoading: true});
    var body = {
      jobName: this.state.jobName,
      indexData: this.props.indexFieldMappings
    };


    const resp = await this.genericRequest.request('put_job', 'POST', JSON.stringify(body));

    if('error' in resp) {
      console.error(resp.error);
      this.setState({submitButtonIsLoading: false});
    } else {
      body = {
        jobId: resp.jobId
      };
      await this.genericRequest.request('tensorflow/evaluate', "POST", JSON.stringify(body));
      window.location.href='#/list_jobs';
    }
  }

  onChangeJobName = e => {
    this.setState({jobName: e.target.value});
    let re = new RegExp('^[-a-zA-Z0-9_]+$');
    if(re.test(e.target.value)) {
      this.state.invalidFields.jobName.status = false;
    } else {
      this.state.invalidFields.jobName.status = true;
    }
    this.checkIfCanSubmit();
  }

  render() {
    return (
      <Fragment>
        <EuiSpacer/>
        <EuiFlexGroup direction="rowReverse">
          <EuiFlexItem grow={false} style={{paddingRight: 30}}>
            <EuiButton 
              fill 
              isDisabled={this.state.submitButtonDisabled}
              isLoading={this.state.submitButtonIsLoading}
              onClick={this.submitJob}
            > 
              Submit Job
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup style={{paddingLeft:30}}>
          <EuiFlexItem>
            <EuiForm>
              <EuiFormRow
                label="Job name" 
                error={this.state.invalidFields.jobName.errorMsg}
                isInvalid={this.state.invalidFields.jobName.status}
              >
                <EuiFieldText 
                  value={this.state.jobName}
                  onChange={this.onChangeJobName}
                  isInvalid={this.state.invalidFields.jobName.status}
                />
              </EuiFormRow>
            </EuiForm>
          </EuiFlexItem>
        </EuiFlexGroup>
        
        
      </Fragment>
    );
  }
}