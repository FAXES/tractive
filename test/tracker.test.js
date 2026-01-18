import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { MockAgent, setGlobalDispatcher, getGlobalDispatcher } from 'undici';
import * as tracker from '../src/tracker.js';

// Set up global scope for modules
globalThis.accountDetails = {
    uid: "test-user-id",
    token: "test-token"
};

globalThis.gloOpts = {
    method: "GET",
    hostname: "graph.tractive.com",
    headers: {
        "X-Tractive-Client": "mock-client",
        "Authorization": `Bearer mock-auth`,
        "content-type": "application/json"
    }
};

globalThis.isAuthenticated = function () {
    if (accountDetails?.token) return true;
    return false;
}

// Set up mock agent and interceptors
const trackerMock = new MockAgent();
const mockPool = trackerMock.get('https://graph.tractive.com');

// Set up all mock interceptors
mockPool.intercept({
    path: `/4/user/test-user-id/trackers`,
    method: 'GET'
}).reply(200, { mock: 'all trackers' });

mockPool.intercept({
    path: `/4/tracker/tracker-1`,
    method: 'GET'
}).reply(200, { id: 'tracker-1', name: 'Tracker 1' });

mockPool.intercept({
    path: `/4/tracker/tracker-1/positions?time_from=1000&time_to=2000&format=json_segments`,
    method: 'GET'
}).reply(200, [{ position: 'mock position data' }]);

mockPool.intercept({
    path: `/4/device_pos_report/tracker-1`,
    method: 'GET'
}).reply(200, { latlong: [48.8566, 2.3522] });

mockPool.intercept({
    path: `/4/platform/geo/address/location?latitude=48.8566&longitude=2.3522`,
    method: 'GET'
}).reply(200, { address: 'Paris, France' });

mockPool.intercept({
    path: `/4/device_hw_report/tracker-1`,
    method: 'GET'
}).reply(200, { battery: 85, signal: 4 });

const originalDispatcher = getGlobalDispatcher();

describe('Tracker', () => {
    beforeEach(() => {
        setGlobalDispatcher(trackerMock);
    });

    afterEach(() => {
        setGlobalDispatcher(originalDispatcher);
    });

    test('getAllTrackers', async () => {
        const result = await tracker.getAllTrackers();
        assert.deepStrictEqual(result, { mock: 'all trackers' });
    });

    test('getTracker', async () => {
        const result = await tracker.getTracker('tracker-1');
        assert.deepStrictEqual(result, { id: 'tracker-1', name: 'Tracker 1' });
    });

    test('getTrackerHistory', async () => {
        const result = await tracker.getTrackerHistory('tracker-1', 1000, 2000);
        assert.deepStrictEqual(result, { position: 'mock position data' });
    });

    test('getTrackerLocation', async () => {
        const result = await tracker.getTrackerLocation('tracker-1');
        assert.deepStrictEqual(result, { latlong: [48.8566, 2.3522], address: { address: 'Paris, France' } });
    });

    test('getTrackerHardware', async () => {
        const result = await tracker.getTrackerHardware('tracker-1');
        assert.deepStrictEqual(result, { battery: 85, signal: 4 });
    });
});
