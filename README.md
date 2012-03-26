Infomaniac is a Firefox extension for Fluidinfo.


Introduction
------------

Infomaniac is a Firefox extension that makes it easy to follow web
pages, see the info other people have stored and to add one's own info
about them.  The extension adds a sidebar to the browser and, as such,
must be XUL-based.  The sidebar contains a `browser` XUL element which
displays a mini-object browser served from `fluidinfo.com`.  As the
user changes tabs and pages the sidebar is updated to show the
relevant content.


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

You need to restart the browser whenever you make a change to the
extension logic before it will be visible.  When the browser is
running install the Firebug extension.  You'll need to use the
`infomaniac.log` function to write messages to the log; calls to
`console.log` succeed but the messages disappear into a blackhole.

When you use Firebug for the first time click on the little box next
to "Console" to enable it.  Then click on the little menu arrow beside
"Console" and turn on the following options:

- Show Chrome Errors
- Show Chrome Messages

They'll persist between browser restarts so you should only need to do
this once.


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

- https://developer.mozilla.org/en/Code_snippets/Tabbed_browser
- https://developer.mozilla.org/en/Code_snippets/On_page_load


Further information
-------------------

There are a number of resources you'll need to have on hand to
understand and modify the extension:

- https://developer.mozilla.org/en/XUL_Tutorial provides a nice
  introduction to XUL.
- https://developer.mozilla.org/en/XUL_Reference provides a list of XUL
  elements with links to detailed API documentation for each one.
- https://developer.mozilla.org/en/Code_snippets provides a list of
  examples, nicely organized by topic, which are indispensable when
  learning how to perform basic (and not-so-basic) tasks.
