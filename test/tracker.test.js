import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { MockAgent, setGlobalDispatcher } from 'undici';
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

describe('Tracker', () => {
    let mockAgent;

    beforeEach(() => {
        mockAgent = new MockAgent();
        setGlobalDispatcher(mockAgent);
    });

    afterEach(() => {
        mockAgent.close();
    });

  describe('getAllTrackers', () => {
    test('should fetch all trackers', async () => {
        const mockData = { mock: 'all trackers' };

        const mockPool = mockAgent.get('https://graph.tractive.com');
        mockPool.intercept({
            path: `/4/user/test-user-id/trackers`,
            method: 'GET'
        }).reply(200, mockData);

        const result = await tracker.getAllTrackers();
        assert.deepStrictEqual(result, mockData);
    });
  });

  describe('getTracker', () => {
    test('should fetch a tracker', async () => {
        const mockData = { id: 'tracker-1', name: 'Tracker 1' };
        const trackerId = 'tracker-1';

        const mockPool = mockAgent.get('https://graph.tractive.com');
        mockPool.intercept({
            path: `/4/tracker/${trackerId}`,
            method: 'GET'
        }).reply(200, mockData);

        const result = await tracker.getTracker(trackerId);
        assert.deepStrictEqual(result, mockData);
    });
  });

  describe('getTrackerHistory', () => {
    test('should fetch tracker history', async () => {
        const mockData = [{ position: 'mock position data' }];
        const trackerId = 'tracker-1';
        const from = 1000;
        const to = 2000;

        const mockPool = mockAgent.get('https://graph.tractive.com');
        mockPool.intercept({
            path: `/4/tracker/${trackerId}/positions?time_from=${from}&time_to=${to}&format=json_segments`,
            method: 'GET'
        }).reply(200, mockData);

        const result = await tracker.getTrackerHistory(trackerId, from, to);
        assert.deepStrictEqual(result, mockData[0]);
    });
  });

  describe('getTrackerLocation', () => {
    test('should fetch tracker location', async () => {
        const mockLocationData = { latlong: [48.8566, 2.3522] };
        const mockAddressData = { address: 'Paris, France' };
        const trackerId = 'tracker-1';

        const mockPool = mockAgent.get('https://graph.tractive.com');
        mockPool.intercept({
            path: `/4/device_pos_report/${trackerId}`,
            method: 'GET'
        }).reply(200, mockLocationData);

        mockPool.intercept({
            path: `/4/platform/geo/address/location?latitude=48.8566&longitude=2.3522`,
            method: 'GET'
        }).reply(200, mockAddressData);

        const result = await tracker.getTrackerLocation(trackerId);
        assert.deepStrictEqual(result, { ...mockLocationData, address: mockAddressData });
    });
  });

  describe('getTrackerHardware', () => {
    test('should fetch tracker hardware info', async () => {
        const mockData = { battery: 85, signal: 4 };
        const trackerId = 'tracker-1';

        const mockPool = mockAgent.get('https://graph.tractive.com');
        mockPool.intercept({
            path: `/4/device_hw_report/${trackerId}`,
            method: 'GET'
        }).reply(200, mockData);

        const result = await tracker.getTrackerHardware(trackerId);
        assert.deepStrictEqual(result, mockData);
    });
  });
});
