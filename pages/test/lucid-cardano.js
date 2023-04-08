// __mocks__/lucid-cardano.js

const LucidMock = {
    new: jest.fn().mockResolvedValue({
      selectWallet: jest.fn(),
      wallet: {
        rewardAddress: jest.fn().mockResolvedValue('stake_address_sample'),
      },
    }),
  };
  
  module.exports = {
    Lucid: LucidMock,
  };
  