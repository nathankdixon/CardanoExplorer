import { render, cleanup } from '@testing-library/react';
import { createAttributeTable, createNestedTable, isUrl } from '../pages/test/utils';

describe('isUrl', () => {
  it('returns the correct result based on the input string', () => {
    const testCases = [
      { input: 'https://example.com', expected: true },
      { input: 'http://example.com', expected: true },
      { input: 'www.example.com', expected: true },
      { input: 'ipfs://QmHash', expected: true },
      { input: 'example.com', expected: false },
      { input: 'ftp://example.com', expected: false },
    ];

    for (const testCase of testCases) {
      const result = isUrl(testCase.input);
      expect(result).toEqual(testCase.expected);
    }
  });
});

describe('createAttributeTable', () => {
  afterEach(cleanup);

  it('renders an attribute table with the correct structure', () => {
    const input = {
      key1: 'value1',
      'attributes[SEP]key2': 'value2',
      traits: ['trait1', 'trait2'],
    };

    const { container, getByText } = render(createAttributeTable(input));
    expect(getByText('key1:')).toBeInTheDocument();
    expect(getByText('value1')).toBeInTheDocument();
    expect(getByText('key2:')).toBeInTheDocument();
    expect(getByText('value2')).toBeInTheDocument();
    expect(getByText('traits:')).toBeInTheDocument();
    expect(getByText('trait1, trait2')).toBeInTheDocument();
    expect(container.querySelector('table')).toBeInTheDocument();
  });
});

describe('createNestedTable', () => {
  afterEach(cleanup);

  it('renders a nested table with the correct structure', () => {
    const input = {
      key1: 'value1',
      key2: {
        subKey1: 'https://example.com',
        subKey2: 'ipfs://QmHash',
      },
    };

    const { container, getByText } = render(createNestedTable(input));
    expect(getByText('value1')).toBeInTheDocument();
    expect(getByText('https://example.com')).toBeInTheDocument();
    expect(getByText('ipfs://QmHash')).toBeInTheDocument();
    expect(container.querySelectorAll('table').length).toBe(2);
  });
});
