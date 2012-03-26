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
        this.pages[url] = new infomaniac.Webpage(url, result.data,
                                                 this.client);
        callback(this.pages[url]);
    };

    if (this.pages[url] !== undefined) {
        callback(this.pages[url]);
    } else {
        this.client.getObject({about: url, select: ["infomaniac/follows"],
                               onSuccess: infomaniac.bind(succeeded, this)});
    }
};


// Webpage contains the state of an individual webpage.
infomaniac.Webpage = function(url, tags, client) {
    this.url = url;
    this.tags = tags;
    this.client = client;
};

// Follow this page in Fluidinfo.  The callback will be invoked with
// this page and the results of the operation as arguments.
infomaniac.Webpage.prototype.follow = function(callback) {
    var succeeded = function(result) {
        this.tags["infomaniac/follows"] = null;
        callback(this, result);
    };

    this.client.tag({values: {"infomaniac/follows": null},
                     about: this.url,
                     onSuccess: infomaniac.bind(succeeded, this)});
};

// Unfollow this page in Fluidinfo.  The callback will be invoked with
// this page and the results of the operation as arguments.
infomaniac.Webpage.prototype.unfollow = function(callback) {
    var succeeded = function(result) {
        delete this.tags["infomaniac/follows"];
        callback(this, result);
    };

    this.client.del({tags: ["infomaniac/follows"],
                     where: 'fluiddb/about = "' + this.url + '"',
                     onSuccess: infomaniac.bind(succeeded, this)});
};
