import React, { useEffect, useState } from 'react'
import "./bmiCalculator.css"
const BmiCalculator = () => {

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [message, setMessage] = useState('');
  const [bmi, setBMI] = useState('');

  function calculateBMI() {
 

    if (bmi < 18.5) {
      setMessage('Underweight.')
      setBMI('Your BMI is ' + bmi.toFixed(2));
    } else

    if (bmi >= 18.5 && bmi < 24.9) {
      setMessage('Normal Weight.')
      setBMI('Your BMI is ' + bmi.toFixed(2));
    } else
    
    if (bmi >= 25 && bmi < 29.9) {
      setMessage('Overweight.')
      setBMI('Your BMI is ' + bmi.toFixed(2));
    }  else
    
    if (bmi >= 30 && bmi < 35) {
      setMessage('Obesity')
      setBMI('Your BMI is ' + bmi.toFixed(2));
    } else

    if (bmi >= 35 && bmi < 40) {
      setMessage('Extreme Obesity.')
      setBMI('Your BMI is ' + bmi.toFixed(2));
    } 
  }


  useEffect(() => {
    const headers = { 'Authorization': 'Bearer my-token' };
  },[])

  return (
    <>
    <h1>BMI Calculator</h1>
    
      <div className='app'>
      <div className="area-input">
        <input
          value={weight}
          type="text"
          placeholder="Weight (in kg)"
          onChange={ (e) => setWeight(e.target.value)}
        />

        <input
          value={height}
          type="text"
          placeholder="Height (in cm)"
          onChange={ (e) => setHeight(e.target.value)}
        />
        <button onClick={calculateBMI}>
          Calculate
        </button>

      </div>
      <h2> {message} {bmi} </h2>
      </div>
    </>

  )
}

export default BmiCalculator