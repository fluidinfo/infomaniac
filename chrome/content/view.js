// SidebarView handles the presentation details for the extension.
infomaniac.SidebarView = function() {
    this.activeURL = undefined;
};

// Initialize the sidebar for the first time.
infomaniac.SidebarView.prototype.load = function() {
    infomaniac.log("Initializing sidebar...");
    var mainWindow = infomaniac.getMainWindow();
    var currentURL = mainWindow.gBrowser.contentDocument.location.href;
    this.update(currentURL);

    infomaniac.log("Initializing tab and page state change logic...");
    var browser = mainWindow.gBrowser;
    browser.tabContainer.addEventListener(
        "TabSelect", infomaniac.bind(this.onTabChange, this), false);
    browser.addEventListener(
        "DOMContentLoaded", infomaniac.bind(this.onPageLoad, this), false);
};

// Update the sidebar to reflect the details for a new active page or tab.
infomaniac.SidebarView.prototype.update = function(url) {
    infomaniac.log("Activated " + url);
    window.document.getElementById("current-url").value = url;
};

// Respond to a page load event.
infomaniac.SidebarView.prototype.onPageLoad = function(evt) {
    if (evt.originalTarget instanceof HTMLDocument) {
        var mainWindow = infomaniac.getMainWindow();
        var document = mainWindow.gBrowser.contentDocument;
        if (infomaniac.currentURL !== document.location.href) {
            infomaniac.log("Detected page load event...");
        }
    }
};

// Respond to a tab change event.
infomaniac.SidebarView.prototype.onTabChange = function() {
    infomaniac.log("Detected tab change event...");
};
