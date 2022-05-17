class iVancedPlugin {
    constructor() {
        let plugin = this
        CiderFrontAPI.StyleSheets.Add("./plugins/ivanced/less/cupertinoicns.less")
        CiderFrontAPI.StyleSheets.Add("./plugins/ivanced/less/cupertinofont.less")
        CiderFrontAPI.StyleSheets.Add("./plugins/ivanced/less/appleDrawer.less")
        this.LoadSettings()
        app.$watch('page', async function (newVal, oldVal) {
            plugin.ChangeArtworkQuality(await CiderCache.getCache("theme-settings"), newVal, oldVal)
        })

        const menuEntry = new CiderFrontAPI.Objects.MenuEntry()
        this.menuEntryId = uuidv4()
        menuEntry.Id = this.menuEntryId
        menuEntry.name = "iTheme Advanced Settings"
        menuEntry.onClick = () => {
            app.appRoute("plugin/ivanced-settings")
        }
        CiderFrontAPI.AddMenuEntry(menuEntry)

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
    async ChangeArtworkQuality(theme, newVal, oldVal) {
        setTimeout(() => {
            if (newVal !== oldVal) {
                if (theme.fullArtworkQual) {
                    console.log("Full Artwork Quality")
                    let artworks = document.getElementsByClassName("mediaitem-artwork--img")
                    for (let artwork of artworks) {
                        artwork.src = artwork.src.replace("/190x190", "/400x400")
                    }
                    setTimeout(() => {
                        if (newVal === "search") {
                            let artworks = document.getElementsByClassName("mediaitem-artwork--img")
                            for (let artwork of artworks) {
                                artwork.src = artwork.src.replace("600x600cc.", "1040x346bb.")
                            }
                            console.log("Changing Genre Artwork Quality")
                        }
                    }, 900)
                }
                else {
                    let artworks = document.getElementsByClassName("mediaitem-artwork--img")
                    for (let artwork of artworks) {
                        artwork.src = artwork.src.replace("/400x400", "/190x190")
                    }
                }
                console.log("Changing Artwork Quality")
            }
        }, 100)
    }

}

new iVancedPlugin()
