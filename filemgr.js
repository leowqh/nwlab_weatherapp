const {MongoClient} = require('mongodb');
const fs = MongoClient;

//const database = 'mongodb://localhost:27017';
const database = 'mongodb://lab123:lab123@ds241570.mlab.com:41570/weather_app';
const saveData = (newdata) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(database,{useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject('Unable to connect to MongoDB');
      }

      console.log('Connected to MongoDB');
      const db = client.db('weather_app');

      db.collection('WeatherCollection').insertOne(newdata, (err, result) => {
        if (err) {
          reject('Unable to insert');
        }
          resolve(result);
      })

      client.close();
    });
  });
};

const getAllData = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(database,{useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject('Unable to connect to MongoDB');
      }

      console.log('Connected to MongoDB');
      const db = client.db('weather_app');

      db.collection('WeatherCollection').find().toArray().then( (docs) => {
        resolve(docs);
      }, (err) => {
        reject('Unable to fetch docs');
      });

      client.close();
    });
  });
};

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(database,{useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject('Unable to connect to MongoDB');
      }

      console.log('Connected to MongoDB');
      const db = client.db('weather_app');

      db.collection('WeatherCollection').remove({}).then( (result) => {
        resolve(result);
      }, (err) => {
        reject('Unable to delete');
      });

      client.close();
    });
  });
};

module.exports = {
  saveData,
  getAllData,
  deleteAll,
};
