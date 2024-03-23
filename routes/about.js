// Omer Sharoni, 206914384
// Michal Hagoel, 318662830

const express = require('express');
const router = express.Router();

router.get('/about', function (req, res, next) {
  // Send the developers data
  const developers = [
    {'firstname': 'Michal', 'lastname': 'Hagoel', 'id': 318662830, 'email': 'michalhagoel11@gmail.com'},
    {'firstname': 'Omer', 'lastname': 'Sharoni', 'id': 206914384, 'email': 'omersh1111@gmail.com'}
  ];

  res.status(200).json(developers);
});

module.exports = router;