var {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

var id = '5a51b23d02e241c39c4ca87b';

User.findById(id).then((user) => {
  if(!user){
    return console.log('User not found');
  }
  console.log(user);
}).catch((e) => {
  console.log(e);
});
