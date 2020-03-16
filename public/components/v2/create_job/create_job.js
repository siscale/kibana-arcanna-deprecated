import React, {
  Component, Fragment,
} from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  EuiInMemoryTable,
  EuiBasicTable,
  EuiHealth,
  EuiButton,
  EuiForm
} from '@elastic/eui';

import { IndexSelection, MappingSelection, JobSettings } from './job_stages';


export class CreateJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndexList: [],
      indexFieldMappings: {}
    };

    this.pageFlow = {
      indexSelection: {
        nextPage: `${this.props.match.path}/select_mappings`,
        previousPage: ''
      },
      mappingSelection: {
        nextPage: `${this.props.match.path}/job_settings`,
        previousPage: `${this.props.match.path}`
      },
      jobSettings: {
        nextPage: '',
        previousPage: `${this.props.match.path}/select_mappings`
      }
      
    }
  }


  updateIndexList = (newList) => {
    this.setState({selectedIndexList: newList})
  }

  updateFieldMappings =(newMapping) => {
    this.setState({indexFieldMappings: newMapping});
  }


  componentDidMount() {
  }


  render() {
    const self = this;
    console.log(self.props);
    const baseUrl = self.props.baseUrl;
    // const creatJobBaseUrl = self.props.location.pathname;
    return (
      <Fragment>
        <h2>Create new ML job</h2>
        <div>
              <Switch>

                <Route exact path={self.props.match.path}  render={(props) => {return (<IndexSelection {...props} {...self.pageFlow.indexSelection} updateIndexList={this.updateIndexList} nextPage={`${self.props.match.path}/select_mappings`}/>); } }/>

                <Route path={`${self.props.match.path}/select_mappings`} render={(props) => {return (<MappingSelection {...props} {...self.pageFlow.mappingSelection} selectedIndexList={self.state.selectedIndexList} updateFieldMappings={this.updateFieldMappings}/>)}} />

                <Route path={`${self.props.match.path}/job_settings`} render={(props) => {return (<JobSettings {...props} {...self.pageFlow.jobSettings} indexFieldMappings={self.state.indexFieldMappings} />)}} />

              </Switch>
        </div>
      </Fragment>
    );
  }
}