// WebpageCollection contains a cache of pages that we have Fluidinfo
// data for.
infomaniac.WebpageCollection = function(client) {
    this.client = client;
    this.pages = {};
};

// Get information about the specified URL and fire the specified
// callback with the matching Webpage instance.
infomaniac.WebpageCollection.prototype.get = function(url, callback) {
    var succeeded = function(result) {
        infomaniac.log("Received updates from Fluidinfo...");
        this.pages[url] = new infomaniac.Webpage(url, result);
        callback(this.pages[url]);
    };

    if (this.pages[url] !== undefined) {
        infomaniac.log("Notifying callback for " + url);
        callback(this.pages[url]);
    } else {
        infomaniac.log("Calling Fluidinfo...");
        this.client.getObject({about: url, select: ["infomaniac/follow"],
                               onSuccess: infomaniac.bind(succeeded, this)});
    }
};


// Webpage contains the state of an individual webpage.
infomaniac.Webpage = function(url, tags) {
    this.url = url;
    this.tags = tags;
};
