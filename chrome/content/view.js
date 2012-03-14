// SidebarView handles the presentation details for the extension.
infomaniac.SidebarView = function() {
    this.activeURL = undefined;
};

// Initialize the sidebar for the first time, binding event handlers
// and performing any other setup that might be needed.
infomaniac.SidebarView.prototype.bindUI = function() {
    infomaniac.log("Binding view event handlers...");

    // FIXME We probably ought to add an unbind function to unhook
    // these event handlers, but doing so is a bit awkward.  In
    // addition, the logic will probably never be used because the
    // extension only unloads when the browser shuts down. -jkakar
    var browser = infomaniac.getMainWindow().gBrowser;
    browser.tabContainer.addEventListener(
        "TabSelect", infomaniac.bind(this.onTabChange, this), false);
    browser.addEventListener(
        "DOMContentLoaded", infomaniac.bind(this.onPageLoad, this), false);
    infomaniac.controller.sync(browser.contentDocument.location.href);
};

// Update the sidebar to reflect the details for a new active page or tab.
infomaniac.SidebarView.prototype.syncUI = function(page) {
    infomaniac.log("Synchronizing UI for " + page.url);
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
            infomaniac.controller.sync(document.location.href);
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
    infomaniac.controller.sync(document.location.href);
};


// FollowButton encapsulates the logic needed to make the "Follow"
// button interactive.
infomaniac.FollowButton = function() {};

// Respond to a click event.
infomaniac.FollowButton.prototype.onClick = function() {
    var mainWindow = infomaniac.getMainWindow();
    var document = mainWindow.gBrowser.contentDocument;
    var button = window.document.getElementById("follow-button");
    var following = (button.label === "Following"
                     || button.label === "Unfollow");
    if (following) {
        infomaniac.controller.unfollow(document.location.href);
    } else {
        infomaniac.controller.follow(document.location.href);
    }
};

// Respond to a mouseover event.
infomaniac.FollowButton.prototype.onMouseOver = function() {
    var button = window.document.getElementById("follow-button");
    if (button.label === "Following") {
        button.label = "Unfollow";
    }
};

// Respond to a mouseout event.
infomaniac.FollowButton.prototype.onMouseOut = function() {
    var button = window.document.getElementById("follow-button");
    if (button.label === "Unfollow") {
        button.label = "Following";
    }
};

// Synchronize the user interface with the page state.
infomaniac.FollowButton.prototype.syncUI = function(page) {
    var following = page.tags["infomaniac/follow"] === null;
    infomaniac.log("syncUI/following: " + following);
    var button = window.document.getElementById("follow-button");
    button.label = following ? "Following" : "Follow";
};


// FluidinfoLink provides a link to the object browser.
infomaniac.FluidinfoLink = function() {};

// Synchronize the user interface with the page state.
infomaniac.FluidinfoLink.prototype.onClick = function() {
    var mainWindow = infomaniac.getMainWindow();
    var document = mainWindow.gBrowser.contentDocument;
    var link = encodeURIComponent(document.location.href);
    var targetURL = 'https://fluidinfo.com/about/#!/' + link;
    mainWindow.gBrowser.selectedTab = mainWindow.gBrowser.addTab(targetURL);
};
