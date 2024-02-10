const https = require("https");

/**
 * Gets Tractive account information.
 * @returns {Object} Object
 */
async function getAccountInfo() {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/user/${accountDetails.uid}`;
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
 * Get all account subscriptions
 * @returns {Array} Array
 */
async function getAccountSubscriptions() {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/user/${accountDetails.uid}/subscriptions`;
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
 * Get a subscription
 * @param {String} subscriptionID 
 * @returns {Object} Object
 */
async function getAccountSubscription(subscriptionID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/subscription/${subscriptionID}`;
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
 * Get a list of accounts you share trackers with
 * @returns {Array} Array
 */
async function getAccountShares() {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/user/${accountDetails.uid}/shares`;
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
    getAccountInfo: getAccountInfo,
    getAccountSubscriptions: getAccountSubscriptions,
    getAccountSubscription: getAccountSubscription,
    getAccountShares: getAccountShares
}