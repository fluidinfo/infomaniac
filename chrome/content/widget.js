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
    infomaniac.log("syncUI/following" + following);
    var button = window.document.getElementById("follow-button");
    button.label = following ? "Following" : "Follow";
};
