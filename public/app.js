import React from 'react';
import { uiModules } from 'ui/modules';
import chrome from 'ui/chrome';
import 'ui/autoload/styles';
import './less/main.less';
import { ArcannaRouter } from './components/v2/router';
import {EuiPage} from '@elastic/eui';

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

  const template = (
    <EuiPage>
      <h1>Test</h1>
      <ArcannaRouter></ArcannaRouter>
    </EuiPage>
  )

  // render react to DOM
  render(<Main httpClient={$http} />, domNode);

  // unmount react on controller destroy
  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });
}

chrome.setRootController('homepage', RootController);

// import './components/index';
// import './services/factories';
// import './controllers/index';
// import './services/routes';

// setTimeout(() => { window.location.href = '#/'; }, 1000)


// import { HomepageController } from './controllers/homepage'
// import homepageTemplate from './templates/homepage.html';
// // chrome.setRootController('homepageController', HomepageController);
// // chrome.setRootTemplate(homepageTemplate);
