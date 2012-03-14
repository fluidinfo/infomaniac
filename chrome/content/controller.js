// SidebarController manages interactions between the model and the view.
infomaniac.SidebarController = function() {};

// Respond to a newly activated page.
infomaniac.SidebarController.prototype.sync = function(url) {
    var succeeded = function(page) {
        infomaniac.view.syncUI(page);
    };

    infomaniac.model.get.call(infomaniac.model, url,
                              infomaniac.bind(succeeded, this));
};

// Follow the specified URL.
infomaniac.SidebarController.prototype.follow = function(url) {
    // FIXME Handle failures here. -jkakar
    var succeeded = function(page, result) {
        infomaniac.view.syncUI(page);
    };

    var loaded = function(page) {
        page.follow(succeeded);
    };

    infomaniac.model.get.call(infomaniac.model, url,
                              infomaniac.bind(loaded, this));
};

// Unfollow the specified URL.
infomaniac.SidebarController.prototype.unfollow = function(url) {
    // FIXME Handle failures here. -jkakar
    var succeeded = function(page, result) {
        infomaniac.view.syncUI(page);
    };

    var loaded = function(page) {
        page.unfollow(succeeded);
    };

    infomaniac.model.get.call(infomaniac.model, url,
                              infomaniac.bind(loaded, this));
};
