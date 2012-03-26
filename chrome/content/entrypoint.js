// Initialize the extension.
infomaniac.load = function() {
    infomaniac.fluidinfoLink = new infomaniac.FluidinfoLink();
    infomaniac.view = new infomaniac.SidebarView();
    infomaniac.view.bindUI();
    infomaniac.view.syncUI();
};

window.addEventListener("load", infomaniac.load, false);
