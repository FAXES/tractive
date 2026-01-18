import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { MockAgent, setGlobalDispatcher, getGlobalDispatcher } from 'undici';
import * as commands from '../src/commands.js';

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
const commandsMock = new MockAgent();
const mockPool = commandsMock.get('https://graph.tractive.com');

// Set up all mock interceptors
mockPool.intercept({
    path: `/4/tracker/tracker-1/command/live_tracking/on`,
    method: 'GET'
}).reply(200, { status: 'success' });

mockPool.intercept({
    path: `/4/tracker/tracker-1/command/live_tracking/off`,
    method: 'GET'
}).reply(200, { status: 'success' });

mockPool.intercept({
    path: `/4/tracker/tracker-1/command/led_control/on`,
    method: 'GET'
}).reply(200, { status: 'success' });

mockPool.intercept({
    path: `/4/tracker/tracker-1/command/led_control/off`,
    method: 'GET'
}).reply(200, { status: 'success' });

mockPool.intercept({
    path: `/4/tracker/tracker-1/command/buzzer_control/on`,
    method: 'GET'
}).reply(200, { status: 'success' });

mockPool.intercept({
    path: `/4/tracker/tracker-1/command/buzzer_control/off`,
    method: 'GET'
}).reply(200, { status: 'success' });

const originalDispatcher = getGlobalDispatcher();

describe('Commands', () => {
    beforeEach(() => {
        setGlobalDispatcher(commandsMock);
    });

    afterEach(() => {
        setGlobalDispatcher(originalDispatcher);
    });

  test('liveOn', async () => {
      const result = await commands.liveOn('tracker-1');
      assert.deepStrictEqual(result, { status: 'success' });
  });

  test('liveOff', async () => {
      const result = await commands.liveOff('tracker-1');
      assert.deepStrictEqual(result, { status: 'success' });
  });

  test('LEDOn', async () => {
      const result = await commands.LEDOn('tracker-1');
      assert.deepStrictEqual(result, { status: 'success' });
  });

  test('LEDOff', async () => {
      const result = await commands.LEDOff('tracker-1');
      assert.deepStrictEqual(result, { status: 'success' });
  });

  test('BuzzerOn', async () => {
      const result = await commands.BuzzerOn('tracker-1');
      assert.deepStrictEqual(result, { status: 'success' });
  });

  test('BuzzerOff', async () => {
      const result = await commands.BuzzerOff('tracker-1');
      assert.deepStrictEqual(result, { status: 'success' });
  });
});
