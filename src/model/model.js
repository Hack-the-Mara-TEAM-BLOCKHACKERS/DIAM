const mongoose = require('mongoose');


const landOwnerSchema = new mongoose.Schema({
    idNumber: String,
    dateOfBirth: String,
    lastName: String,
    userAddress: String,
    gender: String,
    firstName: String,
    middleName: String,
    accountNumber: String,
    isActive: Boolean,
    phone: String,
    userPin: String,
    fullName: String,
    acreSize: String,
    conservancy: String,




});



const rangerSchema = new mongoose.Schema({
    idNumber: String,
    dateOfBirth: String,
    lastName: String,
    userAddress: String,
    gender: String,
    firstName: String,
    middleName: String,
    accountNumber: String,
    isActive: Boolean,
    phone: String,
    userPin: String,
    fullName: String




});

const landOwnerModel = mongoose.model('landOwnerModel', landOwnerSchema);
const rangerModel = mongoose.model('rangerModel', rangerSchema);


module.exports = {
    landOwnerModel,
    rangerModel

};