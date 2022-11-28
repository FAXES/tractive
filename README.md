This is a simple wrapper using Tractive to have an API of sorts to make multiple types of requests to Tractive and recieve data on your account and pet.

### Contents
- [Getting Started](#Getting-Started)
- [All functions](#All-Functions)
- [Other](#Other)

### Getting Started

```js
const tractive = require('tractive');

/*
Connect to Tractive services:
Return true if successful and connected or returns false is not connected.
*/
tractive.connect('TRACTIVE_ACCOUNT_EMAIL', 'TRACTIVE_ACCOUNT_PASSWORD')

/*
Check if Tractive has authenticated:
Returns true if the tractive.connect() is successful and connected.
*/
tractive.isAuthenticated() ? true : false;

tractive.getAllTrackers().then(function(trackers) {
    /*
    trackers = [
        {
            "_id":"ABCDEFGH",
            "_type":"tracker",
            "_version":"0000000e-0000000-0000000000"
        }
    ]
    */
});

/*
Gets a defined tracker and returns its latest report data along with address.
*/
tractive.getTrackerLocation().then(function(tracker) {
    /*
    tracker = {
        time: 1669530259,
        time_rcvd: 1669530274,
        sensor_used: 'GPS',
        pos_status: [ 'STATIONARY_FIX' ],
        latlong: [ -30.234736, 129.16563 ],
        speed: 0,
        pos_uncertainty: 14,
        _id: 'ABCDEFGH',
        _type: 'device_pos_report',
        _version: '4daf8f322',
        altitude: 121,
        report_id: '00000000000000',
        nearby_user_id: null,
        power_saving_zone_id: null,
        address: {
            street: 'My Street Road',
            house_number: '10',
            zip_code: '0000',
            city: 'Anyville',
            country: 'AU',
            full_address: 'My Street Road 10, 0000 Anyville'
        }
    }
    */
});
```

### All Functions

```js
getAccountInfo()
getAccountSubscriptions()
getAccountSubscription(subscriptionID)
getAccountShares()

getPets()
getPet(PetID)

getAllTrackers()
getTracker(trackerID)
getTrackerHistory(trackerID, from, to) // 'from' and 'to' are Date() functions or timestamps (in ms).
getTrackerLocation(trackerID) // Get the latest report that the tracker uploaded.
getTrackerHardware(trackerID) // Get the latest hardware report that was sent. This includes battery levels.
```

---

### Other

- [Suggest a new feature](https://github.com/FAXES/tractive/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=)
- [Let us know of an issue](https://github.com/FAXES/tractive/issues/new?assignees=&labels=bug&template=bug_report.md&title=)

Created by [Weblutions](https://weblutions.com)

**Disclaimer**
*This personal project is maintained in spare time and has no business goal. Terms and logos related to Tractive are respective of their holders. This is not maintained or created by Tractive.*
<small>However, Tractive you're welcome to have the package name if you every have an official API 💖</small>
