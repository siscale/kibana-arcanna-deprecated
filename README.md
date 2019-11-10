# The ARCANNA Kibana Plugin

<div style="text-align:center"><img src="./docs/resources/readme_banner.png" /></div>

Arcanna - **A**utomated **R**oot **C**ause **A**nalysis **N**eural **N**etwork **A**ssisted - is a custom built Elastic plugin capable of identifying with increased accuracy the probable root cause of issues that arise within the entire infrastructure stack. For a more in-depth description of the product, please visit [our website](https://www.siscale.com/arcanna/) and our blog postings ([#1](https://www.siscale.com/arcanna-explained-part-i-event-clustering/), [#2](https://www.siscale.com/arcanna-explained-part-ii-probable-root-cause-determination/), [#3](https://www.siscale.com/arcanna-explained-part-iii-user-feedback/)).

This repository represents the Kibana plugin (UI) of the solution.

In order to use the solution, you also need use the solution backend, which can be found [here](https://github.com/siscale/arcanna).

---

## Installation

In order to install the Arcanna Kibana Plugin, first download the appropriate release for your Kibana version from the [releases tab](https://github.com/siscale/kibana-arcanna/releases).



## development

See the [kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. Once you have completed that, use the following yarn scripts.

  - `yarn kbn bootstrap`

    Install dependencies and crosslink Kibana and all projects/plugins.

    > ***IMPORTANT:*** Use this script instead of `yarn` to install dependencies when switching branches, and re-run it whenever your dependencies change.

  - `yarn start`

    Start kibana and have it include this plugin. You can pass any arguments that you would normally send to `bin/kibana`

      ```
      yarn start --elasticsearch.url http://localhost:9220
      ```

  - `yarn build`

    Build a distributable archive of your plugin.

  - `yarn test:browser`

    Run the browser tests in a real web browser.

  - `yarn test:server`

    Run the server tests using mocha.

For more information about any of these commands run `yarn ${task} --help`. For a full list of tasks checkout the `package.json` file, or run `yarn run`.
