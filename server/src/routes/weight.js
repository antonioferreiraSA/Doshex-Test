const express = require("express");
const jwt = require("jsonwebtoken");

const Weight = require("../models/weight");
const User = require("../models/user");

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Token is not valid." });
  }
};

router.post("/save_weight", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const weight = new Weight({
      userId: user._id,
      date: req.body.date,
      weight: req.body.weight,
    });
    await weight.save();

    res.send({ message: "Weight added successfully." });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/get_weight_history", verifyToken, async (req, res) => {
  try {
    const weights = await Weight.find({ userId: req.userId }).sort({
      date: -1,
    });
    res.send(weights);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/update_weight/:id", verifyToken, async (req, res) => {
  try {
    const weight = await Weight.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      {
        new: true,
      }
    );
    if (!weight) {
      return res.status(404).send({ message: "Weight entry not found." });
    }

    res.send({ message: "Weight entry updated successfully." });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/delete_weight/:id", verifyToken, async (req, res) => {
  try {
    const weight = await Weight.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!weight) {
      return res.status(404).send({ message: "Weight entry not found." });
    }

    res.send({ message: "Weight entry deleted successfully." });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
