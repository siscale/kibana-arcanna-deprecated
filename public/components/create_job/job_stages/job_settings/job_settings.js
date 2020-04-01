
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import { GenericRequest } from '~services';

import {
  EuiAccordion,
  EuiButton,
  EuiFieldText,
  EuiFilePicker,
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiHorizontalRule,
  EuiPanel,
  EuiSpacer,
  EuiSuperSelect,
  EuiText,
  EuiButtonGroup
} from '@elastic/eui';


export class JobSettings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      jobName: "",
      chosenJobType: 'rca',
      classCount: 0,
      classLabels: [],
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
        },
        classLabels: {
          status: [],
          errorMsg: (<span>The class label should be composed of alphanumerical characters or '_'.</span>)
        }
      },
      toggleButtons: [
          {
            id: "0",
            label: "No"
          },
          {
            id: "1",
            label: "Yes"
          }
      ],
      submitButtonDisabled: true,
      submitButtonIsLoading: false,
      files: {}
    };

    this.jobTypeProperties = {
      rca: {
        classCount: 0,
        status: []
      },
      binary: {
        classCount: 2,
        defaultClassLabels: [
          "class1",
          "class2"
        ],
        status: [false, false]
      }
    }
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
            <strong>Binary Classification</strong>
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">
                Allows you to give feedback to a NN in order to train it for binary classification on your data.
              </p>
            </EuiText>
          </Fragment>
        ),
      }
    ];

    this.genericRequest = new GenericRequest();
  }

  static propTypes = {
    indexFieldMappings: PropTypes.object.isRequired,
    nextPage: PropTypes.string,
    previousPage: PropTypes.string
  }

  componentDidMount() {

    if (Object.keys(this.props.indexFieldMappings).length === 0) {
      this.props.history.push(this.props.previousPage);
    }
  }

  checkIfCanSubmit() {
    const self = this;
    let canSubmit = true;
    Object.keys(this.state.invalidFields).forEach((fieldName) => {
      if (self.state.invalidFields[fieldName].status === true) {
        canSubmit = false;
      } else {
        if(Array.isArray(self.state.invalidFields[fieldName].status)) {
          for(var i=0; i < self.state.invalidFields[fieldName].status.length; ++i) {
            if(self.state.invalidFields[fieldName].status[i] === true) {
              canSubmit = false;
              break;
            }
          }
        }
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
      jobType: this.state.chosenJobType,
      classLabels: this.state.classLabels,
      indexData: this.props.indexFieldMappings,
      resultsInNewIndex: this.createNewIndex
      // model: fileContent
    };

    const resp = await this.genericRequest.request('put_job', 'POST', JSON.stringify(body));
    if ('error' in resp) {
      console.error(resp.error);
      this.setState({ submitButtonIsLoading: false });
    } else {
      // window.location.href = '#/list_jobs';
      // Go back to job list
      this.props.history.push(this.props.nextPage);
    }
  }

  onChangeJobName = e => {
    this.setState({ jobName: e.target.value });
    let re = new RegExp('^[a-zA-Z0-9]+[-a-zA-Z0-9_]*$');
    if (re.test(e.target.value)) {
      this.state.invalidFields.jobName.status = false;
    } else {
      this.state.invalidFields.jobName.status = true;
    }
    this.checkIfCanSubmit();
  }

  onChangeJobType = value => {

    var count = this.jobTypeProperties[value].classCount;
    var invalidLabelStatuses = [];
    var defaultLabels = [];
    for(var i=1; i <= count; ++i) {
      defaultLabels.push("class" + i);
    }
    if(count > 0) {
      invalidLabelStatuses= Array(count).fill(false);
    }
    this.setState({ 
      chosenJobType: value, 
      classCount: count,
      classLabels: defaultLabels
    });
    this.state.invalidFields.classLabels.status = invalidLabelStatuses;
    this.checkIfCanSubmit();
  }

  onChangeClassLabel = (e,i) => {
    var classLabels = this.state.classLabels;
    classLabels[i] = e.target.value;
    this.setState({classLabels: classLabels});
    let re = new RegExp('^[a-zA-Z0-9]+[a-zA-Z0-9_]*$');
    if (re.test(e.target.value)) {
      this.state.invalidFields.classLabels.status[i] = false;
    } else {
      this.state.invalidFields.classLabels.status[i] = true;
    }
    this.checkIfCanSubmit();
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

  /*
  crateNewIndex(id) {
      console.log(id);
  }
  */

  createNewIndex = id => {
    this.setState({
      resultsInNewIndex: id
    });
    console.log(id);
  }

  renderClassLabelingForm() {
    const self = this;
    const classLabels = [];

    self.state.classLabels.forEach((value, labelId) => {
      classLabels.push(
        <EuiFormRow
          label={"Class " + (labelId + 1)}
          error={this.state.invalidFields.classLabels.errorMsg}
          isInvalid={this.state.invalidFields.classLabels.status[labelId]}
        >
          <EuiFieldText
            value={this.state.classLabels[labelId]}
            onChange={e => {self.onChangeClassLabel(e, labelId)}}
            isInvalid={this.state.invalidFields.classLabels.status[labelId]}
          />
        </EuiFormRow>
      );
    });
    return classLabels.length ? classLabels : null;

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
              <EuiFormRow
                label="Job type"
                error={this.state.invalidFields.jobType.errorMsg}
                isInvalid={this.state.invalidFields.jobType.status}
              >
                <EuiSuperSelect
                  options={this.jobTypeOptions}
                  valueOfSelected={this.state.chosenJobType}
                  onChange={this.onChangeJobType}
                  hasDividers
                  itemLayoutAlign="top"
                />
              </EuiFormRow>
              {this.renderClassLabelingForm()}
            </EuiForm>
          </EuiFlexItem>
        </EuiFlexGroup>
       <EuiFlexGroup>
       <EuiFlexItem grow={false} style={{ paddingLeft: 30}}> 
                <p>Do you want to create a separate ARCANNA index for the results?</p>
                <br />
                <EuiButtonGroup color="danger"
                    legend={this.state.toggleButtons.legend}
                    options={this.state.toggleButtons}
                    idSelected={this.state.toggleButtons.id}
                    onChange={this.createNewIndex.bind(this.state.toggleButtons.id)}
                  />
            </EuiFlexItem>
       </EuiFlexGroup>
      </Fragment>
    );
  }
}