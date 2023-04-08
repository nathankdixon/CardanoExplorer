import Token from '../token';
import { createWalletDataFromStake } from './createWalletData';

// Mock the fetch function
global.fetch = jest.fn();

const testStakeAddress = 'testStakeAddress';

describe('createWalletDataFromStake', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return wallet data with no assets', async () => {
    fetch.mockResolvedValueOnce({ json: async () => [{}] });

    const walletData = await createWalletDataFromStake(testStakeAddress);

    expect(walletData).toEqual({
      stake: testStakeAddress,
      tokenNumber: 0,
      projectNumber: 0,
      nfts: [],
      fts: [],
    });
  });

  it('should return wallet data with 1 asset', async () => {
    const mockAssetList = [
      {
        asset_name: 'testAssetName',
        policy_id: 'testPolicyId1',
        decimals: 0,
        quantity: 1,
      },
    ];
    fetch.mockResolvedValueOnce({ json: async () => [{ asset_list: mockAssetList }] });

    // Mock Token class methods
    jest.spyOn(Token.prototype, 'fetchTokenMetadata').mockImplementation(() => {});
    jest.spyOn(Token.prototype, 'getPrice').mockImplementation(() => {});

    const walletData = await createWalletDataFromStake(testStakeAddress);

    expect(walletData.stake).toEqual(testStakeAddress);
    expect(walletData.tokenNumber).toEqual(1);
    expect(walletData.projectNumber).toEqual(1);
    expect(walletData.nfts.length).toBeGreaterThan(0);
    expect(walletData.fts.length).toEqual(0);
  });

  it('should return wallet data with 2 assets of the same policy', async () => {
    const mockAssetList = [
      {
        asset_name: 'testAssetName',
        policy_id: 'testPolicyId1',
        decimals: 0,
        quantity: 1,
      },
      {
        asset_name: 'testAssetName',
        policy_id: 'testPolicyId1',
        decimals: 0,
        quantity: 1,
      },
    ];
    fetch.mockResolvedValueOnce({ json: async () => [{ asset_list: mockAssetList }] });

    // Mock Token class methods
    jest.spyOn(Token.prototype, 'fetchTokenMetadata').mockImplementation(() => {});
    jest.spyOn(Token.prototype, 'getPrice').mockImplementation(() => {});

    const walletData = await createWalletDataFromStake(testStakeAddress);

    expect(walletData.stake).toEqual(testStakeAddress);
    expect(walletData.tokenNumber).toEqual(2);
    expect(walletData.projectNumber).toEqual(1);
    expect(walletData.nfts.length).toBeGreaterThan(0);
    expect(walletData.fts.length).toEqual(0);
  });

  it('should return wallet data with 2 assets with different policy Ids', async () => {
    const mockAssetList = [
      {
        asset_name: 'testAssetName',
        policy_id: 'testPolicyId1',
        decimals: 0,
        quantity: 1,
      },
      {
        asset_name: 'testAssetName',
        policy_id: 'testPolicyId2',
        decimals: 0,
        quantity: 1,
      },
    ];
    fetch.mockResolvedValueOnce({ json: async () => [{ asset_list: mockAssetList }] });

    // Mock Token class methods
    jest.spyOn(Token.prototype, 'fetchTokenMetadata').mockImplementation(() => {});
    jest.spyOn(Token.prototype, 'getPrice').mockImplementation(() => {});

    const walletData = await createWalletDataFromStake(testStakeAddress);

    expect(walletData.stake).toEqual(testStakeAddress);
    expect(walletData.tokenNumber).toEqual(2);
    expect(walletData.projectNumber).toEqual(2);
    expect(walletData.nfts.length).toBeGreaterThan(0);
    expect(walletData.fts.length).toEqual(0);
  });

  // Add more test cases for different scenarios, such as error handling.
});
