// FluidinfoLink provides a link to the object browser.
infomaniac.FluidinfoLink = function() {};

// Open the object browser in a new tab and make it active.
infomaniac.FluidinfoLink.prototype.onClick = function() {
    var document = window.gBrowser.contentDocument;
    var link = encodeURIComponent(document.location.href);
    var targetURL = 'https://fluidinfo.com/about/#!/' + link;
    window.gBrowser.selectedTab = window.gBrowser.addTab(targetURL);
};


// Initialize the extension.
infomaniac.load = function() {
    if (infomaniac.contextLink === undefined) {
        infomaniac.contextLink = new infomaniac.FluidinfoLink();
    }
};

window.addEventListener("popupshowing", infomaniac.load);
