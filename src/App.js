import './App.css';
import saveAs from 'file-saver';
import React, { useState } from 'react';
import Select from 'react-select';

function App() {
  const [meme, setMeme] = useState('https://api.memegen.link/images/doge/');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [template, setTemplate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const options = [
    { value: 'fry', label: 'fry', color: '#f15bb5' },
    { value: 'doge', label: 'doge', color: '#9b5de5' },
    { value: 'ams', label: 'ams', color: '#00bbf9' },
    { value: 'aint-got-time', label: 'aint-got-time', color: '#f15bb5' },
    { value: 'dwight', label: 'dwight', color: '#9b5de5' },
    { value: 'feelsgood', label: 'feelsgood', color: '#00bbf9' },
    { value: 'grumpycat', label: 'grumpycat', color: '#f15bb5' },
    { value: 'bender', label: 'bender', color: '#9b5de5' },
  ];

  const handleChange = (selectedOption) => {
    setTemplate(selectedOption.value);
  };

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: '#fcf6bd' }),
    option: (styles, { data, isDisable, isFocused, isSelected }) => {
      console.log('option', data, isFocused, isDisable, isSelected);
      return { ...styles, color: data.color };
    },
  };

  const url = `https://api.memegen.link/images/${template}/${topText}/${bottomText}.png`;

  function fileSaver() {
    saveAs(url, 'download.png');
  }

  return (
    <div className="container">
      <h2>Meme </h2>
      <h2>Generator</h2>
      <div className="diagonal">
        <img className="img" src={meme} alt="Meme" data-test-id="meme-image" />
        <div className="input">
          <form onSubmit={handleSubmit}>
            <div className="labelBox">
              <label className="labelTemplate" htmlFor>
                Meme template:
                <div className="select">
                  <Select
                    template
                    options={options}
                    onChange={handleChange}
                    styles={colorStyles}
                  />
                </div>
              </label>

              <label id="Top text">
                Top text:
                <input
                  value={topText}
                  onChange={(event) => setTopText(event.currentTarget.value)}
                />
              </label>
              <label id="Bottom text">
                Bottom text:
                <input
                  value={bottomText}
                  onChange={(event) => setBottomText(event.currentTarget.value)}
                />
              </label>
            </div>
            <div className="inline">
              <button
                onClick={() =>
                  setMeme(
                    `https://api.memegen.link/images/${template}/${topText}/${bottomText}.png`,
                  )
                }
                className="inline"
              >
                Generate
              </button>
              <button onClick={fileSaver} className="inline">
                Download
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
