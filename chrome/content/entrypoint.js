// Initialize the extension.
infomaniac.load = function() {
    var client = fluidinfo({username: "infomaniac", password: "secret"});
    infomaniac.model = new infomaniac.WebpageCollection(client);
    infomaniac.controller = new infomaniac.SidebarController();
    infomaniac.view = new infomaniac.SidebarView();
    infomaniac.followButton = new infomaniac.FollowButton();
    infomaniac.tagList = new infomaniac.TagList();
    infomaniac.fluidinfoLink = new infomaniac.FluidinfoLink();
    infomaniac.view.bindUI();
};

window.addEventListener("load", infomaniac.load, false);
