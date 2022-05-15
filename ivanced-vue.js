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
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <input type="checkbox" v-model="theme.appleIcons"  v-on:change="toggleIcons" switch/>
                        </div>
                    </div>
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Use Apple Font (San Fransisco)
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <input type="checkbox" v-model="theme.appleFont"  v-on:change="toggleFonts" switch/>
                        </div>
                    </div>
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Use Extreme Album Art Quality
                            <small>
                                900x900px
                            </small>
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <input type="checkbox" v-model="theme.fullArtworkQual"  v-on:change="toggleArtworkQuality" switch/>
                        </div>
                    </div>
                    <div class="md-option-line">
                        <div class="md-option-segment">
                            Use Apple Style Drawers (Queue & Lyrics)
                        </div>
                        <div class="md-option-segment md-option-segment_auto">
                            <input type="checkbox" v-model="theme.appleDrawers"  v-on:change="toggleDrawers" switch/>
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
                            <select class="md-select" style="width:180px;" v-model="theme.navbar" v-on:change="toggleNavbar">
                                <option value="sidebar">Top Sidebar</option>
                                <option value="top">Top Bar</option>
                                <option value="bottom">Below Top Bar</option>
                            </select>
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
        app: this.$root
        return {
            theme: {
                appleIcons: false,
                appleFont:false,
                appleDrawers: false,
                fullArtworkQual: false,
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
                appleFont:false,
                appleDrawers: false,
                fullArtworkQual: false,
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
        toggleIcons: function () {
            if (this.theme.appleIcons) {
                document.getElementById("app").classList.add("cupertino-icns")
            }
            else {
                document.getElementById("app").classList.remove("cupertino-icns")
            }
            CiderCache.putCache("theme-settings", this.theme)
        },
        toggleFonts: function () {
            if (this.theme.appleFont) {
                document.getElementById("app").classList.add("cupertino-font")
            }
            else {
                document.getElementById("app").classList.remove("cupertino-font")
            }
            CiderCache.putCache("theme-settings", this.theme)
        },
        toggleArtworkQuality: function () {
            CiderCache.putCache("theme-settings", this.theme)
        },
        toggleDrawers: function () {
            if (this.theme.appleDrawers) {
                document.getElementById("app").classList.add("cupertino-drawer")
            }
            else {
                document.getElementById("app").classList.remove("cupertino-drawer")
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
                document.getElementById("app").classList.add("navbar-sidebar");
                document.getElementById("app").classList.remove("navbar-topbar");
                document.getElementById("app").classList.remove("navbar");
            }
            else if (this.theme.navbar == "top") {
                document.getElementById("app").classList.remove("navbar-sidebar");
                document.getElementById("app").classList.add("navbar-topbar");
                document.getElementById("app").classList.remove("navbar");
            }
            else {
                document.getElementById("app").classList.remove("navbar-sidebar");
                document.getElementById("app").classList.remove("navbar-topbar");
                document.getElementById("app").classList.add("navbar");
            }
            CiderCache.putCache("theme-settings", this.theme)
        },
    }
})