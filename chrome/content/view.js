// SidebarView handles the presentation details for the extension.
infomaniac.SidebarView = function() {
    this.activeURL = undefined;
};

// Initialize the sidebar for the first time.
infomaniac.SidebarView.prototype.load = function() {
    infomaniac.log("Initializing view...");

    var browser = infomaniac.getMainWindow().gBrowser;
    browser.tabContainer.addEventListener(
        "TabSelect", infomaniac.bind(this.onTabChange, this), false);
    browser.addEventListener(
        "DOMContentLoaded", infomaniac.bind(this.onPageLoad, this), false);

    var mainWindow = infomaniac.getMainWindow();
    var document = mainWindow.gBrowser.contentDocument;
    infomaniac.controller.refresh(document.location.href);
};

// Update the sidebar to reflect the details for a new active page or tab.
infomaniac.SidebarView.prototype.refresh = function(page) {
    infomaniac.log("Refreshing " + page.url);
    window.document.getElementById("current-url").value = page.url;
    infomaniac.followButton.syncUI(page);
};

// Respond to a page load event.
infomaniac.SidebarView.prototype.onPageLoad = function(evt) {
    if (evt.originalTarget instanceof HTMLDocument) {
        var mainWindow = infomaniac.getMainWindow();
        var document = mainWindow.gBrowser.contentDocument;
        if (this.activeURL !== document.location.href) {
            infomaniac.log("Detected page load event: "
                           + document.location.href);
            infomaniac.controller.refresh(document.location.href);
        }
        this.activeURL = document.location.href;
    }
};

// Respond to a tab change event.
infomaniac.SidebarView.prototype.onTabChange = function() {
    var mainWindow = infomaniac.getMainWindow();
    var document = mainWindow.gBrowser.contentDocument;
    infomaniac.log("Detected tab change event: " + document.location.href);
    this.activeURL = document.location.href;
    infomaniac.controller.refresh(document.location.href);
};

