import exampleRoute from './server/routes/backend';
import { resolve } from 'path';
import { existsSync } from 'fs';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch', 'kibana'],
    name: 'arcanna',
    uiExports: {
      app: {
        title: 'Arcanna',
        description: 'An awesome Kibana plugin',
        icon: 'plugins/arcanna/img/logo.png',
        main: 'plugins/arcanna/app/home',
      },
      hacks: [],
      styleSheetPaths: [resolve(__dirname, 'public/app.scss'), resolve(__dirname, 'public/app.css')].find(p => existsSync(p)),
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
        endpoint: Joi.object({
          url: Joi.string().default("http://localhost:5000"),
          token: Joi.string().default('1')
        })
      }).default();
    },

    init(server, options) { // eslint-disable-line no-unused-vars
      

      // Add server routes and initialize the plugin here
      // console.log(JSON.stringify(server.config().get()));
      exampleRoute(server);
    }
  });
}
