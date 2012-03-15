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

// Write a message to the Firebug console.  This function is safe to
// call whether Firebug is installed or not.
infomaniac.log = function(message) {
    var mainWindow = infomaniac.getMainWindow();
    if (mainWindow.Firebug !== undefined) {
        mainWindow.Firebug.Console.log(message);
    }
};

// Get a function that will run a callback with a specific context.
infomaniac.bind = function(callback, context) {
    return function() {
        callback.apply(context, arguments);
    };
};
