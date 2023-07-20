import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const Profile = () => {
    const [calculationHistory, setCalculationHistory] = useState([]);
    const [userName, setUserName] = useState("");
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};
    const fetchCalculationHistory = async () => {
   
        try { 
            if (!token) {
              console.error("No token found in localStorage.");
              return;
            }
          const response = await axios.get(
         "http://localhost:8080/bmi/calculationHistory",
            {
              headers
            }
          );
  
          setCalculationHistory(response.data);
         
        } catch (error) {
          console.error("Error fetching calculation history:", error);

        }
      };

      const fetchUserProfile = async () => {
        try {
            if (!token) {
              console.error("No token found in localStorage.");
              return;
            }
          const response = await axios.get("http://localhost:8080/auth/profile", {headers});
            console.log({response})
            setUserName(response.data);
          
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
    useEffect(() => {
      
     
      fetchUserProfile();
      fetchCalculationHistory();
    }, []);
  
    console.log({userName})
    const getBMIResultCategory = (bmi) => {
      if (bmi < 18.5) return "Underweight";
      if (bmi >= 18.5 && bmi <= 24.9) return "Normal Weight";
      if (bmi >= 25 && bmi <= 29.9) return "Overweight";
      if (bmi >= 30 && bmi <= 34.9) return "Obesity";
      if (bmi >= 35 && bmi <= 39.9) return "Extreme Obesity";
      return "Extreme Obesity -II";
    };
  return (
    <div >
        <Typography variant="h1" component="h2" style={{color:"teal"}}>
  Hi, {userName}
</Typography>

<Typography variant="h3" component="h2" style={{color:"blue"}}>
  Your BMI Calculation History
</Typography>
              <TableContainer style={{width:"20%", margin:'auto'}} >
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           
            <TableCell align="right" >Height</TableCell>
            <TableCell align="right" >Weight</TableCell>
            <TableCell>BMI</TableCell>
            <TableCell align="right" >Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {calculationHistory.map((ele,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right">{ele.height}</TableCell>
              <TableCell align="right">{ele.weight}</TableCell>
              <TableCell component="th" scope="row">
                {ele.bmi.toFixed(2)}
              </TableCell>
              <TableCell align="right">{getBMIResultCategory(ele.bmi)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Profile