// const Hero = require('./hero-model-delete');
const Airline = require('./airline-model');
const ReadPreference = require('mongodb').ReadPreference;

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var now = require('performance-now');

require('./mongo').connect();

async function readFile(res) {
  var lineCount = 0;

  var t0 = now();
  var t1;

  var instream;
  var outstream = new stream();
  var rl;
  var row = {};
  var id, airlineName, altName, iATACode, iCAO, otherInfo, country, isActive;
  var airline;
  instream = fs.createReadStream('src/airline-data/flightsData.csv');
  rl = readline.createInterface(instream, outstream);

  await rl.on('line', function (line) {
    // increment line count
    lineCount++;
    row = [...line.split(',')].map((item) => {
      return item.replace(/(^"|"$|\\N)/g, '');
    });
    [id, airlineName, altName, iATACode, iCAO, otherInfo, country, isActive] = row;

    airline = new Airline({ id, airlineName, altName, iATACode, iCAO, otherInfo, country, isActive });
    airline
      .save()
      .then((record) => {
        console.log('saved id', record.id);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  await rl.on('close', function () {
    t1 = now();
    res.json({
      lineCount: lineCount,
      timeTaken: (t1 - t0).toFixed(3) + `ms`
    })
  });
}

module.exports = { readFile };
