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
    },

    // Triggered when the window's "unload" event is fired.
    onUnload: function() {
    },

    // Logic related to the behaviour of the "Follow" button.
    follow: {
        // Triggered when the "Follow" button is pressed.
        onClick: function() {
            var button = window.document.getElementById("follow-button");
            if (button.label == "Follow") {
                button.label = "Following";
            } else if (button.label == "Unfollow" ||
                       button.label == "Following") {
                button.label = "Follow";
            }
        },

        // Triggered when the "Follow" button is hovered upon.
        onMouseOver: function() {
            var button = window.document.getElementById("follow-button");
            if (button.label == "Following") {
                button.label = "Unfollow";
            }
        },

        // Triggered when the mouse is moved away from the "Follow" button.
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
