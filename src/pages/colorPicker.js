import { useState, useEffect } from 'react';

export default function ColorPicker(props) {
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [color3, setColor3] = useState('');

  useEffect(() => {

    let stakeAddress = props.stake;
    let mainColor = '';
    let secondColor = '';
    let thirdColor = '';

    if(localStorage.getItem(stakeAddress)){
        let data = JSON.parse(localStorage.getItem(stakeAddress));
        console.log(data);
        mainColor = data.color1;
        secondColor = data.color2;
        thirdColor = data.color3;
    }
    else{
        console.log('else');
        // Get the value of the --main-color variable from the root element
        mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();
        secondColor = getComputedStyle(document.documentElement).getPropertyValue('--second-color').trim();
        thirdColor = getComputedStyle(document.documentElement).getPropertyValue('--third-color').trim();
    }

    props.data({color1: mainColor, color2: secondColor, color3: thirdColor});


    setColor1(mainColor);
    setColor2(secondColor);
    setColor3(thirdColor);

  }, []);

  useEffect(() => {
    props.data({color1: color1, color2:color2, color3:color3});
  }, [color1, color2, color3])

  const handleChange1 = (event) => {
    setColor1(event.target.value);
    document.documentElement.style.setProperty('--main-color', event.target.value);
  };

  const handleChange2 = (event) => {
    setColor2(event.target.value);
    document.documentElement.style.setProperty('--second-color', event.target.value);
  };

  const handleChange3 = (event) => {
    setColor3(event.target.value);
    document.documentElement.style.setProperty('--third-color', event.target.value);
  };

  return (
    <div className='color-picker'>
      <input
        type="color"
        className='color-selector'
        id="color-selector1"
        value={color1}
        onChange={handleChange1}
        />
        <input
        type="color"
        className='color-selector'
        id="color-selector2"
        value={color2}
        onChange={handleChange2}
      />
        <input
        type="color"
        className='color-selector'
        id="color-selector3"
        value={color3}
        onChange={handleChange3}
      />
    </div>
  );
}
