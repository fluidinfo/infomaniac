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
