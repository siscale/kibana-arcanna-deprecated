import exampleRoute from './server/routes/backend';
import { resolve } from 'path';
import { existsSync } from 'fs';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'arcanna',
    uiExports: {
      app: {
        title: 'Arcanna',
        description: 'An awesome Kibana plugin',
        icon: 'plugins/arcanna/img/logo.png',
        main: 'plugins/arcanna/app',
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
      const xpackMainPlugin = server.plugins.xpack_main;
      if (xpackMainPlugin) {
        const featureId = 'arcanna';

        xpackMainPlugin.registerFeature({
          id: featureId,
          name: i18n.translate('arcanna.featureRegistry.featureName', {
            defaultMessage: 'arcanna',
          }),
          navLinkId: featureId,
          icon: 'questionInCircle',
          app: [featureId, 'kibana'],
          catalogue: [],
          privileges: {
            all: {
              api: [],
              savedObject: {
                all: [],
                read: [],
              },
              ui: ['show'],
            },
            read: {
              api: [],
              savedObject: {
                all: [],
                read: [],
              },
              ui: ['show'],
            },
          },
        });
      }

      // Add server routes and initialize the plugin here
      // console.log(JSON.stringify(server.config().get()));
      exampleRoute(server);
    }
  });
}
