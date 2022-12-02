const https = require("https");
const TractiveClient = "625e533dc3c3b41c28a669f0";
const tAccount = require('./src/account');
const tPet = require('./src/pet');
const tTracker = require('./src/tracker');
accountDetails = {
    email: "",
    password: ""
}
gloOpts = {
    method: "GET",
    hostname: "graph.tractive.com",
    path: ``,
    headers: {
        "X-Tractive-Client": TractiveClient,
        "Authorization": `Bearer ${accountDetails.token}`,
        "content-type": "application/json"
    }
};

isAuthenticated = function() {
    if(accountDetails?.token) return true;
    return false;
}

async function authenticate() {
    return new Promise(function(resolve, reject) {/4/
        const options = {
            "method": "POST",
            "hostname": "graph.tractive.com",
            "path": `/4/auth/token?grant_type=tractive&platform_email=${encodeURIComponent(accountDetails.email)}&platform_token=${encodeURIComponent(accountDetails.password)}`,
            "headers": {
                'X-Tractive-Client': TractiveClient,
                'Content-Type': "application/json"
            }
        };
        const req = https.request(options, function (res) {
            res.on('data', function(d) {
                // process.stdout.write(d + '\n\n');
                accountDetails.token = JSON.parse(d).access_token;
                accountDetails.uid = JSON.parse(d).user_id;
                gloOpts = {
                    method: "GET",
                    hostname: "graph.tractive.com",
                    path: ``,
                    headers: {
                        "X-Tractive-Client": TractiveClient,
                        "Authorization": `Bearer ${accountDetails.token}`,
                        "content-type": "application/json"
                    }
                };
                resolve(true);
            });
            res.on('error', function(err) {
                resolve(false);
            });
        });
        req.end();
    });
    return promise;
}

async function connect(email, password) {
    accountDetails.email = email;
    accountDetails.password = password;
    await authenticate();
    return isAuthenticated() ? true : false;
}

async function getTrackerGeofences(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/tracker/${trackerID}/geofences`;
        const req = https.request(options, function (res) {
            res.on('data', function(d) {
                let data = JSON.parse(d);
                resolve(data)
            });
        });
        req.end();
    });
}

async function getGeofence(fenceID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/geofence/${fenceID}`;
        const req = https.request(options, function (res) {
            res.on('data', function(d) {
                let data = JSON.parse(d);
                resolve(data)
            });
        });
        req.end();
    });
}

module.exports = {
    connect: connect,
    isAuthenticated: isAuthenticated,
    getAccountInfo: tAccount.getAccountInfo,
    getAccountSubscriptions: tAccount.getAccountSubscriptions,
    getAccountSubscription: tAccount.getAccountSubscription,
    getAccountShares: tAccount.getAccountShares,
    getPets: tPet.getPets,
    getPet: tPet.getPet,
    getAllTrackers: tTracker.getAllTrackers,
    getTracker: tTracker.getTracker,
    getTrackerHistory: tTracker.getTrackerHistory,
    getTrackerLocation: tTracker.getTrackerLocation,
    getTrackerHardware: tTracker.getTrackerHardware
}