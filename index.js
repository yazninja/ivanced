const path = require("path")

module.exports = class iVancedPlugin {
    constructor(env) {
        // Define plugin enviornment within the class
        this.env = env
    }

    // Called when the backend is ready
    onReady(win) {

    }

    // Called when the renderer is ready (app.init())
    onRendererReady(win) {
        this.env.utils.loadJSFrontend(path.join(this.env.dir, "index.frontend.js"))
        this.env.utils.loadJSFrontend(path.join(this.env.dir, "ivanced-vue.js"))
    }
}
