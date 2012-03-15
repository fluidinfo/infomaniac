var infomaniac = {
    fluidinfo: undefined,
    currentURL: undefined,

    // Write a message to the Firebug console.
    log: function(message) {
        infomaniac.getMainWindow().Firebug.Console.log(message);
    },

    // Register event handlers and initialize the user interface when
    // the extension is loaded.  Triggered when the window's "load"
    // event is fired.
    onLoad: function() {
        infomaniac.fluidinfo = fluidinfo({username: "infomaniac",
                                          password: "secret"});
        var mainWindow = infomaniac.getMainWindow();
        var label = window.document.getElementById("current-url");
        label.value = mainWindow.gBrowser.contentDocument.location.href;
        infomaniac.tabs.onLoad();
    },

    // Deregister event handlers and perform any cleanup needed when
    // the extension is unloaded.  Triggered when the window's
    // "unload" event is fired.
    onUnload: function() {
        infomaniac.tabs.onUnload();
    },

    // Get the main content window.
    getMainWindow: function() {
        var interfaces = Components.interfaces;
        return window.QueryInterface(interfaces.nsIInterfaceRequestor)
            .getInterface(interfaces.nsIWebNavigation)
            .QueryInterface(interfaces.nsIDocShellTreeItem)
            .rootTreeItem
            .QueryInterface(interfaces.nsIInterfaceRequestor)
            .getInterface(interfaces.nsIDOMWindow);
    },

    // Logic related to tab behaviour.
    tabs: {
        // Register event listeners to detect tab selection changes.
        // Triggered when the extension is loaded and ready to use.
        onLoad: function() {
            var mainWindow = infomaniac.getMainWindow();
            var container = mainWindow.gBrowser.tabContainer;
            container.addEventListener(
                "TabSelect", infomaniac.tabs.onSelect, false);
            mainWindow.gBrowser.addEventListener(
                "DOMContentLoaded", infomaniac.tabs.onPageLoad, false);
        },

        // Deregister event listeners to stop detecting tab selection
        // changes.  Triggered when the extension is unloaded.
        onUnload: function() {
            var mainWindow = infomaniac.getMainWindow();
            var container = mainWindow.gBrowser.tabContainer;
            container.removeEventListener(
                "TabSelect", infomaniac.tabs.onSelect, false);
            mainWindow.gBrowser.removeEventListener(
                "load", infomaniac.tabs.onPageLoad, false);
        },

        // Determine if the sidebar needs to be updated to reflect a new page.
        // Triggered when a new page is loaded.
        onPageLoad: function(evt) {
            if (evt.originalTarget instanceof HTMLDocument) {
                var mainWindow = infomaniac.getMainWindow();
                var document = mainWindow.gBrowser.contentDocument;
                if (infomaniac.currentURL !== document.location.href) {
                    infomaniac.currentURL = document.location.href;
                    var label = window.document.getElementById("current-url");
                    label.value = infomaniac.currentURL;
                    infomaniac.follow.syncUI();
                }
            }
        },

        // Change the label that shows the current URL, to demonstrate
        // that we can detect tab selection changes.
        onSelect: function() {
            var mainWindow = infomaniac.getMainWindow();
            var document = mainWindow.gBrowser.contentDocument;
            infomaniac.currentURL = document.location.href;

            var label = window.document.getElementById("current-url");
            label.value = document.location.href;

            infomaniac.follow.syncUI();
        }
    },

    // Logic related to the behaviour of the "Follow" button.
    follow: {
        cache: {},

        // Toggle the follow state of the current document.  Triggered
        // when the "Follow" button is pressed.
        onClick: function() {
            var button = window.document.getElementById("follow-button");
            var following = (button.label === "Following"
                             || button.label === "Unfollow");
            infomaniac.follow.updateFollowTag(!following);
        },

        // Change the name of the "Following" button to "Unfollow", to
        // make it clear what clicking it will do.  Triggered when the
        // "Follow" button is hovered upon.
        onMouseOver: function() {
            var button = window.document.getElementById("follow-button");
            if (button.label === "Following") {
                button.label = "Unfollow";
            }
        },

        // Change the "Unfollow" label back to "Following" if the
        // current document is followed.  Triggered when the mouse is
        // moved away from the "Follow" button.
        onMouseOut: function() {
            var button = window.document.getElementById("follow-button");
            if (button.label === "Unfollow") {
                button.label = "Following";
            }
        },

        // Get the current follow status from Fluidinfo for the
        // current page and update the button label to match
        // it.  Triggered when a tab is changed or when a new page is
        // loaded.
        syncUI: function() {
            var url = infomaniac.currentURL;

            var onSuccess = function(result) {
                var following = (result["infomaniac/follow"] !== undefined);
                infomaniac.follow.updateButtonLabel(following);
                infomaniac.follow.cache[url] = following;
            };

            var following = infomaniac.follow.cache[url];
            infomaniac.log("following from cache: " + following);
            if (following !== undefined) {
                infomaniac.follow.updateButtonLabel(following);
            } else {
                // FIXME Handle failures here. -jkakar
                infomaniac.fluidinfo.getObject({about: infomaniac.currentURL,
                                                select: ["infomaniac/follow"],
                                                onSuccess: onSuccess});
            }
        },

        // Update the "Follow" button label to match the specified
        // follow state.
        updateButtonLabel: function(following) {
            var button = window.document.getElementById("follow-button");
            button.label = following ? "Following" : "Follow";
            infomaniac.log("Updated button to " + button.label);
        },

        // Update the follow status in Fluidinfo for the current page.
        updateFollowTag: function(following) {
            infomaniac.log("current URL: " + infomaniac.currentURL);
            var query = 'fluiddb/about = "' + infomaniac.currentURL + '"';
            if (following) {
                infomaniac.follow.cache[infomaniac.currentURL] = following;
                // FIXME Handle failures here. -jkakar
                infomaniac.fluidinfo.tag({values: {"infomaniac/follow": null},
                                          about: infomaniac.currentURL});
            } else {
                delete infomaniac.follow.cache[infomaniac.currentURL];
                // FIXME Handle failures here. -jkakar
                infomaniac.fluidinfo.del({tags: ["infomaniac/follow"],
                                          where: query});
            }
            infomaniac.follow.updateButtonLabel(following);
        }
    }
};

window.addEventListener("load", infomaniac.onLoad, false);
window.addEventListener("unload", infomaniac.onUnload, false);
