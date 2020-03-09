import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { uiModules } from 'ui/modules';
import chrome from 'ui/chrome';
import 'ui/autoload/styles';
import './less/main.less';
import { Main } from './components/v2/main';

// import {Il8nProvider} from '@kbn/i18n/react';
// import {} from '@kbn/i18n/react'

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


function RootController($scope, $element, $http) {
  const domNode = $element[0];

  window.location.href ="/";

  const baseUrl = window.location.pathname;
  // render react to DOM
  render(<Main title="Arcanna" httpClient={$http} baseUrl={baseUrl} />, domNode);

  // unmount react on controller destroy
  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });
}

chrome.setRootController('analyzeApiUiController', RootController);

// import './components/index';
// import './services/factories';
// import './controllers/index';
// import './services/routes';

// setTimeout(() => { window.location.href = '#/'; }, 1000)


// import { HomepageController } from './controllers/homepage'
// import homepageTemplate from './templates/homepage.html';
// // chrome.setRootController('homepageController', HomepageController);
// // chrome.setRootTemplate(homepageTemplate);
