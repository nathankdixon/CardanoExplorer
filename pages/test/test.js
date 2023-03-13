const assert = require('assert');
const { getStakeAddressFromWallet } = require('./../index');

describe('getStakeAddressFromWallet', () => {
  it('should return null if wallet connection fails', async () => {
    const result = await getStakeAddressFromWallet('Invalid Wallet');
    assert.strictEqual(result, null);
  });

  it('should return a valid stake address for a connected wallet', async () => {
    const result = await getStakeAddressFromWallet('Nami');
    assert.notStrictEqual(result, null);
    assert.strictEqual(typeof result, 'string');
  });
});
