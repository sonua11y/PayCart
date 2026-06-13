const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();

    console.log("Foods found:", foods);

    res.json(foods);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;