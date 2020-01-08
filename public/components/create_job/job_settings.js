
import React, { Fragment } from 'react';

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
  EuiSuperSelect,
  EuiFieldText,
  EuiFilePicker
} from '@elastic/eui';

import { MappingField } from './mapping_field';

export class JobSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jobName: "",
      jobType: 'rca',
      invalidFields: {
        jobName: {
          status: true,
          errorMsg: (<span>The name should be composed of alphanumerical characters, '_' or '-'.</span>
          )
        },
        jobType: {
          status: false,
          errorMsg: (<span></span>)
        },
        modelUpload: {
          status: false,
          errorMsg: (<span>The model should be an .zip archive with the size of maximum 2MB.</span>)
        }
      },
      submitButtonDisabled: true,
      submitButtonIsLoading: false,
      files: {}
    };

    this.jobTypeOptions = [
      {
        value: 'rca',
        inputDisplay: 'Root Cause Analysis',
        dropdownDisplay: (
          <Fragment>
            <strong>Root Cause Analysis</strong>
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">
                Given a batch of potentially related events, allows you to select the root cause and symptoms, in order to train an NN for automated RCA.
              </p>
            </EuiText>
          </Fragment>
        ),
      },
      {
        value: 'binary',
        inputDisplay: 'Binary Classification',
        dropdownDisplay: (
          <Fragment>
            <strong>Binary</strong>
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">
                Allows you to give feedback to a NN in order to train it to do binary classification in your data.
              </p>
            </EuiText>
          </Fragment>
        ),
      }
    ];

    this.genericRequest = new GenericRequest();
  }

  static propTypes = {
    indexFieldMappings: PropTypes.object
  }

  componentDidMount() {

    if (Object.keys(this.props.indexFieldMappings).length === 0) {
      window.location.href = '#/create_job_mappings';
      return;
    }
  }

  checkIfCanSubmit() {
    const self = this;
    let canSubmit = true;
    Object.keys(this.state.invalidFields).forEach((fieldName) => {
      if (self.state.invalidFields[fieldName].status === true) {
        canSubmit = false;
      }
    })
    if (canSubmit === true) {
      this.setState({ submitButtonDisabled: false })
    } else {
      this.setState({ submitButtonDisabled: true })
    }
  }

  submitJob = async () => {
    this.setState({ submitButtonIsLoading: true });
    // var base64File = ""

    // try {
    //   if(this.state.files.length != 0) {
    //     var file = this.state.files[0];
    //     console.log("File size: " + file.size);
    //     console.log("File type: " + file.type);
    //     var fileContent = await file.arrayBuffer();
    //   }
    // } catch(error) {
    //   console.error(error);
    // }
    var body = {
      jobName: this.state.jobName,
      indexData: this.props.indexFieldMappings
      // model: fileContent
    };

    const resp = await this.genericRequest.request('put_job', 'POST', JSON.stringify(body));
    if ('error' in resp) {
      console.error(resp.error);
      this.setState({ submitButtonIsLoading: false });
    } else {
      window.location.href = '#/list_jobs';
    }
  }

  onChangeJobName = e => {
    this.setState({ jobName: e.target.value });
    let re = new RegExp('^[-a-zA-Z0-9_]+$');
    if (re.test(e.target.value)) {
      this.state.invalidFields.jobName.status = false;
    } else {
      this.state.invalidFields.jobName.status = true;
    }
    this.checkIfCanSubmit();
  }

  onChangeJobType = value => {
    this.setState({ jobType: value });
  }

  onChangeFileUpload = files => {
    let fileIsOk = true;
    this.setState({
      files: files
    });
    if (files.length > 0) {
      var file = files[0];
      if (file.size > 2000000) {
        fileIsOk = false;
      } else if (file.type != "application/x-zip-compressed") {
        fileIsOk = false;
      }
    }
    if (fileIsOk === true) {
      this.state.invalidFields.modelUpload.status = false;
    } else {
      this.state.invalidFields.modelUpload.status = true;
    }
    this.setState({
      files: files
    });
    this.checkIfCanSubmit();
  }

  render() {
    return (
      <Fragment>
        <EuiSpacer />
        <EuiFlexGroup direction="rowReverse">
          <EuiFlexItem grow={false} style={{ paddingRight: 30 }}>
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
        <EuiFlexGroup style={{ paddingLeft: 30 }}>
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
              <EuiFormRow
                label="Job type"
                error={this.state.invalidFields.jobType.errorMsg}
                isInvalid={this.state.invalidFields.jobType.status}
              >
                <EuiSuperSelect
                  options={this.jobTypeOptions}
                  valueOfSelected={this.state.jobType}
                  onChange={this.onChangeJobType}
                  hasDividers
                  itemLayoutAlign="top"
                />
              </EuiFormRow>
              <EuiFormRow
                label="[Optional] Upload your own TensorFlow model"
                isInvalid={this.state.invalidFields.modelUpload.status}
                error={this.state.invalidFields.modelUpload.errorMsg}
              >
                <EuiFilePicker
                  initialPromptText="Select or drag your TensorFlow model."
                  onChange={files => {
                    this.onChangeFileUpload(files);
                  }}
                  display="large"
                />
              </EuiFormRow>
            </EuiForm>
          </EuiFlexItem>
        </EuiFlexGroup>
      </Fragment>
    );
  }
}