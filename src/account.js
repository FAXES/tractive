/**
 * Gets Tractive account information.
 * @returns {Object} Object
 */
export async function getAccountInfo() {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/user/${accountDetails.uid}`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
}

/**
 * Get all account subscriptions
 * @returns {Array} Array
 */
export async function getAccountSubscriptions() {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/user/${accountDetails.uid}/subscriptions`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
}

/**
 * Get a subscription
 * @param {String} subscriptionID 
 * @returns {Object} Object
 */
export async function getAccountSubscription(subscriptionID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/subscription/${subscriptionID}`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
}

/**
 * Get a list of accounts you share trackers with
 * @returns {Array} Array
 */
export async function getAccountShares() {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/user/${accountDetails.uid}/shares`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
}
