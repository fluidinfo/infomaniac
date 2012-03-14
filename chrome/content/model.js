// WebpageCollection contains a cache of all known pages.
infomaniac.WebpageCollection = function() {
    this.pages = undefined;
};

// Get a Webpage instance for the specified page.  Returns undefined
// if the page doesn't exist in the collection.
infomaniac.WebpageCollection.prototype.get = function(url) {
    return this.pages[url];
};

infomanic.WebpageCollection.prototype.load = function(url, callback) {
};


// Webpage contains the state of an individual webpage.
infomaniac.Webpage = function(url) {
    this.url = url;
};

infomaniac.Webpage.prototype.tag = function(tagPath, value) {
};

infomaniac.Webpage.prototype.untag = function(tagPath) {
};
