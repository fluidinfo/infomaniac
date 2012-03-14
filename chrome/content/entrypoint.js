// Initialize the extension.
infomaniac.load = function() {
    infomaniac.log("Initializing extension...");
    var client = fluidinfo({username: "infomaniac", password: "secret"});
    infomaniac.model = new infomaniac.WebpageCollection(client);
    infomaniac.controller = new infomaniac.SidebarController();
    infomaniac.view = new infomaniac.SidebarView();
    infomaniac.followButton = new infomaniac.FollowButton();
    infomaniac.view.load();
};

// Cleanup the extension before shutdown.
infomaniac.unload = function() {
    infomaniac.log("Stopping extension...");
};

window.addEventListener("load", infomaniac.load, false);
window.addEventListener("unload", infomaniac.unload, false);
