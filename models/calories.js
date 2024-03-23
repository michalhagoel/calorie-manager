// Omer Sharoni, 206914384
// Michal Hagoel, 318662830

const mongoose = require('mongoose');
const { Schema } = mongoose;

const CaloriesSchema = new Schema({
  user_id: {
    type: Number
  },
  year: {
    type: Number
  },
  month: {
    type: Number
  },
  day: {
    type: Number
  },
  description: {
    type: String
  },
  amount: {
    type: Number
  },
  category: {
    type: String
  }
});

const Calorie = new mongoose.model('calories', CaloriesSchema);

module.exports = Calorie;