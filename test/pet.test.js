import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { MockAgent, setGlobalDispatcher, getGlobalDispatcher } from 'undici';
import * as pet from '../src/pet.js';

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
const petMock = new MockAgent();
const mockPool = petMock.get('https://graph.tractive.com');

// Set up all mock interceptors
mockPool.intercept({
    path: `/4/user/test-user-id/trackable_objects`,
    method: 'GET'
}).reply(200, [{ id: 'pet-1', name: 'Fluffy', type: 'dog' }]);

const originalDispatcher = getGlobalDispatcher();

describe('Pet', () => {
    beforeEach(() => {
        setGlobalDispatcher(petMock);
    });

    afterEach(() => {
        setGlobalDispatcher(originalDispatcher);
    });

  describe('getPets', () => {
    test('should fetch all pets', async () => {
        const result = await pet.getPets();
        assert.deepStrictEqual(result, [{ id: 'pet-1', name: 'Fluffy', type: 'dog' }]);
    });
  });
});
