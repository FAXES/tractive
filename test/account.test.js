import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { MockAgent, setGlobalDispatcher, getGlobalDispatcher } from 'undici';
import * as account from '../src/account.js';

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
const accountMock = new MockAgent();
const mockPool = accountMock.get('https://graph.tractive.com');

// Set up all mock interceptors
mockPool.intercept({
    path: `/4/user/test-user-id`,
    method: 'GET'
}).reply(200, { id: 'test-user-id', name: 'Test User' });

mockPool.intercept({
    path: `/4/user/test-user-id/subscriptions`,
    method: 'GET'
}).reply(200, [{ id: 'sub-1', status: 'active' }]);

mockPool.intercept({
    path: `/4/user/test-user-id/shares`,
    method: 'GET'
}).reply(200, [{ id: 'share-1', email: 'friend@example.com' }]);

const originalDispatcher = getGlobalDispatcher();

describe('Account', () => {
    beforeEach(() => {
        setGlobalDispatcher(accountMock);
    });

    afterEach(() => {
        setGlobalDispatcher(originalDispatcher);
    });

  test('getAccountInfo', async () => {
    const result = await account.getAccountInfo();
    assert.deepStrictEqual(result, { id: 'test-user-id', name: 'Test User' });
  });

  test('getAccountSubscriptions', async () => {
    const result = await account.getAccountSubscriptions();
    assert.deepStrictEqual(result, [{ id: 'sub-1', status: 'active' }]);
  });

  test('getAccountShares', async () => {
    const result = await account.getAccountShares();
    assert.deepStrictEqual(result, [{ id: 'share-1', email: 'friend@example.com' }]);
  });
});
