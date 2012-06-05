// FluidinfoLink provides a link to the object browser.
infomaniac.FluidinfoLink = function() {
    this.target = null;
};

infomaniac.HASHTAG_REGEX = new RegExp('^#\\w+$');

// Open the object browser in a new tab and make it active.
infomaniac.FluidinfoLink.prototype.onClick = function() {
    var about;
    if (this.target === null) {
        var document = window.gBrowser.contentDocument;
        var about = document.location.href;
    } else {
        about = this.target;
    }

    var rootURL = infomaniac.getPreferences().getCharPref("rootURL");
    var targetURL = rootURL + 'about/' + encodeURIComponent(about);

    window.gBrowser.selectedTab = window.gBrowser.addTab(targetURL);
};


// Initialize the extension.
infomaniac.load = function(event) {
    if (infomaniac.contextLink === undefined) {
        infomaniac.contextLink = new infomaniac.FluidinfoLink();
    }
    var target = event.target;

    while (target !== null && target.nodeName !== 'A') {
        target = target.parentElement;
    }

    if (target) {
        if (infomaniac.HASHTAG_REGEX.test(target.text)) {
            infomaniac.contextLink.target = target.text
        } else {
            var url = target.href
            infomaniac.contextLink.target = url;
        }
    } else {
        infomaniac.contextLink.target = null;
    }
};

window.addEventListener("contextmenu", infomaniac.load);
