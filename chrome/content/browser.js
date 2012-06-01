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

// Get a function that will run a callback with a specific context.
infomaniac.bind = function(callback, context) {
    return function() {
        callback.apply(context, arguments);
    };
};
