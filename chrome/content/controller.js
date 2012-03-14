// SidebarController manages interactions between the model and the view.
infomaniac.SidebarController = function() {
    this.currentPage = undefined;
};

// Respond to a newly activated page.
infomaniac.SidebarController.prototype.refresh = function(url) {
    var page = infomaniac.model.get.call(infomaniac.model, url);
    if (page === undefined) {
        infomaniac.model.load.call(infomaniac.model, url,
                                   infomaniac.bind(this.refresh, this));
    } else if (page !== this.currentPage) {
        infomaniac.log("Activating new page: " + url);
        this.currentPage = page;
        infomaniac.view.refresh(page);
    }
};
