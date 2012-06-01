// Get the main content window.
infomaniac.getMainWindow = function() {
    var interfaces = Components.interfaces;
    return window.QueryInterface(interfaces.nsIInterfaceRequestor)
        .getInterface(interfaces.nsIWebNavigation)
        .QueryInterface(interfaces.nsIDocShellTreeItem)
        .rootTreeItem
        .QueryInterface(interfaces.nsIInterfaceRequestor)
        .getInterface(interfaces.nsIDOMWindow);
};

infomaniac.getPreferences = function() {
    return Components
        .classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefService)
        .getBranch("extensions.infomaniac.");
};

// Get a function that will run a callback with a specific context.
infomaniac.bind = function(callback, context) {
    return function() {
        callback.apply(context, arguments);
    };
};
