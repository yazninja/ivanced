class iVancedPlugin {
    constructor() {
        CiderFrontAPI.StyleSheets.Add("./plugins/ivanced/less/cupertinoicns.less")
        CiderFrontAPI.StyleSheets.Add("./plugins/ivanced/less/cupertinofont.less")
        CiderFrontAPI.StyleSheets.Add("./plugins/ivanced/less/appleDrawer.less")
        const menuEntry = new CiderFrontAPI.Objects.MenuEntry()
        this.menuEntryId = uuidv4()
        menuEntry.Id = this.menuEntryId
        menuEntry.name = "iTheme Advanced Settings"
        menuEntry.onClick = ()=>{
            app.appRoute("plugin/ivanced-settings")
        }
        CiderFrontAPI.AddMenuEntry(menuEntry)
        this.LoadSettings()
    }
    async LoadSettings() {
        this.theme = await CiderCache.getCache("theme-settings")
        console.log("iVanced Cached Settings" + this.theme)
        if (this.theme.appleIcons) {
            document.getElementById("app").classList.add("cupertino-icns")
        }
        else {
            document.getElementById("app").classList.remove("cupertino-icns")
        }
        if (this.theme.appleFont) {
            document.getElementById("app").classList.add("cupertino-font")
        }
        else {
            document.getElementById("app").classList.remove("cupertino-font")
        }
        CiderCache.putCache("theme-settings", this.theme)
        if (this.theme.appleDrawers) {
            document.getElementById("app").classList.add("cupertino-drawer")
        }
        else {
            document.getElementById("app").classList.remove("cupertino-drawer")
        }
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
    }
}

new iVancedPlugin()
