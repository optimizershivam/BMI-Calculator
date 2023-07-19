const express = require("express");
const BmiModel = require("../models/BmiModel");
const authenticateToken = require("../middleware/authentication");
const router = express.Router();

router.post('/calculateBMI', authenticateToken, async(req, res) => {
    const { height, weight } = req.body;
    const bmi = weight / ((height / 100) ** 2);
    const userId = req.user.id;
  
    const newBMI = new BmiModel({
      user: userId,
      height,
      weight,
      bmi
    });
    await newBMI.save()
    .then(() => res.status(200).json({ bmi }))
    .catch((error) => res.status(500).json({ message: 'BMI calculation failed', error }));
});

router.get('/calculationHistory', authenticateToken, async (req, res) => {
    const userId = req.user.id;
  
    await BmiModel.find({ user: userId })
      .then((history) => res.status(200).json(history))
      .catch((error) => res.status(500).json({ message: 'Failed to fetch calculation history', error }));
  });

 module.exports = router