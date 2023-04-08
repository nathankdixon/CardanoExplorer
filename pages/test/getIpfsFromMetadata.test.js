import { getIpfsFromMetadata } from "./getIpfsFromMetadata";

describe('getIpfsFromMetadata', () => {
  test('should return the IPFS link for an "image" key', () => {
    const metadata = { image: 'ipfs://QmTest' };
    const result = getIpfsFromMetadata(metadata);
    expect(result).toBe('http://dweb.link/ipfs/QmTest');
  });

  test('should return the IPFS link for a "logo" key', () => {
    const metadata = { logo: 'QmTest' };
    const result = getIpfsFromMetadata(metadata);
    expect(result).toBe('data:image/png;base64,QmTest');
  });

  test('should handle IPFS link in an array', () => {
    const metadata = { image: ['ipfs://QmTest'] };
    const result = getIpfsFromMetadata(metadata);
    expect(result).toBe('http://dweb.link/ipfs/QmTest');
  });

  test('should return default image for invalid metadata', () => {
    const metadata = { image: null };
    const result = getIpfsFromMetadata(metadata);
    expect(result).toBe('/black.jpeg');
  });

  test('should handle "ba" prefix', () => {
    const metadata = { image: 'baQmTest' };
    const result = getIpfsFromMetadata(metadata);
    expect(result).toBe('http://dweb.link/ipfs/baQmTest');
  });

  test('should handle "Qm" prefix', () => {
    const metadata = { image: 'QmTest' };
    const result = getIpfsFromMetadata(metadata);
    expect(result).toBe('http://dweb.link/ipfs/QmTest');
  });

  test('should handle "ipfs/" prefix', () => {
    const metadata = { image: 'ipfs/QmTest' };
    const result = getIpfsFromMetadata(metadata);
    expect(result).toBe('http://dweb.link/ipfs/QmTest');
  });

  test('should handle "ipfs://" prefix', () => {
    const metadata = { image: 'ipfs://QmTest' };
    const result = getIpfsFromMetadata(metadata);
    expect(result).toBe('http://dweb.link/ipfs/QmTest');
  });

  test('should handle no image or logo key', () => {
    const metadata = { unrelatedKey: 'testValue' };
    const result = getIpfsFromMetadata(metadata);
    expect(result).toBe('');
  });
});
