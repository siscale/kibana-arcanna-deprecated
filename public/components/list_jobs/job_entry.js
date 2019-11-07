
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import moment from 'moment';

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
  EuiFlexItem,
  EuiFlexGrid,
  EuiButton,
  EuiIcon,
  EuiLink,
  EuiBadge,
  EuiConfirmModal,
  EuiOverlayMask
} from '@elastic/eui';

// import trainSvg from '../../img/train.svg';


export class JobEntry extends React.Component {

  constructor(props) {
    super(props);

    this.buttonStatuses = {
      train: {
        enabled: {
          color: "warning",
          disabled: false
        },
        disabled: {
          color: 'subdued',
          disabled: true
        }
      },
      evaluate: {
        enabled: {
          color: "secondary",
          disabled: false
        }, 
        disabled: {
          color: 'subdued',
          disabled: true
        }
      },
      feedback: {
        enabled: {
          color: "text",
          disabled: false
        },
        disabled: {
          color: "subdued",
          disabled: true
        }
      },
      stop: {
        disabled: {
          color: "subdued",
          disabled: true,
          type: "stopFilled"
        },
        enabled: {
          color: "danger",
          disabled:false,
          type: "stopFilled"
        },
        resume: {
          color: "secondary",
          disabled: false,
          type: "play"
        }
      },
      delete: {
        enabled: {
          color: "default",
          disabled: false
        },
        disabled: {
          color: "subdued",
          disabled: true
        }
      }
    };

    this.state = {
      id: '',
      jobName: '',
      createdAt: '',
      jobStatus: '',
      trainingStatus: {
        color: 'default',
        displayName: '',
        disabled: false
      },
      trainAction: this.buttonStatuses.train.disabled,
      evaluateAction: this.buttonStatuses.evaluate.disabled,
      feedbackAction: this.buttonStatuses.feedback.disabled,
      stopAction: this.buttonStatuses.stop.disabled,
      deleteAction: this.buttonStatuses.delete.enabled,
      isDeleteModalVisible: false
    };
    this.genericRequest = new GenericRequest();
    
    this.setStatusMappings();

    // this.trainingStatus = [
    //   "Up-to-date",
    //   "Outdated",
    //   "Not yet performed"
    // ];
    // this.jobStatus = [
    //   "Not started",
    //   "Evaluating",
    //   "Training",
    //   "Paused",
    //   "Idle"
    // ];
  }

  setStatusMappings =() => {
    this.trainingStatusMapping = {
      UP_TO_DATE: {
        id: "UP_TO_DATE",
        displayName: 'Up-to-date',
        color: '#490'
      },
      OUTDATED: {
        id: "OUTDATED",
        displayName: 'Outdated',
        color: 'warning'
      },
      NOT_YET_PERFORMED: {
        id: "NOT_YET_PERFORMED",
        displayName: 'Not yet performed',
        color: 'default'
      },
      UNKNOWN: {
        id: "UNKNOWN",
        displayName: "UNKNOWN",
        color: 'danger'
      }
    }
    this.jobStatusMapping = {
      NOT_STARTED: {
        id: "NOT_STARTED",
        displayName: "Not started",
        color: 'default'
      },
      EVALUATING: {
        id: "EVALUATING",
        displayName: "Running",
        color: 'secondary'
      }, 
      TRAINING: {
        id: "TRAINING",
        displayName: "Training",
        color: 'primary'
      }, 
      // PAUSED: {
      //   id: "PAUSED",
      //   displayName: "Paused",
      //   color: 'accent'
      // }, 
      IDLE: {
        id: "IDLE",
        displayName: "Idle",
        color: 'hollow'
      },
      UNKNOWN: {
        id: "UNKNOWN",
        displayName: "Unknown",
        color: 'danger'
      }
    }
  }

  getTrainingStatusMapping(status) {
    if(status in this.trainingStatusMapping) {
      return this.trainingStatusMapping[status];
    } else {
      return this.trainingStatusMapping.UNKNOWN;
    }
  }
  getJobStatusMapping(status) {
    if(status in this.jobStatusMapping) {
      return this.jobStatusMapping[status];
    } else {
      return this.jobStatusMapping.UNKNOWN;
    }
  }

  static propTypes = {
    jobData: PropTypes.object,
    feedbackFunction: PropTypes.func,
    trainFunction: PropTypes.func,
    evaluateFunction: PropTypes.func,
    stopFunction: PropTypes.func,
    deleteFunction: PropTypes.func
  }

