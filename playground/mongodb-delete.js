const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', (err, db) =>{
  if(err){
  return  console.log('Unable to connect to MongoDB');
  }
  const practice = db.db('TestDB');

  console.log('Connected to MongoDB server');
// practice.collection('Users').deleteMany({name : 'Akaash'}).then((result) =>{
//   console.log(result);
//
// },(err) =>{
//   if(err){
//     return console.log('Unable to delete');
//   }
// });

practice.collection('Users').findOneAndDelete({_id : new ObjectID('5a51a227195df79044949079')}).then(
  (result) => {
    console.log(result);
  },(err) => {
    console.log(err);
  });
      });
