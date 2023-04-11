import { getStakeFromAddress } from '../pages/test/getStakeFromAddress';

// Enable fetch mocking
fetchMock.enableMocks();

describe('getStakeFromAddress', () => {
  beforeEach(() => {
    // Reset fetch mock state before each test
    fetchMock.resetMocks();
  });

  it('returns the stake address when API call is successful', async () => {
    const address = 'addr1...';
    const stakeAddress = 'stake1...';

    // Mock the fetch API response
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          stake_address: stakeAddress,
        },
      ])
    );

    const result = await getStakeFromAddress(address);
    expect(fetch).toHaveBeenCalledWith('https://api.koios.rest/api/v0/address_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        '_addresses': [
          address,
        ],
      }),
    });
    expect(result).toEqual(stakeAddress);
  });

  it('returns null when stake address is not found', async () => {
    const address = 'addr1...';

    // Mock the fetch API response
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          stake_address: null,
        },
      ])
    );

    const result = await getStakeFromAddress(address);
    expect(result).toBeNull();
  });

  it('returns null when an error occurs', async () => {
    const address = 'addr1...';

    // Mock the fetch API to throw an error
    fetchMock.mockReject(new Error('API error'));

    const result = await getStakeFromAddress(address);
    expect(result).toBeNull();
  });
});
