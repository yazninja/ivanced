const path = require("path")

module.exports = class iVancedPlugin {
    constructor(env) {
        // Define plugin enviornment within the class
        this.env = env
    }

    // Called when the backend is ready
    onReady(win) {
        // Add a try catch block to prevent errors
        try {
            let theme = CiderCahche.get('theme-settings');
            if (theme) {
                this.debug("Theme settings found in cache")
            }
        }
        catch (e) {
            this.debug("Theme settings not found in cache", e)
        }

    }

    // Called when the renderer is ready (app.init())
    onRendererReady(win) {
        this.env.utils.loadJSFrontend(path.join(this.env.dir, "index.frontend.js"))
        this.env.utils.loadJSFrontend(path.join(this.env.dir, "ivanced-vue.js"))
    }
}
