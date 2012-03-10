Infomanic is a Firefox extension for Fluidinfo.


Introduction
------------

Infomaniac is a Firefox extension that makes it easy to follow web
pages, see the info other people have stored and to add one's own info
about them.  The extension adds a sidebar to the browser and, as such,
must be XUL-based.


Development and testing
-----------------------

Follow the instructions here to prepare a development profile and
tweak some settings to get information about errors when the extension
runs:

  https://developer.mozilla.org/en/Setting_up_extension_development_environment

When that's done put a file in `~/.mozilla/firefox/<profile>/extensions`
called `infomaniac@fluidinfo.com` with a single line containing the
path to this repository.  Start Firefox and hit `Ctrl-Shift-f` to see
the extension in action:

    /usr/bin/firefox -no-remote -P dev


Handling page and tab changes
-----------------------------

The extension needs to detect a few several kinds of state changes and
update itself to ensure that the content it displays always matches
the current page:

- A new tab is opened showing the empty `about:blank` page.
- A new tab is opened showing a page that can be followed.
- The active tab is switched from one to another.
- The page in the active tab isn't loaded yet.
- The page in the active tab finishes loading.
- The page in the active tab is changed.
- The page in an inactive tab has changed since the last time the
  extension updated itself (say because of an automatic refresh or
  because a page was loading slowly and the user switched away while
  it finished).

As you can see many things can happen that must result in the
extension updating its state.  The way it does this is by listening
for and responding to a combination of events, which are described on
these pages:

  https://developer.mozilla.org/en/Code_snippets/Tabbed_browser
  https://developer.mozilla.org/en/Code_snippets/On_page_load


Further information
-------------------

There are a number of resources you'll need to have on hand to
understand and modify the extension:

- https://developer.mozilla.org/en/XUL_Reference provides a list of XUL
  elements with links to detailed API documentation for each one.
- https://developer.mozilla.org/en/Code_snippets provides a list of
  examples, nicely organized by topic, which are indispensable when
  learning how to perform basic (and not-so-basic) tasks.
