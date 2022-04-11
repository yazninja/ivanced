class iVancedPlugin {
    constructor() {
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
        await CiderFrontAPI.StyleSheets.Add("./plugins/ivanced/less/cupertinoicns.less")
        await CiderFrontAPI.StyleSheets.Add("./plugins/ivanced/less/appleDrawer.less")
        this.theme = await CiderCache.getCache("theme-settings")
        
        console.log(this.theme)
        if (this.theme.appleIcons) {
            document.getElementsById("app").classList.add("cupertino-icns")
        }
        else {
            document.getElementsById("app").classList.remove("cupertino-icns")
        }
        if (this.theme.appleDrawers) {
            document.getElementsById("app").classList.add("cupertino-drawer")
        }
        else {
            document.getElementsById("app").classList.remove("cupertino-drawer")
        }
        console.log("loaded: " + document.getElementsById("app").classList)
        if (this.theme.sidebar.home) {
            document.getElementsByClassName("app-sidebar-header-text")[0].style.display = "none"
            document.getElementsByClassName("app-sidebar-item")[0].style.display = "none"
            
        }
        else {
            document.getElementsByClassName("app-sidebar-header-text")[0].style.display = "block"
            document.getElementsByClassName("app-sidebar-item")[0].style.display = "flex"
        }
        if (this.theme.sidebar.videos) {
            document.getElementsByClassName("app-sidebar-item")[8].style.display = "none"
        }
        else {
            document.getElementsByClassName("app-sidebar-item")[8].style.display = "flex"
        }
        if (this.theme.sidebar.podcasts) {
            document.getElementsByClassName("app-sidebar-item")[9].style.display = "none"
        }
        else {
            document.getElementsByClassName("app-sidebar-item")[9].style.display = "flex"
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
            app.chrome.forceDirectives["appNavigation"] = { value: "default" }
            document.documentElement.classList.remove("navbar-topbar");
        }
        else if (this.theme.navbar == "top") {
            app.chrome.forceDirectives["appNavigation"] = { value: "default" }
            document.documentElement.classList.add("navbar-topbar");
        }
        else {
            app.chrome.forceDirectives["appNavigation"] = { value: "seperate" }
        }
        // app.$forceUpdate()
    }
}

new iVancedPlugin()
