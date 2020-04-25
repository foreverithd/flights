const mongoose = require('mongoose');
const env = require('./env/environment');

mongoose.Promise = global.Promise;

const constring = `mongodb://${env.dbName}:${env.key}@${env.dbName}.mongo.cosmos.azure.com:${env.cosmosPort}/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@airline@`

function connect() {
  return mongoose.connect(constring);
}

module.exports = {
  connect,
  mongoose
};
