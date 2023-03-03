import { useState, useEffect } from 'react';

// allows the user to set the 3 main colors on page
export default function ColorPicker(props) {
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [color3, setColor3] = useState('');

  const [buttonText, setButtonText] = useState('Save Theme');
  const [buttonColor, setButtonColor] = useState();


  useEffect(() => {

    if(props.stake != null){
      let stakeAddress = props.stake;
      let mainColor = '';
      let secondColor = '';
      let thirdColor = '';
  
      // checks storage for saved colors
      if(localStorage.getItem(stakeAddress)){
          let data = JSON.parse(localStorage.getItem(stakeAddress));
          if(data.colors == null || data.colors.color1 == ''){


            // if no colors in storage, get colors from global.css
            mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();
            secondColor = getComputedStyle(document.documentElement).getPropertyValue('--second-color').trim();
            thirdColor = getComputedStyle(document.documentElement).getPropertyValue('--third-color').trim();

            setColor1(mainColor);
            setColor2(secondColor);
            setColor3(thirdColor);
          }
          else{

            // if colors found in storage, use them
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

    // saves color data into local storage so same colors are used on resume
    let mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();
    let secondColor = getComputedStyle(document.documentElement).getPropertyValue('--second-color').trim();
    let thirdColor = getComputedStyle(document.documentElement).getPropertyValue('--third-color').trim();

    let data = JSON.parse(localStorage.getItem(props.stake));

    data.colors = {color1: mainColor, color2:secondColor, color3:thirdColor};

    props.data(data.colors);

    localStorage.setItem(props.stake, JSON.stringify(data));

    setButtonText('Saved!');

    setTimeout(() => {
      // Reset the button text after 1 second
      setButtonText("Save Colors");
    }, 1000);

  }

  return (
    <div className='options-color'>
      <div className='option'>
        <input
            type="color"
            className='option-button'
            id="color-selector1"
            value={color1}
            onChange={handleChange1}
            />
      </div>
      <div className='option'>
      <input
            type="color"
            className='option-button'
            id="color-selector2"
            value={color2}
            onChange={handleChange2}
          />
      </div>
      <div className='option'>
      <input
            type="color"
            className='option-button'
            id="color-selector3"
            value={color3}
            onChange={handleChange3}
          />
      </div>
      <div className='option'>
        <button className='option-button' onClick={saveColors}>{buttonText}</button>
      </div>
    </div>

  );
}
