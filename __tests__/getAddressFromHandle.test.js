import { getAddressFromHandle } from '../pages/test/getAddressFromHandle';

// Enable fetch mocking
fetchMock.enableMocks();

describe('getAddressFromHandle', () => {
  beforeEach(() => {
    // Reset fetch mock state before each test
    fetchMock.resetMocks();
  });

  it('returns the payment address when API call is successful', async () => {
    const handle = 'handle123';
    const paymentAddress = 'addr1...';

    // Mock the fetch API response
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          payment_address: paymentAddress,
        },
      ])
    );

    const result = await getAddressFromHandle(handle);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.koios.rest/api/v0/asset_nft_address?_asset_policy=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a&_asset_name=${Buffer.from(handle).toString('hex')}`
    );
    expect(result).toEqual(paymentAddress);
  });

  it('returns null when payment address is not found', async () => {
    const handle = 'handle123';

    // Mock the fetch API response
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          payment_address: null,
        },
      ])
    );

    const result = await getAddressFromHandle(handle);
    expect(result).toBeNull();
  });

  it('returns null when an error occurs', async () => {
    const handle = 'handle123';

    // Mock the fetch API to throw an error
    fetchMock.mockReject(new Error('API error'));

    const result = await getAddressFromHandle(handle);
    expect(result).toBeNull();
  });
});
