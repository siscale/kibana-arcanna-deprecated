import React from 'react';
import { uiModules } from 'ui/modules';
import chrome from 'ui/chrome';
import 'ui/autoload/styles';
import './less/main.less';
import {Il8nProvider} from '@kbn/i18n/react';

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


// import './services/routes';
// import './services/factories';

// import './controllers/index';

// import './components/index';

// import { HomepageController } from './controllers/homepage'
import { HomepageComponent } from './components/homepage/homepage'
import { Main } from './components/test/test'

function RootController($scope, $element, $http) {
  const domNode = $element[0];
  render(
    <Il8nProvider>
      <h1>???????????</h1>
    
    </Il8nProvider>,
    domNode
  ),
  // unmount react on controller destroy
  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });

}


chrome.setRootController('testPlugin', RootController);

