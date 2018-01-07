const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', (err, db) =>{
  if(err){
  return  console.log('Unable to connect to MongoDB');
  }
  const practice = db.db('TestDB');

  console.log('Connected to MongoDB server');

  practice.collection('Users').findOneAndUpdate({
    _id : new ObjectID('5a51a744195df7904494907a')
  },{
    $set : {
      name : 'Arjun',
    },
    $inc : {
      age : 1
    }
  },{
    returnOriginal : false
  }).then((result) => {
    console.log(result);
  })
      });
