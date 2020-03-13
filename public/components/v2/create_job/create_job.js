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
    const baseUrl = self.props.baseUrl + self.props.location.pathname;
    return (
      <Fragment>
        <h2>Create new ML job</h2>
        <div>
          <CreateJobContext.Provider value={self.contextStore}>
            <BrowserRouter basename={baseUrl}>
              <Switch>
                <Route exact path="/"  render={(props) => {return (<IndexSelection {...props} updateIndexList={this.updateIndexList} />); } }/>
                <Route path="/select-mappings" render={(props) => {return (<MappingSelection {...props} selectedIndexList={self.selectedIndexList}/>)}} />
                {/* <Route render={() => {console.log(this.props);return (<h2>something</h2>)}}/> */}
              </Switch>
            </BrowserRouter>
          </CreateJobContext.Provider>
        </div>
      </Fragment>
    );
  }
}