// getStakeAddressFromWallet.test.js
import { getStakeAddressFromWallet } from '../pages/test/getStakeAddressFromWallet';

// Mock window.cardano
global.window.cardano = {
  typhoncip30: { enable: jest.fn() },
  eternl: { enable: jest.fn() },
  nami: { enable: jest.fn() },
  flint: { enable: jest.fn() },
};

describe('getStakeAddressFromWallet', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the stake address for Typhon Wallet', async () => {
    window.cardano.typhoncip30.enable.mockResolvedValue('api_sample');
    const result = await getStakeAddressFromWallet('Typhon Wallet');
    expect(result).toEqual('stake_address_sample');
  });

  it('should return the stake address for Eternl', async () => {
    window.cardano.eternl.enable.mockResolvedValue('api_sample');
    const result = await getStakeAddressFromWallet('eternl');
    expect(result).toEqual('stake_address_sample');
  });

  it('should return the stake address for Nami', async () => {
    window.cardano.nami.enable.mockResolvedValue('api_sample');
    const result = await getStakeAddressFromWallet('Nami');
    expect(result).toEqual('stake_address_sample');
  });

  it('should return the stake address for Flint Wallet', async () => {
    window.cardano.flint.enable.mockResolvedValue('api_sample');
    const result = await getStakeAddressFromWallet('Flint Wallet');
    expect(result).toEqual('stake_address_sample');
  });

  it('should return null for an unknown wallet', async () => {
    const result = await getStakeAddressFromWallet('Unknown Wallet');
    expect(result).toBeNull();
  });

  it('should return null when an error is thrown', async () => {
    window.cardano.typhoncip30.enable.mockRejectedValue(new Error('Error connecting'));
    const result = await getStakeAddressFromWallet('Typhon Wallet');
    expect(result).toBeNull();
  });
});
