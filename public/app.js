
import { uiModules } from 'ui/modules';

// import { MainController } from './controllers/main';
import chrome from 'ui/chrome';
import 'ui/autoload/styles';
import './less/main.less';
// import { Main } from './components/main';
import {Il8nProvider} from '@kbn/i18n/react';
import { BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

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

import { HomepageController } from './controllers/homepage'


function RootController($scope, $element, $http) {
  const domNode = $element[0];
  render(
    <Il8nProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomepageController}></Route>
        </Switch>
      </BrowserRouter>
    </Il8nProvider>,
    domNode
  ),
  // unmount react on controller destroy
  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });
}


chrome.setRootController('testPlugin', RootController);

