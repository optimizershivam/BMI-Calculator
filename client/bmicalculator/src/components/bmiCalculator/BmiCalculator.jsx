import React, { useEffect, useState } from 'react'
import "./bmiCalculator.css"
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const BmiCalculator = () => {

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBMIResult] = useState([]);
  async function calculateBMI() {
    try {

    
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};
     const res = await axios.post("http://localhost:8080/bmi/calculateBMI",{height,weight}, {headers})
     
     const {bmi} = res.data

     setBMIResult([...bmiResult, { bmi, result: getBMIResultCategory(bmi) }]);
    } catch (error) {
      console.error("Error calculating BMI:", error);
    }
  }

  const getBMIResultCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi <= 24.9) return "Normal Weight";
    if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    if (bmi >= 30 && bmi <= 34.9) return "Obesity";
    if (bmi >= 35 && bmi <= 39.9) return "Extreme Obesity";
    return "Extreme Obesity-II";
  };


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
      <TableContainer style={{width:"20%"}}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>BMI</TableCell>
            <TableCell align="right" >Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bmiResult.map((ele,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {ele.bmi.toFixed(2)}
              </TableCell>
              <TableCell align="right">{ele.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </>

  )
}

export default BmiCalculator