import https from 'https';

/**
 * Get an array of all trackers on the account
 * @returns {Array}
 */
export async function getAllTrackers() {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/user/${accountDetails.uid}/trackers`;
        const req = https.request(options, function (res) {
            res.on('data', function(d) {
                let trackers = JSON.parse(d);
                resolve(trackers)
            });
        });
        req.end();
    });
}

/**
 * Get the specified tracker
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function getTracker(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/tracker/${trackerID}`;
        const req = https.request(options, function (res) {
            res.on('data', function(d) {
                let tracker = JSON.parse(d);
                resolve(tracker)
            });
        });
        req.end();
    });
}

/**
 * Get the history of locations for a specified tracker
 * @param {String} trackerID 
 * @param {Number} from 
 * @param {Number} to 
 * @returns {Array} Array
 */
export async function getTrackerHistory(trackerID, from, to) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let calcFrom = typeof from == "object" ? (from.getTime() / 1000).toFixed(0) : from;
        let calcTo = typeof to == "object"  ? (to.getTime() / 1000).toFixed(0) : to;
        let options = gloOpts;
        options.path = `/4/tracker/${encodeURIComponent(trackerID)}/positions?time_from=${encodeURIComponent(calcFrom)}&time_to=${encodeURIComponent(calcTo)}&format=json_segments`;
        const req = https.request(options, function (res) {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData[0]);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.end();
    });
}

/**
 * Get the latest position report for the tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function getTrackerLocation(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/device_pos_report/${trackerID}`;
        const req = https.request(options, function (res) {
            res.on('data', function(d) {
                let data = JSON.parse(d);
                let options = gloOpts;
                options.path = `/4/platform/geo/address/location?latitude=${encodeURIComponent(data.latlong[0])}&longitude=${encodeURIComponent(data.latlong[1])}`;
                const req2 = https.request(options, function (res2) {
                    res2.on('data', function(d2) {
                        let address = JSON.parse(d2);
                        data.address = address;
                        resolve(data)
                    });
                    res2.on('error', function(err) {
                        resolve(data)
                    });
                });
                req2.end();
            });
        });
        req.end();
    });
}

/**
 * Get the latest hardware report for the tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function getTrackerHardware(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/device_hw_report/${trackerID}`;
        const req = https.request(options, function (res) {
            res.on('data', function(d) {
                let data = JSON.parse(d);
                resolve(data)
            });
        });
        req.end();
    });
}
