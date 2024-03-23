// Omer Sharoni, 206914384
// Michal Hagoel, 318662830

const express = require('express');
const router = express.Router();
const Calorie = require('../models/calories');

router.get('/report/', function (req, res, next) {
  // My code:
  const { user_id, month, year } = req.query;
  Calorie.find({ user_id, month, year }, { _id: 0, __v: 0, user_id: 0, month: 0, year: 0 })
    .then((array) => {
      const report = {
        breakfast: [],
        lunch: [],
        dinner: [],
        other: [],
      };

      for (let i = 0; i < array.length; i++) {
        const item = array[i];
        const category = item.category;

        // Remove category before pushing to the report
        const newItem = Object.assign({}, item._doc);
        delete newItem.category;

        // Push the item to the report in the correct category
        if (report[category]) {
          report[category].push(newItem);
        }
      }

      res.status(200).send(report);

    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Failed to get report');
    });
});

module.exports = router;