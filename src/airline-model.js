const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const airlineSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: String,
    saying: String,
    airlineName: String,
    altName: String,
    iATACode: String,
    iCAO: String,
    otherInfo: String,
    country: String,
    isActive: String,
  },
  { autoIndex: false }
);

const Airline = mongoose.model('Airline', airlineSchema);
module.exports = Airline;
