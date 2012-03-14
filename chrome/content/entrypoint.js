// Initialize the extension.
infomaniac.load = function() {
    infomaniac.log("Initializing extension...");
    infomaniac.model = new infomaniac.WebpageCollection();
    infomaniac.controller = new infomaniac.SidebarController();
    infomaniac.view = new infomaniac.SidebarView();
    infomaniac.view.load();
};

// Cleanup the extension before shutdown.
infomaniac.unload = function() {
    infomaniac.log("Stopping extension...");
};

window.addEventListener("load", infomaniac.load, false);
window.addEventListener("unload", infomaniac.unload, false);
