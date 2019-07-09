

import { uiModules } from 'ui/modules';

import { ListJobsController } from './list_jobs';
import { CreateJobController } from './create_job';
import {CreateJobSettingsController} from './create_job_settings';
import { CreateJobMappingsController } from './create_job_mappings';
import { FeedbackController } from './feedback';
import { FeedbackNextController } from './feedback_next';
import { HomepageController } from './homepage';

const app = uiModules.get('apps/arcanna', []);

app
  .controller('listJobsController', ListJobsController)
  .controller('createJobController', CreateJobController)
  .controller('createJobMappingsController', CreateJobMappingsController)
  .controller('createJobSettingsController', CreateJobSettingsController)
  .controller('feedbackController', FeedbackController)
  .controller('feedbackNextController', FeedbackNextController)
  .controller('homepageController', HomepageController);