const {MongoClient, ObejctID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', (err, db) =>{
  if(err){
  return  console.log('Unable to connect to MongoDB');
  }
  const practice = db.db('TestDB');

  console.log('Connected to MongoDB server');

  // practice.collection('Todos').find({
  //   _id : new Object('5a4fb7e90eef486698b82ef6')
  // }).toArray().then( (docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined , 2));
  // }, (err) => {
  //   if(err){
  //     return console.log('Unable to find', err);
  //   }
  // });
  practice.collection('Users').find({name: 'Akaash'}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    if(err){
      return console.log('Unable to find');
    }
  })
  //practice.close();
    });
