const https = require("https");

/**
 * Get a pet and it's data, includes attached tracker, type of animal, and other pet details.
 * @param {String} petID 
 * @returns {Object} Object
 */
async function getPet(petID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/trackable_object/${petID}`;
        const req = https.request(options, function (res) {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    parsedData.details.profile_picture_link = `https://graph.tractive.com/4/media/resource/${parsedData.details.profile_picture_id}.jpg`;
                    parsedData.details.cover_picture_link = `https://graph.tractive.com/4/media/resource/${parsedData.details.cover_picture_id}.jpg`;
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
 * Get a list of all pets on the account
 * @returns {Array} Array
 */
async function getPets() {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    return new Promise(function(resolve, reject) {
        let options = gloOpts;
        options.path = `/4/user/${accountDetails.uid}/trackable_objects`;
        const req = https.request(options, function (res) {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    // const parsedData = JSON.parse(rawData);
                    resolve(rawData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.end();
    });
}

module.exports = {
    getPet: getPet,
    getPets: getPets
}