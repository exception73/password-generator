import React, { useState } from 'react';
import {number, upperCaseLetters, lowerCaseLetters, specialCharacters} from './characters'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includeLowerCase, setIncludeLowerCase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  

  const handleGeneratePassword = (e) =>{
    let characterList = ''

    if(includeLowerCase) characterList = characterList + lowerCaseLetters
    if(includeUpperCase) characterList = characterList + upperCaseLetters
    if(includeNumbers) characterList = characterList+ number
    if(includeSymbols) characterList = characterList + specialCharacters


    setPassword(createPassword(characterList))
  }

  const createPassword = (characterList) =>{
    let password = ''
    const characterListLength = characterList.length;
    if(characterListLength === 0) return '';
    for(let i = 0; i<passwordLength; i++){
      const characterIndex = Math.floor(Math.random() * (characterListLength));
      password = password + characterList[characterIndex];
    }
    return password;
  }

  const copyClickHandler = async() =>{
    
     
        try{
          await navigator.clipboard.writeText(password);
          notify();
        }catch(err){
          console.error('Failed to copy: ', err);
        }      
  }

  const notify = () => {
    toast.success('Copied to Clipboard', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  return (
    <div className="App">

      <div className="container">
        <div className="generator">
            <h2 className="generator_header">Password Generator</h2>

            <div className='generator__password'>
            <h3>{password}</h3>
            <button onClick={copyClickHandler} className='copy__btn'>
              <i className='far fa-clipboard'></i>
            </button>
            </div>

            <div className='from-group'>
              <label htmlFor="password-strength">Password Length</label>
              <input defaultValue={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} type="number" id='password-strength' name='password-strength' min="8" max="20" />
            </div>

            <div className='from-group'>
              <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
              <input Checked={includeUpperCase} onChange={(e) => setIncludeUpperCase(e.target.value)} type="checkbox"  id='uppercase-letters' name='uppercase-letters' />
            </div>

            <div className='from-group'>
              <label htmlFor="lowercase-letters">Include Lowercase Letters</label>
              <input Checked={includeLowerCase} onChange={(e) => setIncludeLowerCase(e.target.value)} type="checkbox" id='lowercase-letters' name='lowercase-letters' />
            </div>

            <div className='from-group'>
              <label htmlFor="numbers">Include Numbers </label>
              <input Checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.value)} type="checkbox"  id='numbers' name='numbers'/>
            </div>

            <div className='from-group'>
              <label htmlFor="symbols">Include Special Symbols</label>
              <input Checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.value)} type="checkbox" id='symbols' name='symbols' />
            </div>

          <button onClick={handleGeneratePassword} className='generator_btn'>Generate Password</button>


          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />


        </div>
      </div>

    </div>
  );
}

export default App;
