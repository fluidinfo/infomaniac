var infomaniac = {
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

    // Triggered when the window's "load" event is fired.
    onLoad: function() {
        var mainWindow = infomaniac.getMainWindow();
        var label = window.document.getElementById("current-url");
        label.value = mainWindow.gBrowser.contentDocument.location.href;

        infomaniac.tabs.onLoad();
    },

    // Triggered when the window's "unload" event is fired.
    onUnload: function() {
        infomaniac.tabs.onUnload();
    },

    // Logic related to tab behaviour.
    tabs: {
        // Register event listeners to detect tab selection changes.
        // Triggered when the extension is loaded and ready to use.
        onLoad: function() {
            var mainWindow = infomaniac.getMainWindow();
            var container = mainWindow.gBrowser.tabContainer;
            container.addEventListener("TabSelect", infomaniac.tabs.onSelect,
                                       false);
            mainWindow.gBrowser.addEventListener("load",
                                                 infomaniac.tabs.onPageLoad,
                                                 false);
        },

        // Unregister event listeners to stop detecting tab selection
        // changes.  Triggered when the extension is unloaded.
        onUnload: function() {
            var mainWindow = infomaniac.getMainWindow();
            var container = mainWindow.gBrowser.tabContainer;
            container.removeEventListener("TabSelect",
                                          infomaniac.tabs.onSelect, false);
        },

        // Determine if the sidebar needs to be updated to reflect a new page.
        // Triggered when a new page is loaded.
        onPageLoad: function(evt) {
            var document = evt.originalTarget;
            alert(document);
            if (document.nodeName == "#document") {
                alert("page-load");
            }
        },

        // Change the label that shows the current URL, to demonstrate
        // that we can detect tab selection changes.
        onSelect: function() {
            var mainWindow = infomaniac.getMainWindow();
            var label = window.document.getElementById("current-url");
            label.value = mainWindow.gBrowser.contentDocument.location.href;
        }
    },

    // Logic related to the behaviour of the "Follow" button.
    follow: {
        // Toggle the follow state of the current document.  Triggered
        // when the "Follow" button is pressed.
        onClick: function() {
            var button = window.document.getElementById("follow-button");
            button.label = button.label == "Follow" ? "Following" : "Follow";
        },

        // Change the name of the "Following" button to "Unfollow", to
        // make it clear what clicking it will do.  Triggered when the
        // "Follow" button is hovered upon.
        onMouseOver: function() {
            var button = window.document.getElementById("follow-button");
            if (button.label == "Following") {
                button.label = "Unfollow";
            }
        },

        // Change the "Unfollow" label back to "Following" if the
        // current document is followed.  Triggered when the mouse is
        // moved away from the "Follow" button.
        onMouseOut: function() {
            var button = window.document.getElementById("follow-button");
            if (button.label == "Unfollow") {
                button.label = "Following";
            }
        }
    }
};

window.addEventListener("load", infomaniac.onLoad, false);
window.addEventListener("unload", infomaniac.onUnload, false);
