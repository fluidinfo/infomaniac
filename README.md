Infomanic is a Firefox extension for Fluidinfo.


Introduction
------------

Infomaniac is a Firefox extension that makes it easy for a user to use
Fluidinfo while they're surfing the web.  The extension adds a sidebar
to the browser and, as such, must be XUL-based.


Development
-----------

Follow the instructions here to prepare a development profile and
tweak some settings to get information about errors when the extension
runs:

https://developer.mozilla.org/en/Setting_up_extension_development_environment

When that's done put a file in `~/.mozilla/firefox/<profile>/extensions`
called `infomaniac@fluidinfo.com` with a single line containing the
path to this repository.  Start Firefox and hit `Ctrl-Shift-f` to see
the extension in action:

    /usr/bin/firefox -no-remote -P dev
