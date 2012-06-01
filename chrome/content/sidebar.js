// Sidebar handles the presentation details for the extension.
infomaniac.Sidebar = function() {
    this.activeObject = undefined;
};

// Initialize the sidebar for the first time, binding event handlers
// and performing any other setup that might be needed.
infomaniac.Sidebar.prototype.bindUI = function() {
    var mainWindow = infomaniac.getMainWindow();
    // FIXME We probably ought to add an unbind function to unhook
    // these event handlers, but doing so is a bit awkward.  In
    // addition, the logic will probably never be used because the
    // extension only unloads when the browser shuts down. -jkakar
    var browser = mainWindow.gBrowser;
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
            mainWindow.gBrowser.selectedTab =
                mainWindow.gBrowser.addTab(evt.target.getAttribute("href"));
            evt.preventDefault();
            evt.stopPropagation();
        }
    });

    var selectionCallback = infomaniac.bind(this.onSelection, this);
    mainWindow.addEventListener("mouseup", selectionCallback);
    mainWindow.addEventListener("keyup", selectionCallback);
};

// Update the sidebar to reflect the details for a new active page or tab.
infomaniac.Sidebar.prototype.syncUI = function(page) {
    var preferences = Components
        .classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefService)
        .getBranch("extensions.infomaniac.");
    var rootURL = preferences.getCharPref("rootURL");
    var mainWindow = infomaniac.getMainWindow();
    var document = mainWindow.gBrowser.contentDocument;
    var browser = window.document.getElementById("sidebar-content");
    var about = this.activeObject || document.location.href;
    about = encodeURIComponent(about);
    browser.contentDocument.location.href = rootURL + about;
};

// Respond to a page load event.
infomaniac.Sidebar.prototype.onPageLoad = function(evt) {
    if (evt.originalTarget instanceof HTMLDocument) {
        var mainWindow = infomaniac.getMainWindow();
        var document = mainWindow.gBrowser.contentDocument;
        var currentURL = document.location.href;
        if (this.activeObject !== currentURL) {
            this.activeObject = currentURL;
            this.syncUI();
        }
    }
};

// Respond to a tab change event.
infomaniac.Sidebar.prototype.onTabChange = function() {
    var mainWindow = infomaniac.getMainWindow();
    var document = mainWindow.gBrowser.contentDocument;
    var currentURL = document.location.href;
    this.activeObject = currentURL;
    this.syncUI();
};

// Respond to a selection event.
infomaniac.Sidebar.prototype.onSelection = function() {
    var contentWindow = infomaniac.getMainWindow().gBrowser.contentWindow;
    var selection = contentWindow.getSelection().toString() || null;
    if (selection !== this.activeObject) {
        this.activeObject = selection;
        this.syncUI();
    }
};

// Initialize the extension.
infomaniac.load = function() {
    infomaniac.sidebar = new infomaniac.Sidebar();
    infomaniac.sidebar.bindUI();
    infomaniac.sidebar.syncUI();
};

window.addEventListener("load", infomaniac.load);
