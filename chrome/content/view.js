// SidebarView handles the presentation details for the extension.
infomaniac.SidebarView = function() {
    this.activeURL = undefined;

    var vbox = window.document.getElementById("sidebar-container");
    infomaniac.log("width: " + vbox.width);
    infomaniac.log("height: " + vbox.height);
    infomaniac.log("scrollHeight: " + vbox.scrollHeight);
    infomaniac.log("scrollWidth: " + vbox.scrollWidth);


    window.top.document.getElementById("sidebar-box").width = "230px";
    var mainWindow = infomaniac.getMainWindow();
    mainWindow.document.getElementById("sidebar-splitter").hidden = true;
    window.top.document.getElementById("sidebar-box").style.borderRight = "1px solid #ebebeb";
    infomaniac.log(window.document.getElementById("sidebar-content"));
    // window.document.getElementById("sidebar-content").setAttribute("height", vbox.scrollHeight + "px");
    // window.document.getElementById("sidebar-content").setAttribute("height", "100%");
    infomaniac.log(window.document.getElementById("sidebar-content"));
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
    infomaniac.log("Hi!");
    // infomaniac.followButton.syncUI(page);
    // infomaniac.tagList.syncUI(page);
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

// Open the object browser in a new tab and make it active.
infomaniac.FluidinfoLink.prototype.onClick = function() {
    var mainWindow = infomaniac.getMainWindow();
    var document = mainWindow.gBrowser.contentDocument;
    var link = encodeURIComponent(document.location.href);
    var targetURL = 'https://fluidinfo.com/about/#!/' + link;
    mainWindow.gBrowser.selectedTab = mainWindow.gBrowser.addTab(targetURL);
};


// TagList displays and manages a list of tag/value pairs.
infomaniac.TagList = function() {};

// Synchronize the user interface with the page state.
infomaniac.TagList.prototype.syncUI = function(page) {
    var document = window.document;
    var info = document.getElementById("page-info");
    while (info.firstChild !== null) {
        info.removeChild(info.firstChild);
    }

    var tagPaths = [];
    for (var path in page.tags) {
        tagPaths.push(path);
    }
    tagPaths.sort();

    var renderer = new infomaniac.TagRenderer();
    for (var i = 0; i < tagPaths.length; i++) {
        var tagPath = tagPaths[i];
        if (tagPath === "id" || tagPath == "fluiddb/about") {
            continue;
        }

        var node = renderer.render(tagPath, page.tags[tagPath]);
        var separator = document.createElement("separator");
        separator.className = "thin";
        info.appendChild(node);
        info.appendChild(separator);
    }
};


// TagRenderer creates DOM elements representing tag/value data.
infomaniac.TagRenderer = function() {};

// Render a tag/value and return the DOM element containing the
// output.
infomaniac.TagRenderer.prototype.render = function(path, value) {
    var image = document.createElement("image");
    image.validate = "always";
    image.setAttribute("src", "chrome://infomaniac/content/avatar.png");
    image.setAttribute("class", "avatar");

    var avatar = document.createElement("hbox");
    avatar.appendChild(image);

    var tagName = document.createElement("html:p");
    tagName.className = "header";
    tagName.appendChild(document.createTextNode(path));

    var tagValue = document.createElement("html:p");
    tagValue.appendChild(document.createTextNode(value));
    if (/^https?:\/\/[^\<\>]+$/i.test(value)) {
        tagValue.setAttribute("class", "text-link");
        tagValue.setAttribute("href", value);
        tagValue.addEventListener("click", this.clickHandler, false);
    }

    var data = document.createElement("vbox");
    data.appendChild(tagName);
    data.appendChild(tagValue);

    var node = document.createElement("hbox");
    node.appendChild(avatar);
    node.appendChild(data);
    return node;
};

// Open a clicked link in a new tab and make it active.
infomaniac.TagRenderer.prototype.clickHandler = function(evt) {
    var browser = infomaniac.getMainWindow().gBrowser;
    var value = evt.target.getAttribute("href");
    browser.selectedTab = browser.addTab(value);
    evt.preventDefault();
    evt.stopPropagation();
};
