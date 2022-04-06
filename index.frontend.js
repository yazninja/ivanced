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
    async LoadSettings() {
        this.theme = await CiderCache.getCache("theme-settings")
        console.log(this.theme)
        if (this.theme.appleIcons) { 
            CiderFrontAPI.StyleSheets.Add("./plugins/ivanced/cupertinoicns.less")
            console.log("Apple Icons Enabled")
        }
        else {
            // document.querySelector("head").removeChild(document.querySelector("link[href*='cupertinoicns.less']"))
            // less.registerStylesheetsImmediately()
            // less.refresh(true, true, true)
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
        
    }
}

new iVancedPlugin()
