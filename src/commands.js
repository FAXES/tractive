/**
 * Toggle live tracking mode on for a tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function liveOn(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/tracker/${trackerID}/command/live_tracking/on`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
}

/**
 * Toggle live tracking mode off for a tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function liveOff(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/tracker/${trackerID}/command/live_tracking/off`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
}


/**
 * Turn the trackers LED light on for the specified tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function LEDOn(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/tracker/${trackerID}/command/led_control/on`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
}

/**
 * Turn the trackers LED light off for the specified tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function LEDOff(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/tracker/${trackerID}/command/led_control/off`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
}


/**
 * Turn the trackers buzzer sound on for the specified tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function BuzzerOn(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/tracker/${trackerID}/command/buzzer_control/on`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
}

/**
 * Turn the trackers buzzer sound off for the specified tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function BuzzerOff(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/tracker/${trackerID}/command/buzzer_control/off`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
}
