const https = require("https");
const TractiveClient = "625e533dc3c3b41c28a669f0";

/**
 * Toggle live tracking mode on for a tracker.
 * @param {String} trackerID 
 * @returns {Object} Object
 */
async function liveOn(trackerID) {
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
async function liveOff(trackerID) {
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
async function LEDOn(trackerID) {
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
async function LEDOff(trackerID) {
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
async function BuzzerOn(trackerID) {
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
async function BuzzerOff(trackerID) {
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

module.exports = {
    liveOn: liveOn,
    liveOff: liveOff,
    LEDOn: LEDOn,
    LEDOff: LEDOff,
    BuzzerOn: BuzzerOn,
    BuzzerOff: BuzzerOff
}