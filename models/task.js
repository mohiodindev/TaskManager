const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength:[20, "length is not more then 20 "],
        required: [true, 'Must be provided'],
        trim:true
        
        
    },
    completed: {
      type:Boolean,
      default:false
     }


});


module.exports = mongoose.model('Task', TaskSchema);

