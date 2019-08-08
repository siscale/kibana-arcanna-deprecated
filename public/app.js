
import { uiModules } from 'ui/modules';

// import { MainController } from './controllers/main';
import chrome from 'ui/chrome';
import 'ui/autoload/styles';
import './less/main.less';
// import { Main } from './components/main';

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

chrome.setRootController('testPlugin', HomepageController);

