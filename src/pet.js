/**
 * Get a pet and it's data, includes attached tracker, type of animal, and other pet details.
 * @param {String} petID 
 * @returns {Object} Object
 */
export async function getPet(petID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/trackable_object/${petID}`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const parsedData = await res.json();
    parsedData.details.profile_picture_link = `https://graph.tractive.com/4/media/resource/${parsedData.details.profile_picture_id}.jpg`;
    parsedData.details.cover_picture_link = `https://graph.tractive.com/4/media/resource/${parsedData.details.cover_picture_id}.jpg`;
    return parsedData;
}

/**
 * Get a list of all pets on the account
 * @returns {Array} Array
 */
export async function getPets() {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    const url = `https://graph.tractive.com/4/user/${accountDetails.uid}/trackable_objects`;
    const res = await fetch(url, {
        method: gloOpts.method,
        headers: gloOpts.headers
    });
    const data = await res.json();
    return data;
}
