import { sortTokenFungibilities } from '../pages/test/sortFungibilities';

describe('sortTokenFungibilities', () => {
    it('correctly separates fungible and non-fungible tokens', () => {
      const policies = {
        policy1: [{ quantity: 1 }],
        policy2: [{ quantity: 2 }],
        policy3: [{ quantity: 3 }],
        policy4: [{ quantity: 1 }],
      };
  
      const result = sortTokenFungibilities(policies);
  
      expect(result.nfts).toHaveLength(2);
      expect(result.fts).toHaveLength(2);
      expect(result.nfts[0]).toEqual([{ quantity: 1 }]);
      expect(result.nfts[1]).toEqual([{ quantity: 1 }]);
      expect(result.fts[0]).toEqual([{ quantity: 2 }]);
      expect(result.fts[1]).toEqual([{ quantity: 3 }]);
    });
  
    it('returns empty arrays for empty input', () => {
      const result = sortTokenFungibilities({});
      expect(result.nfts).toHaveLength(0);
      expect(result.fts).toHaveLength(0);
    });
  });
  