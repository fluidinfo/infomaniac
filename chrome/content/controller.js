// SidebarController manages interactions between the model and the view.
infomaniac.SidebarController = function() {};

// Respond to a newly activated page.
infomaniac.SidebarController.prototype.refresh = function(url) {
    var succeeded = function(page) {
        infomaniac.log("Refreshing view for " + page.url);
        infomaniac.view.refresh(page);
    };

    infomaniac.model.get.call(infomaniac.model, url,
                              infomaniac.bind(succeeded, this));
};

// Follow the specified URL.
infomaniac.SidebarController.prototype.follow = function(url) {
    // FIXME Handle failures here. -jkakar
    var succeeded = function(page, result) {
        infomaniac.view.refresh(page);
    };

    var loaded = function(page) {
        infomaniac.log("Following in Fluidinfo: " + page.url);
        page.follow(succeeded);
    };

    infomaniac.model.get.call(infomaniac.model, url,
                              infomaniac.bind(loaded, this));
};

// Unfollow the specified URL.
infomaniac.SidebarController.prototype.unfollow = function(url) {
    // FIXME Handle failures here. -jkakar
    var succeeded = function(page, result) {
        infomaniac.view.refresh(page);
    };

    var loaded = function(page) {
        infomaniac.log("Following in Fluidinfo: " + page.url);
        page.unfollow(succeeded);
    };

    infomaniac.model.get.call(infomaniac.model, url,
                              infomaniac.bind(loaded, this));
};