  componentDidMount() {
    // console.log(this.trainingStatusMapping); 
    const self = this;
    // console.log("I'm here");
    this.setState({
      id: this.props.jobData._id,
      jobName: self.props.jobData.jobName,
      createdAt: moment(Number(self.props.jobData.createdAt)).toISOString(),
      jobStatus: self.getJobStatusMapping(self.props.jobData.jobStatus),
      trainingStatus: self.getTrainingStatusMapping(self.props.jobData.trainingStatus)
    });
    // console.log(this.getTrainingStatusMapping(self.props.jobData.trainingStatus));
    this.setActionsStatus(self.getTrainingStatusMapping(self.props.jobData.trainingStatus), self.getJobStatusMapping(self.props.jobData.jobStatus)); 
  }

  componentWillReceiveProps(nextProps) {
    let shouldRefresh = false;
    Object.keys(nextProps).forEach((propKey) => {
      if(nextProps[propKey] !== this.props[propKey]) {
        shouldRefresh = true;
      }
    });
    if(shouldRefresh === true) {
      this.setState({
        id: nextProps.jobData._id,
        jobName: nextProps.jobData.jobName,
        createdAt: moment(Number(nextProps.jobData.createdAt)).toISOString(),
        jobStatus: this.getJobStatusMapping(nextProps.jobData.jobStatus),
        trainingStatus: this.getTrainingStatusMapping(nextProps.jobData.trainingStatus)
      });
      
      this.setActionsStatus(this.getTrainingStatusMapping(nextProps.jobData.trainingStatus),  this.getJobStatusMapping(nextProps.jobData.jobStatus));
    }
  }

  setActionsStatus = (trainingStatus, jobStatus) => {
    // const trainingStatus = this.trainingStatusMapping[this.props.jobData.trainingStatus];
    // const jobStatus = this.jobStatusMapping[this.props.jobData.jobStatus];
    this.setTrainButtonStatus(trainingStatus, jobStatus);
    this.setEvaluateButtonStatus(trainingStatus, jobStatus);
    this.setFeedbackButtonStatus(trainingStatus, jobStatus);
    this.setStopButtonStatus(trainingStatus, jobStatus);
    this.setDeleteButtonStatus(trainingStatus, jobStatus);
  }

  setTrainButtonStatus(trainingStatus, jobStatus) {
    if(['OUTDATED', 'NOT_YET_PERFORMED'].indexOf(trainingStatus.id) && jobStatus.id === 'IDLE') {
      this.setState({trainAction: this.buttonStatuses.train.enabled});
    } else {
      this.setState({trainAction: this.buttonStatuses.train.disabled});
    }
  }

  setEvaluateButtonStatus (trainingStatus, jobStatus) {
    if((['OUTDATED', 'UP_TO_DATE', 'NOT_YET_PERFORMED'].indexOf(trainingStatus.id) >= 0 && jobStatus.id === 'IDLE') || (jobStatus.id === 'NOT_STARTED' && trainingStatus.id !== 'UNKNOWN')) {
      this.setState({evaluateAction: this.buttonStatuses.evaluate.enabled});
    } else {
      this.setState({evaluateAction: this.buttonStatuses.evaluate.disabled});
    }
  }

  setFeedbackButtonStatus (trainingStatus, jobStatus) {
    // if(['NOT_YET_PERFORMED', 'OUTDATED'].indexOf(trainingStatus.id) >= 0 && jobStatus.id ==='IDLE') {
    this.setState({feedbackAction: this.buttonStatuses.feedback.enabled})
    // } else {
    //   this.setState({feedbackAction: this.buttonStatuses.feedback.disabled})
    // }
  }

  setStopButtonStatus (trainingStatus, jobStatus) {
    if(['EVALUATING', 'TRAINING'].indexOf(jobStatus.id) >= 0 && trainingStatus.id !== 'UNKNOWN') {
      this.setState({stopAction: this.buttonStatuses.stop.enabled})
    } 
    // else if(jobStatus.id ==='PAUSED') {
    //   this.setState({stopAction: this.buttonStatuses.stop.resume})
    // }p
    else {
      this.setState({stopAction: this.buttonStatuses.stop.disabled})
    }
  }

