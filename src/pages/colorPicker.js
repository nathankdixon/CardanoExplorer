import { useState, useEffect } from 'react';

export default function ColorPicker(props) {
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [color3, setColor3] = useState('');

  useEffect(() => {

    if(props.stake != null){
      let stakeAddress = props.stake;
      let mainColor = '';
      let secondColor = '';
      let thirdColor = '';
  
      if(localStorage.getItem(stakeAddress)){
          let data = JSON.parse(localStorage.getItem(stakeAddress));
          console.log(data);

          if(data.colors == null || data.colors.color1 == ''){

            console.log('setting from css');
            mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();
            secondColor = getComputedStyle(document.documentElement).getPropertyValue('--second-color').trim();
            thirdColor = getComputedStyle(document.documentElement).getPropertyValue('--third-color').trim();

            setColor1(mainColor);
            setColor2(secondColor);
            setColor3(thirdColor);
          }
          else{

            console.log('setting from local');

            document.documentElement.style.setProperty('--main-color', data.colors.color1);
            document.documentElement.style.setProperty('--second-color', data.colors.color2);
            document.documentElement.style.setProperty('--third-color', data.colors.color3);

            setColor1(data.colors.color1);
            setColor2(data.colors.color2);
            setColor3(data.colors.color3);
          }
      }
      else{
          console.log('else');
          // Get the value of the --main-color variable from the root element
          
      }

    }

  }, []);


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

  function saveColors(){
    let mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();
    let secondColor = getComputedStyle(document.documentElement).getPropertyValue('--second-color').trim();
    let thirdColor = getComputedStyle(document.documentElement).getPropertyValue('--third-color').trim();

    let data = JSON.parse(localStorage.getItem(props.stake.stake));

    data.colors = {color1: mainColor, color2:secondColor, color3:thirdColor};

    props.data(data.colors);

    localStorage.setItem(props.stake, JSON.stringify(data));
    console.log(data);

  }

  return (
    <div className='color-picker'>
      <div className='colors'>
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
      <button className='setting-button' onClick={saveColors}>Save Colors</button>
    </div>

  );
}
