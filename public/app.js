import React from 'react';
import { uiModules } from 'ui/modules';
import chrome from 'ui/chrome';
import 'ui/autoload/styles';
import './less/main.less';
import {Il8nProvider} from '@kbn/i18n/react';
import {} from '@kbn/i18n/react'

const app = uiModules.get('apps/arcanna');

app.config($locationProvider => {
  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false,
    rewriteLinks: false,
  });
});
app.config(stateManagementConfigProvider =>
  stateManagementConfigProvider.disable()
);

import './components/index';
import './services/factories';
import './controllers/index';
import './services/routes';

window.location.href = '#/list_jobs';

import { HomepageController } from './controllers/homepage'
import homepageTemplate from './templates/homepage.html';
// chrome.setRootController('homepageController', HomepageController);
// chrome.setRootTemplate(homepageTemplate);
