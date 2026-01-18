import https from 'https';

/**
 * Toggle live tracking mode on for a tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function liveOn(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/tracker/${trackerID}/command/live_tracking/on`;
        const req = https.request(options, function (res) {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.end();
    });
}

/**
 * Toggle live tracking mode off for a tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function liveOff(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/tracker/${trackerID}/command/live_tracking/off`;
        const req = https.request(options, function (res) {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.end();
    });
}


/**
 * Turn the trackers LED light on for the specified tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function LEDOn(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/tracker/${trackerID}/command/led_control/on`;
        const req = https.request(options, function (res) {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.end();
    });
}

/**
 * Turn the trackers LED light off for the specified tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function LEDOff(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/tracker/${trackerID}/command/led_control/off`;
        const req = https.request(options, function (res) {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.end();
    });
}


/**
 * Turn the trackers buzzer sound on for the specified tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function BuzzerOn(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/tracker/${trackerID}/command/buzzer_control/on`;
        const req = https.request(options, function (res) {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.end();
    });
}

/**
 * Turn the trackers buzzer sound off for the specified tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
export async function BuzzerOff(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/tracker/${trackerID}/command/buzzer_control/off`;
        const req = https.request(options, function (res) {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.end();
    });
}
