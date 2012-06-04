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

// Return the global preferences object.
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

// Add a listener saving the callback for future clean removal.
infomaniac.addListener = function(target, event, callback) {
    infomaniac._listeners = infomaniac._listeners || [];
    infomaniac._listeners.push([target, event, callback]);
    target.addEventListener(event, callback);
};

// Remove all listeners added with infomaniac.addListener
infomaniac.removeAllListeners = function() {
    if (infomaniac._listeners) {
        for (var i=0; i<infomaniac._listeners.length; i++) {
            var target = infomaniac._listeners[i][0];
            var event = infomaniac._listeners[i][1];
            var callback = infomaniac._listeners[i][2];
            target.removeEventListener(event, callback);
        }
    }
    infomaniac._listeners = [];
};
