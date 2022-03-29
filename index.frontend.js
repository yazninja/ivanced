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
    }
}

new iVancedPlugin()
