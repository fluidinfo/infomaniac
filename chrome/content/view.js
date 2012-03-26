// SidebarView handles the presentation details for the extension.
infomaniac.SidebarView = function() {
    this.activeURL = undefined;
};

// Initialize the sidebar for the first time, binding event handlers
// and performing any other setup that might be needed.
infomaniac.SidebarView.prototype.bindUI = function() {
    // FIXME We probably ought to add an unbind function to unhook
    // these event handlers, but doing so is a bit awkward.  In
    // addition, the logic will probably never be used because the
    // extension only unloads when the browser shuts down. -jkakar
    var browser = infomaniac.getMainWindow().gBrowser;
    browser.tabContainer.addEventListener(
        "TabSelect", infomaniac.bind(this.onTabChange, this));
    browser.addEventListener(
        "DOMContentLoaded", infomaniac.bind(this.onPageLoad, this));

    // Hide the splitter to ensure that the width of the sidebar is
    // always what we set it to.
    var mainWindow = infomaniac.getMainWindow();
    var splitter = mainWindow.document.getElementById("sidebar-splitter");
    splitter.hidden = true;

    // Setup the sidebar.
    var sidebar = window.top.document.getElementById("sidebar-box");
    sidebar.width = "230px";
    sidebar.style.borderRight = "1px solid #ebebeb";
    sidebar.addEventListener("click", function(evt) {
        // Intercept click events on links and open them in a new tab
        // in the main window.
        if (evt.target.nodeName == "A") {
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
infomaniac.SidebarView.prototype.syncUI = function(page) {
    var mainWindow = infomaniac.getMainWindow();
    var document = mainWindow.gBrowser.contentDocument;
    var browser = window.document.getElementById("sidebar-content");
    browser.contentDocument.location.href =
        "http://localhost:9400/index.html?"
        + encodeURIComponent(document.location.href);
};

// Respond to a page load event.
infomaniac.SidebarView.prototype.onPageLoad = function(evt) {
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
infomaniac.SidebarView.prototype.onTabChange = function() {
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
