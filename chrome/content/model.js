// WebpageCollection contains a cache of pages that we have Fluidinfo
// data for.
infomaniac.WebpageCollection = function() {
    this.pages = {};
};

// Get a Webpage instance for the specified page.  Returns undefined
// if the page doesn't exist in the collection.
infomaniac.WebpageCollection.prototype.get = function(url) {
    return this.pages[url];
};

// Load details about the webpage from Fluidinfo, put a new Webpage
// instance in the page cache and notify the callback with the URL
// parameter.
infomaniac.WebpageCollection.prototype.load = function(url, callback) {
    infomaniac.log("Fetching page data from Fluidinfo: " + url);
    this.pages[url] = new infomaniac.Webpage(url);
    callback(url);
};


// Webpage contains the state of an individual webpage.
infomaniac.Webpage = function(url) {
    this.url = url;
};
