const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Message = new Schema({
   sender: {
        type: String
   },
   receiver: {
      type: String
   },
   text: {
    type: String
   },
   date: {
    type: Date
    },
}, {
   collection: 'messages'
})
module.exports = mongoose.model('Message', Message)
