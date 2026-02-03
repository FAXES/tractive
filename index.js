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
    const options = {
        method: "POST",
        headers: {
            'X-Tractive-Client': TractiveClient,
            'Content-Type': "application/json"
        }
    };

    const url = `https://graph.tractive.com/4/auth/token?grant_type=tractive&platform_email=${encodeURIComponent(accountDetails.email)}&platform_token=${encodeURIComponent(accountDetails.password)}`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();
        accountDetails.token = data.access_token;
        accountDetails.uid = data.user_id;
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
        return true;
    } catch (err) {
        return false;
    }
}

async function connect(email, password) {
    accountDetails.email = email;
    accountDetails.password = password;
    await authenticate();
    return isAuthenticated() ? true : false;
}

async function getTrackerGeofences(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/tracker/${trackerID}/geofences`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
}

async function getGeofence(fenceID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/geofence/${fenceID}`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
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
