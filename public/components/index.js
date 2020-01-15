
import { uiModules } from 'ui/modules';
import { react2angular } from 'react2angular';

import { IndexTable } from './create_job/index_table';
import { IndexMappings } from './create_job/index_mappings';
import { MappingField } from './create_job/mapping_field';
import { JobListHeader } from './list_jobs/job_header';
import { JobList } from './list_jobs/job_list';
import { JobSettings } from './create_job/job_settings';
import { FeedbackBinaryComponent } from './feedback/binary/feedback';
import { FeedbackComponent } from './feedback/feedback';
import { FeedbackNext } from './feedback/feedback_next';
import { HomepageComponent } from './homepage/homepage';

const app = uiModules.get('apps/arcanna');

// app.directive('indexTable', function (reactDirective) {
//   return reactDirective('indexTableVal');
// });


app.component('indexTable', react2angular(IndexTable, [], ['selectedIndexList']));
app.component('indexMappings', react2angular(IndexMappings, [], ['selectedIndexList', 'indexFieldMappings']));
app.component('jobSettings', react2angular(JobSettings, [], ['indexFieldMappings']));
app.component('jobList', react2angular(JobList, [], ['feedbackJobInformation']));
app.component('jobHeader', react2angular(JobListHeader));
app.component('feedbackBinaryComponent', react2angular(FeedbackBinaryComponent, [], ['feedbackJobInformation']))
app.component('feedbackComponent', react2angular(FeedbackComponent, [], ['feedbackJobInformation']));
app.component('feedbackNext', react2angular(FeedbackNext));
app.component('homepageComponent', react2angular(HomepageComponent));

// app.component('mappingField', react2angular(MappingField, ['fieldName', 'indexName']));

// app.controller('indexTableController', function ($scope) {
//   // $scope.a = 'haha';
// });