const mongoose = require('mongoose');


const landOwnerSchema = new mongoose.Schema({

     idTag:String,
    address:String,
    gender:String,
     dob:String,
     phone:String,
     middleName:String,
     firstName:String,
     lastName:String,
    fullName:String,
     accountNumber:String,
    landSize:String,
    leaseFee:String,
     conservancy:String,




});



const rangerSchema = new mongoose.Schema({

    firstName:{type:String},
    lastName:{type:String},
    middleName:{type:String},
    address:String,
    gender:String,
    fullName:String,
    phoneNumber:String,
    accountNumber:String,
    salary:String,




});

const   landOwnerModel = mongoose.model('landOwnerModel',landOwnerSchema);
const   rangerModel = mongoose.model('rangerModel',rangerSchema);


module.exports = {
    landOwnerModel,
   rangerModel

};