  setDeleteButtonStatus (trainingStatus, jobStatus) {
    if(['EVALUATING', 'TRAINING'].indexOf(jobStatus.id) >= 0 && trainingStatus.id !== 'UNKNOWN') {
      this.setState({deleteAction: this.buttonStatuses.delete.disabled})
    }
    else {
      this.setState({deleteAction: this.buttonStatuses.delete.enabled})
    }
  }

  onClickFeedback = () => {
    this.setState({feedbackAction: this.buttonStatuses.feedback.disabled})
    this.props.feedbackFunction(this.state.id);
  }

  onClickTrain = () => {
    this.setState({trainAction: this.buttonStatuses.train.disabled})
    this.props.trainFunction(this.state.id);
  }

  onClickEvaluate = () => {
    this.setState({evaluateAction: this.buttonStatuses.evaluate.disabled})
    this.props.evaluateFunction(this.state.id);
  }

  onClickStop = () => {
    this.setState({stopAction: this.buttonStatuses.stop.disabled})
    this.props.stopFunction(this.state.id);
  }

  showDeleteModal = () => {
    this.setState({isDeleteModalVisible: true});
  }

  deleteModalCancel = () => {
    this.setState({isDeleteModalVisible: false});
  }

  deleteModalConfirm = () => {
    this.setState({isDeleteModalVisible: false});
    this.setState({feedbackAction: this.buttonStatuses.feedback.disabled})
    this.setState({trainAction: this.buttonStatuses.train.disabled})
    this.setState({evaluateAction: this.buttonStatuses.evaluate.disabled})
    this.setState({stopAction: this.buttonStatuses.stop.disabled})
    this.setState({deleteAction: this.buttonStatuses.delete.disabled})
    this.props.deleteFunction(this.state.id);
  }

  render() {
    let deleteModal;
    let modalTitle = 'Are you sure you want to delete job "' + this.state.jobName + '"?';
    if(this.state.isDeleteModalVisible) {
      deleteModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title={modalTitle}
            onCancel={this.deleteModalCancel}
            onConfirm={this.deleteModalConfirm}
            cancelButtonText="Cancel"
            confirmButtonText="Delete"
            buttonColor="danger"
            defaultFocusedButton="confirm">
          </EuiConfirmModal>
        </EuiOverlayMask>
      )
    }
    return (
      <EuiTableRow>
          <EuiTableRowCell>
            {this.state.jobName}
          </EuiTableRowCell>
          <EuiTableRowCell>
            {this.state.createdAt}
          </EuiTableRowCell>
          <EuiTableRowCell align="center">
            <EuiBadge color={this.state.jobStatus.color}>
              {this.state.jobStatus.displayName}
            </EuiBadge>
          </EuiTableRowCell>
          <EuiTableRowCell align="center">
            <EuiBadge color={this.state.trainingStatus.color}>
              {this.state.trainingStatus.displayName}
            </EuiBadge>
          </EuiTableRowCell>
          <EuiTableRowCell align="right">
            <EuiFlexGroup>
              <EuiFlexGrid gutterSize="s" columns={5} style={{paddingRight: 10, paddingTop:10, paddingBottom:10}}>
                <EuiFlexItem>
                  <EuiLink disabled={this.state.trainAction.disabled} title="Train" onClick={this.onClickTrain}>
                    <EuiIcon type="string" size="l" color={this.state.trainAction.color}/>
                  </EuiLink>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiLink disabled={this.state.evaluateAction.disabled} title="Start" onClick={this.onClickEvaluate}>
                    <EuiIcon type="play" size="l" color={this.state.evaluateAction.color}/>
                  </EuiLink>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiLink disabled={this.state.feedbackAction.disabled} title="Feedback" onClick={this.onClickFeedback}>
                    <EuiIcon type="indexEdit" size="l" color={this.state.feedbackAction.color} />
                  </EuiLink>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiLink disabled={this.state.stopAction.disabled} title="Pause job" onClick={this.onClickStop}>
                    <EuiIcon type={this.state.stopAction.type} size="l" color={this.state.stopAction.color}/>
                  </EuiLink>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiLink disabled={this.state.deleteAction.disabled} title="Delete Job" onClick={this.showDeleteModal}>
                    <EuiIcon type="trash" size="l" color={this.state.deleteAction.color}/>
                  </EuiLink>
                </EuiFlexItem>
              </EuiFlexGrid>
            </EuiFlexGroup>
            {deleteModal}
          </EuiTableRowCell>
        </EuiTableRow>
    );
  }
}