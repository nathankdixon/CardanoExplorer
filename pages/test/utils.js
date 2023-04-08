export const isUrl = (value) => {
    try {
      if (!value.startsWith("www") && !value.startsWith("ipfs") && !value.startsWith("http") && !value.startsWith("https")) {
        return false;
      }
      const url = new URL(value.startsWith("http") ? value : "https://" + value);
      return url.protocol === "http:" || url.protocol === "https:" || value.startsWith("ipfs://");
    } catch {
      return false;
    }
  };

export const createAttributeTable = (input) => {
    if (!input || typeof input !== 'object') {
      return <p>No attributes found.</p>;
    }
  
    const attributes = Object.entries(input)
      .map(([key, value]) => {
        if (key.startsWith('attributes[SEP]')) {
          return [key.replace('attributes[SEP]', ''), value];
        }
        if (key === 'traits' && Array.isArray(value)) {
          return [key, value.join(', ')];
        }
        return [key, value];
      });
  
    return (
      <table>
        <tbody>
          {attributes.map(([key, value], index) => (
            <tr key={index}>
              <td className="key">{key}:</td>
              <td>
              {isUrl(value) ? (
                value.startsWith("ipfs://") ? (
                  <a href={`https://dweb.link/ipfs/${value.substring(7)}`} target="_blank" rel="noopener noreferrer">
                    {value}
                  </a>
                ) : (
                  <a href={value.startsWith("http") ? value : "https://" + value} target="_blank" rel="noopener noreferrer">
                    {value}
                  </a>
                )
              ) : (
                value
              )}
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
 export function createNestedTable(input) {
    if (!input || typeof input !== 'object') {
      return <p>No data found.</p>;
    }
  
    const processValue = (value) => {
      if (typeof value === 'object' && value !== null) {
        return createNestedTable(value);
      } else {
        if (isUrl(value)) {
          if (value.startsWith("ipfs://")) {
            const ipfsHash = value.substring(7);
            const ipfsGatewayUrl = `https://dweb.link/ipfs/${ipfsHash}`;
            return <a href={ipfsGatewayUrl} target="_blank" rel="noopener noreferrer">{value}</a>;
          }
          return <a href={value.startsWith("http") ? value : "https://" + value} target="_blank" rel="noopener noreferrer">{value}</a>;
        }
        return value;
      }
    };
  
    const attributes = Object.entries(input);
  
    return (
      <table>
        <tbody>
          {attributes.map(([key, value], index) => (
            <tr key={index}>
              <td className="key">{key}:</td>
              <td>{processValue(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
    
  