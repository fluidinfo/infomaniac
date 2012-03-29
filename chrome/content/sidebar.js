// Sidebar handles the presentation details for the extension.
infomaniac.Sidebar = function() {
    this.activeURL = undefined;
};

// Initialize the sidebar for the first time, binding event handlers
// and performing any other setup that might be needed.
infomaniac.Sidebar.prototype.bindUI = function() {
    // FIXME We probably ought to add an unbind function to unhook
    // these event handlers, but doing so is a bit awkward.  In
    // addition, the logic will probably never be used because the
    // extension only unloads when the browser shuts down. -jkakar
    var browser = infomaniac.getMainWindow().gBrowser;
    browser.tabContainer.addEventListener(
        "TabSelect", infomaniac.bind(this.onTabChange, this));
    browser.addEventListener(
        "DOMContentLoaded", infomaniac.bind(this.onPageLoad, this));

    // Setup the sidebar.
    var sidebar = window.top.document.getElementById("sidebar-box");
    sidebar.addEventListener("click", function(evt) {
        // Intercept click events on links and open them in a new tab
        // in the main window.
        if (evt.target.nodeName === "A") {
            var mainWindow = infomaniac.getMainWindow();
            var document = mainWindow.gBrowser.contentDocument;
            var link = encodeURIComponent(document.location.href);
            mainWindow.gBrowser.selectedTab =
                mainWindow.gBrowser.addTab(evt.target.getAttribute("href"));
            evt.preventDefault();
            evt.stopPropagation();
        }
    });
};

// Update the sidebar to reflect the details for a new active page or tab.
infomaniac.Sidebar.prototype.syncUI = function(page) {
    var mainWindow = infomaniac.getMainWindow();
    var document = mainWindow.gBrowser.contentDocument;
    var browser = window.document.getElementById("sidebar-content");
    browser.contentDocument.location.href =
        "http://new.fluidinfo.com/infomaniac/" + document.location.href;
};

// Respond to a page load event.
infomaniac.Sidebar.prototype.onPageLoad = function(evt) {
    if (evt.originalTarget instanceof HTMLDocument) {
        var mainWindow = infomaniac.getMainWindow();
        var document = mainWindow.gBrowser.contentDocument;
        var currentURL = document.location.href;
        if (this.activeURL !== currentURL) {
            this.syncUI();
        }
        this.activeURL = currentURL;
    }
};

// Respond to a tab change event.
infomaniac.Sidebar.prototype.onTabChange = function() {
    var mainWindow = infomaniac.getMainWindow();
    var document = mainWindow.gBrowser.contentDocument;
    var currentURL = document.location.href;
    this.activeURL = currentURL;
    this.syncUI();
};


// FluidinfoLink provides a link to the object browser.
infomaniac.FluidinfoLink = function() {};

// Open the object browser in a new tab and make it active.
infomaniac.FluidinfoLink.prototype.onClick = function() {
    var mainWindow = infomaniac.getMainWindow();
    var document = mainWindow.gBrowser.contentDocument;
    var link = encodeURIComponent(document.location.href);
    var targetURL = 'https://fluidinfo.com/about/#!/' + link;
    mainWindow.gBrowser.selectedTab = mainWindow.gBrowser.addTab(targetURL);
};


// Initialize the extension.
infomaniac.load = function() {
    infomaniac.fluidinfoLink = new infomaniac.FluidinfoLink();
    infomaniac.sidebar = new infomaniac.Sidebar();
    infomaniac.sidebar.bindUI();
    infomaniac.sidebar.syncUI();
};

window.addEventListener("load", infomaniac.load);
