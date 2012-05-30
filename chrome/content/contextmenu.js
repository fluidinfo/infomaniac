// FluidinfoLink provides a link to the object browser.
infomaniac.FluidinfoLink = function() {};

// Open the object browser in a new tab and make it active.
infomaniac.FluidinfoLink.prototype.onClick = function() {
    var document = window.gBrowser.contentDocument;
    var link = encodeURIComponent(document.location.href);
    var preferences = Components
        .classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefService)
        .getBranch("extensions.infomaniac.");
    var rootURL = preferences.getCharPref("rootURL");
    var targetURL = rootURL + 'about/' + link;
    window.gBrowser.selectedTab = window.gBrowser.addTab(targetURL);
};


// Initialize the extension.
infomaniac.load = function() {
    if (infomaniac.contextLink === undefined) {
        infomaniac.contextLink = new infomaniac.FluidinfoLink();
    }
};

window.addEventListener("popupshowing", infomaniac.load);
