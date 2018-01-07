const {MongoClient, ObejctID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', (err, db) =>{
  if(err){
  return  console.log('Unable to connect to MongoDB');
  }
  const practice = db.db('TestDB');

  console.log('Connected to MongoDB server');

  // practice.collection('Todos').insertOne({
  //   text : 'Something to do',
  //   completed : false
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert into collection');
  //   }
  //
  //     console.log(JSON.stringify(result.ops, undefined , 2));
  // });
  // practice.collection('Users').insertOne({
  //   name : 'Akaash',
  //   age : 26,
  //   location : 'Miami'
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert into Users');
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
    });
