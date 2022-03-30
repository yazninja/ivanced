class iVancedPlugin {
    constructor() {
        CiderFrontAPI.StyleSheets.Add("./plugins/ivanced/stylesheet.less")
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
    LoadSettings() {
        this.theme = CiderCache.getCache("theme-settings")
        if (this.theme.appleIcons) { 
            CiderFrontAPI.StyleSheets.Add("./plugins/ivanced/cupertinoicns.less")
            console.log("Apple Icons Enabled")
        }
        else {
            document.querySelector("head").removeChild(document.querySelector("link[href*='cupertinoicns.less']"))
            less.registerStylesheetsImmediately()
            less.refresh(true, true, true)
            console.log("Apple Icons Disabled")
        }
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
    }
}

new iVancedPlugin()
