const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
// Define collection and schema
let User = new Schema({
   username: {
        type: String
   },
   password: {
         type: String
   },
   name: {
      type: String
   },

   surname: {
    type: String
   },
   email: {
      type: String
   },
   birthday: {
    type: Date
    },
   gender: {
      type: String
   },
   designation:{
    type: String
   }
}, {
   collection: 'users'
})
const UserEx = module.exports = mongoose.model('User', User)

module.exports.getUserByUsername = function (username, callback) {
   const query = {username: username}
   UserEx.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
   UserEx.findById(id, callback)
}

module.exports.createUser = function (newUser, callback){
   bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
         if(err) throw err;
         newUser.password = hash;
         newUser.save(callback);
      });
   });
}
module.exports.comparePassword = function(checkPassword, hash, callback) {
   bcrypt.compare(checkPassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
   })
}