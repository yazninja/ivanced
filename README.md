# V2 Plugin
V2 plugins are in early development, but fundamentally should work the same as progress continues.

https://github.com/ciderapp/Cider/wiki/Plugin-Development

Differences from current plugins:
* Currently only supports JavaScript
* Plugin constructors are passed a "PluginEnv" with several helpers
  * `app` - The Electron app
  * `store` - Electron Store
  * `utils` - Cider utils
  * `win` - The renderer window
  * `dir` - Path to the plugin directory
* Plugins must be stored in a folder and contain a `package.json` file, this package.json file uses the same format as node packages so new plugins can be started with `npm init`
* `index.js` is currently the default entry script for backend plugins
* The frontend portion of plugins should be loaded on onRendererReady()
