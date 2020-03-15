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

import { IndexSelection } from './job_stages';
import { MappingSelection } from './job_stages';

export const CreateJobContext = React.createContext();

export class CreateJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndexList: []
    };
  }


  updateIndexList = (newList) => {
    this.setState({selectedIndexList: newList})
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
                <Route exact path={self.props.match.path}  render={(props) => {return (<IndexSelection {...props} updateIndexList={this.updateIndexList} />); } }/>
                {/* <Route exact path={creatJobBaseUrl + "/"}  render={(props) => {return (<IndexSelection {...props} updateIndexList={this.updateIndexList} />); } }/> */}
                <Route path={`${self.props.match.path}/select_mappings`} render={(props) => {return (<MappingSelection {...props} selectedIndexList={self.state.selectedIndexList}/>)}} />
              </Switch>
        </div>
      </Fragment>
    );
  }
}