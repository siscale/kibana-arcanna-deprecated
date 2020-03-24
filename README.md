# The ARCANNA Kibana Plugin

![Arcanna](./docs/resources/readme_banner.png)

Arcanna - **A**utomated **R**oot **C**ause **A**nalysis **N**eural **N**etwork **A**ssisted - is a custom built Elastic plugin capable of identifying with increased accuracy the probable root cause of issues that arise within the entire infrastructure stack. For a more in-depth description of the product, please visit [our website](https://www.siscale.com/arcanna/) and our blog postings ([#1](https://www.siscale.com/arcanna-explained-part-i-event-clustering/), [#2](https://www.siscale.com/arcanna-explained-part-ii-probable-root-cause-determination/), [#3](https://www.siscale.com/arcanna-explained-part-iii-user-feedback/)).

This repository represents the Kibana plugin (UI) of the solution.

In order to use the solution, you also need to setup the solution backend, which can be found [here](https://github.com/siscale/arcanna).

---

## Installation

In order to install the Arcanna Kibana Plugin, first download the appropriate release for your Kibana version from the [releases tab](https://github.com/siscale/kibana-arcanna/releases).

To install the plugin in Kibana, run the following command:
```
bin/kibana-plugin install file:///PATH_TO_FILE/arcanna-vXXXXX.zip
```
Wait until the installation finishes. It may take several minutes to optimize and cache browser bundles.

In `kibana.yml`, add the [Arcanna backend](https://github.com/siscale/arcanna) settings:
```
arcanna.endpoint.url: "http://ARCANNA_BACKEND_HOST:5000"
arcanna.endpoint.token: "ARCANNA_BACKEND_AUTH_TOKEN"
```

Restart Kibana to apply the changes.

You are now ready to use the Arcanna plugin.

## Development



### Kibana setup
Check the [kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md#setting-up-your-development-environment) for initial setup steps.

#### Extra steps

Once Kibana is setup, find the last commit for the required Kibana version. Check the plugin `package.json` to get the exact kibana version. You can use the [tags](https://github.com/elastic/kibana/tags) to find the proper commit.

```
git checkout <commit-sha1>
yarn kbn bootstrap
```

You can add a [kibana dev config](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md#customizing-configkibanadevyml) file to kibana to avoid involuntary deletion.

The plugin currently uses the deprecated kibana dev folder structure:
```
.
+-- kibana
+-- kibana-extra
|   +-- kibana-arcanna
```



When in the plugin folder, the following commands are available:

  - `yarn kbn bootstrap`

    Install dependencies and crosslink Kibana and all projects/plugins.

    > ***IMPORTANT:*** Use this script to install dependencies when switching branches, and re-run it whenever your dependencies change.

  - `yarn start`

    Start kibana and have it include this plugin. You can pass any arguments that you would normally send to `bin/kibana`

      ```
      yarn start --elasticsearch.url http://localhost:9220
      ```
    In order to use the dev kibana config use the script with the `--dev` flag:
    ```
    yarn start --dev
    ```

  - `yarn build`

    Build a distributable archive of your plugin.

  - `yarn test:browser`

    Run the browser tests in a real web browser.

  - `yarn test:server`

    Run the server tests using mocha.

For more information about any of these commands run `yarn ${task} --help`. For a full list of tasks checkout the `package.json` file, or run `yarn run`.
