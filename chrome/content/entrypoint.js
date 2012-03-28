// Initialize the extension.
infomaniac.load = function() {
    infomaniac.fluidinfoLink = new infomaniac.FluidinfoLink();
    infomaniac.sidebar = new infomaniac.Sidebar();
    infomaniac.sidebar.bindUI();
    infomaniac.sidebar.syncUI();
};

window.addEventListener("load", infomaniac.load, false);
