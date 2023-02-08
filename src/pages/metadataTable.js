import { useState } from 'react';

const MetadataTable = ({ json }) => {
  const [expanded, setExpanded] = useState({});


  const toggleExpanded = (key) => {
    setExpanded({
      ...expanded,
      [key]: !expanded[key],
    });
  };

  const renderValue = (key, value) => {
    if (typeof value === 'object') {
      return (<>
        <button className='expand-meta'onClick={() => toggleExpanded(key)}>
          {expanded[key] ? 'Collapse' : 'Expand'}
        </button>
        {expanded[key] && (
          <MetadataTable json={value} />
        )}
      </>

      );
    }
    return value;
  };

  return (
    <table>
      <tbody>{Object.entries(json).map(([key, value]) => (
        <tr className = "meta-row" key={key}>
          <td className='meta-col'>{key}</td>
          <td className='meta-col'>{renderValue(key, value)}</td>
        </tr>
      ))}</tbody>

    </table>
  );
};

export default MetadataTable;
