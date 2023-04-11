import { parseUrlParameter } from "../pages/test/parseUrlParameter";

describe('parseUrlParameter', () => {
  it('returns WalletData when input is "stake123"', async () => {
    const input = 'stake123';
    const expected = 'WalletData';
    const result = await parseUrlParameter(input);
    expect(result).toEqual(expected);
  });

  it('returns WalletData when input is "stake1uy9mf6hjqfgug2n0r309knp8j4re9d8s7qrq7pt57hyqn4q9q63km"', async () => {
    const input = 'stake1uy9mf6hjqfgug2n0r309knp8j4re9d8s7qrq7pt57hyqn4q9q63km';
    const expected = 'WalletData';
    const result = await parseUrlParameter(input);
    expect(result).toEqual(expected);
  });

  it('returns WalletDataFromHandle when input is "$handle123"', async () => {
    const input = '$handle123';
    const expected = 'WalletDataFromHandle';
    const result = await parseUrlParameter(input);
    expect(result).toEqual(expected);
  });

  it('returns WalletDataFromHandle when input is "$nath"', async () => {
    const input = '$nath';
    const expected = 'WalletDataFromHandle';
    const result = await parseUrlParameter(input);
    expect(result).toEqual(expected);
  });

  it('returns WalletDataFromHandle when input is "$alex"', async () => {
    const input = '$alex';
    const expected = 'WalletDataFromHandle';
    const result = await parseUrlParameter(input);
    expect(result).toEqual(expected);
  });

  it('returns WalletDataFromAddress when input is "addr1qypqdhr0t4r7as4crn6dla8hts7swl0u2jl0rudfyhmykcgtkn40yqj3cs4x78z7tdxz0928j260puqxpuzhfawgp82q0gwpgh"', async () => {
    const input = 'addr1qypqdhr0t4r7as4crn6dla8hts7swl0u2jl0rudfyhmykcgtkn40yqj3cs4x78z7tdxz0928j260puqxpuzhfawgp82q0gwpgh';
    const expected = 'WalletDataFromAddress';
    const result = await parseUrlParameter(input);
    expect(result).toEqual(expected);
  });

  it('returns WalletDataFromAddress when input is "addr1q9f2fmdnsfc8fvte3wh7vgcuuasxk8qn07axca2mgzt7lqqtkn40yqj3cs4x78z7tdxz0928j260puqxpuzhfawgp82qu3wmmk"', async () => {
    const input = 'addr1q9f2fmdnsfc8fvte3wh7vgcuuasxk8qn07axca2mgzt7lqqtkn40yqj3cs4x78z7tdxz0928j260puqxpuzhfawgp82qu3wmmk';
    const expected = 'WalletDataFromAddress';
    const result = await parseUrlParameter(input);
    expect(result).toEqual(expected);
  });

  it('returns WalletDataFromAddress when input is "addr1qyndypcnxuszyzuvmlyrac85vkh8tz9r4dvpkrrudg90n7qtkn40yqj3cs4x78z7tdxz0928j260puqxpuzhfawgp82qceqc0p"', async () => {
    const input = 'addr1qyndypcnxuszyzuvmlyrac85vkh8tz9r4dvpkrrudg90n7qtkn40yqj3cs4x78z7tdxz0928j260puqxpuzhfawgp82qceqc0p';
    const expected = 'WalletDataFromAddress';
    const result = await parseUrlParameter(input);
    expect(result).toEqual(expected);
    });
    
    it('returns WalletDataFromAddress when input is "addr1q9j7hln9wuu2fsf2luvc2c36ar4kdmh3ksmhdzvxac70txgtkn40yqj3cs4x78z7tdxz0928j260puqxpuzhfawgp82qmkuecv"', async () => {
    const input = 'addr1q9j7hln9wuu2fsf2luvc2c36ar4kdmh3ksmhdzvxac70txgtkn40yqj3cs4x78z7tdxz0928j260puqxpuzhfawgp82qmkuecv';
    const expected = 'WalletDataFromAddress';
    const result = await parseUrlParameter(input);
    expect(result).toEqual(expected);
    });
    
    it('returns WalletDataFromAddress when input is "addr1qypr9jqy7es4tk05dpelgczq7cgl0zy7rg47fyd5qw9rcwstkn40yqj3cs4x78z7tdxz0928j260puqxpuzhfawgp82qzuc8lu"', async () => {
    const input = 'addr1qypr9jqy7es4tk05dpelgczq7cgl0zy7rg47fyd5qw9rcwstkn40yqj3cs4x78z7tdxz0928j260puqxpuzhfawgp82qzuc8lu';
    const expected = 'WalletDataFromAddress';
    const result = await parseUrlParameter(input);
    expect(result).toEqual(expected);
    });
    
    it('returns PolicyData when input is "3bcc312ebe7cd9281ab3e3d641bf70f207012e539b0e6e7c3f1560d7"', async () => {
    const input = '3bcc312ebe7cd9281ab3e3d641bf70f207012e539b0e6e7c3f1560d7';
    const expected = 'PolicyData';
    const result = await parseUrlParameter(input);
    expect(result).toEqual(expected);
    });
    
    it('returns PolicyData when input is "bddc4b369225979ed3cdda5949ba7ac05091024684c2cdeb097b0e31"', async () => {
    const input = 'bddc4b369225979ed3cdda5949ba7ac05091024684c2cdeb097b0e31';
    const expected = 'PolicyData';
    const result = await parseUrlParameter(input);
    expect(result).toEqual(expected);
    });});
