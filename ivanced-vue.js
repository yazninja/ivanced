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
                            Use Apple Icons
                            <small>
                                Requires app restart to disable
                            </small>
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <input type="checkbox" v-model="theme.appleIcons"  v-on:change="checkAppleIcons"switch/>
                        </div>
                    </div>
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Force Theme Variant
                            <small>
                                Only tested with iTheme (may not work with other themes)
                            </small>
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <select class="md-select" style="width:180px;" v-model="theme.variant" v-on:change="toggleThemeVariant">
                                <option value="none" selected>Use System Theme</option>
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
                            <select class="md-select" style="width:180px;" v-model="theme.navBar" v-on:change="toggleNavbar">
                                <option value="sidebar">Top Sidebar</option>
                                <option value="top">Top Bar</option>
                                <option value="bottom">Below Top Bar</option>
                            </select>
                        </div>
                    </div>
                    <div class="md-option-header"> Sidebar </div>
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Remove Home
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <input type="checkbox" v-model="theme.sidebar.home"  v-on:change="toggleHome"switch/>
                        </div>
                    </div>
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Remove Videos
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <input type="checkbox" v-model="theme.sidebar.videos"  v-on:change="toggleVideos"switch/>
                        </div>
                    </div>
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Remove Podcasts
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <input type="checkbox" v-model="theme.sidebar.podcasts"  v-on:change="togglePodcasts"switch/>
                        </div>
                    </div>
                    <div style="opacity: 0.5; pointer-events: none;">
                    <div class="md-option-header"> Unfinished/ Unfunctional</div>
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
                    </div>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            theme: {
                appleIcons: false,
                variant: 'none',
                navbar: 'sidebar',
                sidebar: {
                    home: false,
                    videos: false,
                    podcasts: false
                }
            }
        }
    },
    async mounted() {
        this.theme = await CiderCache.getCache("theme-settings")
        if (!this.theme) {
            this.theme = {
                appleIcons: false,
                variant: 'none',
                navbar: 'sidebar',
                sidebar: {
                    home: false,
                    videos: false,
                    podcasts: false
                }
            }
            CiderCache.putCache("theme-settings", this.theme)
        }
    },
    methods: {
        checkAppleIcons: function () {
            if (this.theme.appleIcons) {
                CiderFrontAPI.StyleSheets.Add("./plugins/ivanced/cupertinoicns.less")
                console.log("Apple Icons Enabled")
            }
            else {
                bootbox.confirm(app.getLz('action.relaunch.confirm'), function (result) {
                    if (result) {
                        ipcRenderer.send('relaunchApp', '');
                    }
                })
                console.log("Apple Icons Disabled")
            }
            CiderCache.putCache("theme-settings", this.theme)
        },
        toggleHome: function () {
            if (this.theme.sidebar.home) {
                document.getElementsByClassName("app-sidebar-header-text")[0].style.display = "none"
                document.getElementsByClassName("app-sidebar-item")[0].style.display = "none"

            }
            else {
                document.getElementsByClassName("app-sidebar-header-text")[0].style.display = "block"
                document.getElementsByClassName("app-sidebar-item")[0].style.display = "flex"
            }
            CiderCache.putCache("theme-settings", this.theme)
        },
        toggleVideos: function () {
            if (this.theme.sidebar.videos) {
                document.getElementsByClassName("app-sidebar-item")[8].style.display = "none"
            }
            else {
                document.getElementsByClassName("app-sidebar-item")[8].style.display = "flex"
            }
            CiderCache.putCache("theme-settings", this.theme)
        },
        togglePodcasts: function () {
            if (this.theme.sidebar.podcasts) {
                document.getElementsByClassName("app-sidebar-item")[9].style.display = "none"
            }
            else {
                document.getElementsByClassName("app-sidebar-item")[9].style.display = "flex"
            }
            CiderCache.putCache("theme-settings", this.theme)
        },
        toggleThemeVariant: function () {
            if (this.theme.variant == "dark") {
                document.documentElement.classList.add("dark");
                document.documentElement.classList.remove("light");
            }
            else if (this.theme.variant == "light") {
                document.documentElement.classList.add("light");
                document.documentElement.classList.remove("dark");
            }
            else {
                document.documentElement.classList.remove("dark");
                document.documentElement.classList.remove("light");
            }
            console.log("Theme Variant Changed: ", this.theme.variant)
            console.log("Root Elem: ", document.documentElement.classList)
            CiderCache.putCache("theme-settings", this.theme)
        },
        toggleNavbar: function () {
            if (this.theme.navbar == "sidebar") {
                app.chrome.forceDirectives["appNavigation"] = { value: "default" }
                document.documentElement.classList.remove("navbar-topbar");
                app.$forceUpdate()
            }
            else if (this.theme.navbar == "top") {
                app.chrome.forceDirectives["appNavigation"] = { value: "default" }
                document.documentElement.classList.add("navbar-topbar");
                app.$forceUpdate()
            }
            else {
                app.chrome.forceDirectives["appNavigation"] = { value: "seperate" }
                app.$forceUpdate()
            }
        },
        checkAll: function () {
            this.checkAppleIcons();
            this.toggleHome();
            this.toggleVideos();
            this.togglePodcasts();
        }
    }
})