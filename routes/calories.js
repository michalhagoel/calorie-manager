// Omer Sharoni, 206914384
// Michal Hagoel, 318662830

const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Calorie = require('../models/calories');

router.post('/addcalories/', function (req, res, next) {
  const required = getMissingParams(req.body);

  // Check if there are any missing params
  if (required.length) {
    res.status(400).send(`Missing required params: ${required.join(', ')}`);
    return;
  }

  // Validate that the given category is allowed
  if (!categoryValidation(req.body.category)) {
    res.status(400).send(`Category: ${req.body.category} is not valid`);
    return;
  }

  const { user_id, year, month, day, description, category, amount } = req.body;
  const calorieToCreate = { user_id, year, month, day, description, category, amount, id: uuidv4() };

  // Append today's date if no date is given
  if (!year || !month || !day) {
    const date = new Date();
    calorieToCreate['day'] = date.getUTCDate();
    calorieToCreate['month'] = date.getUTCMonth() + 1;
    calorieToCreate['year'] = date.getUTCFullYear();
  }

  Calorie.create(calorieToCreate)
    .then((calorie) => res.status(200).send(calorie))
    .catch((err) => {
      console.log('Error while creating a new calorie');
      console.log(err);
      res.status(400).send('Error creating Calorie');
    });
});

function getMissingParams (body) {
  const requiredParams = ['user_id', 'description', 'category', 'amount'];
  const missingParams = [];

  // Checking the request's body for missing parameters
  requiredParams.forEach((param) => {
    if (!body[param]) {
      missingParams.push(param);
    }
  });

  return missingParams;
}

function categoryValidation (category, allowedCategories = ['breakfast', 'lunch', 'dinner', 'other']) {
  return allowedCategories.includes(category);
}

module.exports = router;
