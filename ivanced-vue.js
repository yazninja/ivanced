// Page

Vue.component('plugin.ivanced-settings', {
    /*html*/
    template: `
        <div class="content-inner">
            <h1> Super Secret Theme Settings </h1>
            <div class="md-option-container">
                <div class="settings-option-body">
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Sample Button
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <button class="md-btn" @click="app.appRoute('apple-account-settings')">
                                Button 1
                            </button>
                        </div>
                    </div>
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Window Icons In the Right
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <input type="checkbox" switch/>
                        </div>
                    </div>
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Use Windowws Stoplight Layout
                            <small>
                                Arrangement of Window control Icons (from left to right)<br>
                                <b>Enabled</b>: Minimize, Maximize, Close<br>
                                <b>Disabled</b>: Close, Minimize, Maximize
                            </small>
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <input type="checkbox" switch/>
                        </div>
                    </div>
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Use Apple Icons
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <input type="checkbox" switch/>
                        </div>
                    </div>
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Lyrics in Fullscreen Mode
                            <small>
                                <b>Hidden</b>: Once Fullscreen is loaded, the lyrics will be hidden, but the lyrics button still remains.<br>
                                <b>Show</b>: The lyrics will be shown in fullscreen mode.
                            </small>
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <select class="md-select" style="width:180px;" >
                                <option value="show">Show</option>
                                <option value="hidden">Hidden</option>
                            </select>
                        </div>
                    </div>
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Force Theme Variant
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <select class="md-select" style="width:180px;" >
                                <option value="none">Use System Theme</option>
                                <option value="light">Force Light Mode</option>
                                <option value="dark">Force Dark Mode</option>
                            </select>
                        </div>
                    </div>
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Navigation Buttons Location
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <select class="md-select" style="width:180px;" >
                                <option value="none">Top Bar</option>
                                <option value="light">Below Top Bar</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {

        }
    },
    async mounted() {

    },
    methods: {
    }
})