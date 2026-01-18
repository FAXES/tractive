import https from 'https';
import * as tAccount from './src/account.js';
import * as tPet from './src/pet.js';
import * as tTracker from './src/tracker.js';
import * as tCommands from './src/commands.js';

const TractiveClient = "6536c228870a3c8857d452e8";

globalThis.accountDetails = {
    email: "",
    password: ""
};

globalThis.gloOpts = {
    method: "GET",
    hostname: "graph.tractive.com",
    path: ``,
    headers: {
        "X-Tractive-Client": TractiveClient,
        "Authorization": `Bearer ${accountDetails.token}`,
        "content-type": "application/json"
    }
};

globalThis.isAuthenticated = function() {
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

export default {
    connect,
    isAuthenticated,
    getTrackerGeofences,
    getGeofence,
    // Account
    getAccountInfo: tAccount.getAccountInfo,
    getAccountSubscriptions: tAccount.getAccountSubscriptions,
    getAccountSubscription: tAccount.getAccountSubscription,
    getAccountShares: tAccount.getAccountShares,
    // Pet
    getPets: tPet.getPets,
    getPet: tPet.getPet,
    // Tracker
    getAllTrackers: tTracker.getAllTrackers,
    getTracker: tTracker.getTracker,
    getTrackerHistory: tTracker.getTrackerHistory,
    getTrackerLocation: tTracker.getTrackerLocation,
    getTrackerHardware: tTracker.getTrackerHardware,
    // Commands
    liveOn: tCommands.liveOn,
    liveOff: tCommands.liveOff,
    LEDOn: tCommands.LEDOn,
    LEDOff: tCommands.LEDOff,
    buzzerOn: tCommands.BuzzerOn,
    buzzerOff: tCommands.BuzzerOff
};
