import React, { useState } from 'react';

function DropdownBox(props) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className="dropdown-box">
      <button className = "show-assets-button" onClick={() => setMenuVisible(!menuVisible)}>
        Show Assets
      </button>
      {menuVisible && props.content}
    </div>
  );
}

export default DropdownBox;