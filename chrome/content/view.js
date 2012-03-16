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
        "TabSelect", infomaniac.bind(this.onTabChange, this), false);
    browser.addEventListener(
        "DOMContentLoaded", infomaniac.bind(this.onPageLoad, this), false);
    infomaniac.controller.sync(browser.contentDocument.location.href);
};

// Update the sidebar to reflect the details for a new active page or tab.
infomaniac.SidebarView.prototype.syncUI = function(page) {
    var document = window.document;
    // document.getElementById("current-url").value = page.url;
    infomaniac.followButton.syncUI(page);

    var info = document.getElementById("page-info");
    while (info.firstChild !== null) {
        info.removeChild(info.firstChild);
    }

    var tagPaths = [];
    for (var path in page.tags) {
        tagPaths.push(path);
    }
    tagPaths.sort();

    for (var i = 0; i < tagPaths.length; i++) {
        var tagPath = tagPaths[i];
        if (tagPath === "id" || tagPath == "fluiddb/about") {
            continue;
        }

        var node = document.createElement("hbox");

        var avatar = document.createElement("hbox");
        var image = document.createElement("image");
        image.validate = "always";
        image.setAttribute("src", "chrome://infomaniac/content/avatar.png");
        image.setAttribute("class", "avatar");
        avatar.appendChild(image);
        node.appendChild(avatar);

        var data = document.createElement("vbox");
        var tagName = document.createElement("label");
        tagName.className = "header";
        var tagValue = document.createElement("label");
        tagName.appendChild(document.createTextNode(tagPath));
        var value = page.tags[tagPath];
        tagValue.appendChild(document.createTextNode(value));
        if (/^https?:\/\/[^\<\>]+$/i.test(value)) {
            tagValue.setAttribute("class", "text-link");
            tagValue.setAttribute("href", value);
            tagValue.addEventListener("click", function(evt) {
                var browser = infomaniac.getMainWindow().gBrowser;
                var value = evt.target.getAttribute("href");
                infomaniac.log("Opening " + value);
                browser.selectedTab = browser.addTab(value);
                evt.stopPropagation();
                evt.preventDefault();
            }, false);
        }
        data.appendChild(tagName);
        data.appendChild(tagValue);
        node.appendChild(data);

        info.appendChild(node);
        var separator = document.createElement("separator");
        separator.className = "thin";
        info.appendChild(separator);
    }
};

// Respond to a page load event.
infomaniac.SidebarView.prototype.onPageLoad = function(evt) {
    if (evt.originalTarget instanceof HTMLDocument) {
        var mainWindow = infomaniac.getMainWindow();
        var document = mainWindow.gBrowser.contentDocument;
        var currentURL = document.location.href;
        if (this.activeURL !== currentURL) {
            infomaniac.controller.sync(document.location.href);
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
    infomaniac.controller.sync(currentURL);
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
    var following = page.tags["infomaniac/follows"] === null;
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
