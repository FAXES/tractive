/**
 * Get an array of all trackers on the account
 * @returns {Array}
 */
export async function getAllTrackers() {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/user/${accountDetails.uid}/trackers`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const trackers = await res.json();
    return trackers;
}

/**
 * Get the specified tracker
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function getTracker(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/tracker/${trackerID}`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const tracker = await res.json();
    return tracker;
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
    let calcFrom = typeof from == "object" ? (from.getTime() / 1000).toFixed(0) : from;
    let calcTo = typeof to == "object"  ? (to.getTime() / 1000).toFixed(0) : to;
    const url = `https://graph.tractive.com/4/tracker/${encodeURIComponent(trackerID)}/positions?time_from=${encodeURIComponent(calcFrom)}&time_to=${encodeURIComponent(calcTo)}&format=json_segments`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const parsedData = await res.json();
    return parsedData[0];
}

/**
 * Get the latest position report for the tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function getTrackerLocation(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/device_pos_report/${trackerID}`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    const addressUrl = `https://graph.tractive.com/4/platform/geo/address/location?latitude=${encodeURIComponent(data.latlong[0])}&longitude=${encodeURIComponent(data.latlong[1])}`;
    try {
        const addressRes = await fetch(addressUrl, {
            method: gloOpts.method,
            headers: gloOpts.headers
        });
        const address = await addressRes.json();
        data.address = address;
    } catch (err) {
        // ignore address fetch error
    }
    return data;
}

/**
 * Get the latest hardware report for the tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function getTrackerHardware(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/device_hw_report/${trackerID}`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
}
