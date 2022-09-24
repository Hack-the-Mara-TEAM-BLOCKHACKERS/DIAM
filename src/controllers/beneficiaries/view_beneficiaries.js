
const diamModel = require('../../model/model')
var ethers = require('ethers');
const bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
const utils = ethers.utils
const { txSigner, contract, ABI, reveal, } = require('../../constants/constants');



const viewAllRangers = async (req, res, next) => {
 

    try {
        let data = [];
        var sendPromise = await contract.getAllRangers();
        const response = Promise.resolve(sendPromise)
        response.then(resp => {

            for (let i = 0; i <= resp.length - 1; i++) {

                var obj = Object.assign({}, resp[i]);

                var result = {
                   
                };

                result['idNumber'] = reveal(obj['idNumber']).toString();
                result['dateOfBirth'] = reveal(obj['dateOfBirth']).toString();
                result['lastName'] = reveal(obj['lastName']);
                result['userAddress'] = reveal(obj['userAddress']).toString();
                result['gender'] = reveal(obj['gender']).toString();
                result['firstName'] = reveal(obj['firstName']);
                result['middleName'] = reveal(obj['middleName']).toString();
                result['accountNumber'] = reveal(obj['accountNumber']).toString();
                result['isActive'] =obj['isActive'];
                result['phone'] = reveal(obj['phone']).toString();
                result['userPin'] = reveal(obj['userPin']).toString();
                result['fullName'] = reveal(obj['fullName']).toString();
                data.push(result)


            }


            res.send({
                status: "SE200",
                data
            });

        });

    } catch (error) {

    }



}


const viewAllLandOwners = async (req, res, next) => {
  

    try {
        let data = [];
        var sendPromise = await contract.getAllLandOwners();
        const response = Promise.resolve(sendPromise)
        response.then(resp => {

            for (let i = 0; i <= resp.length - 1; i++) {

                var obj = Object.assign({}, resp[i]);

                var result = {};

                result['idNumber'] = reveal(obj['idNumber']).toString();
                result['dateOfBirth'] = reveal(obj['dateOfBirth']).toString();
                result['lastName'] = reveal(obj['lastName']);
                result['userAddress'] = reveal(obj['userAddress']).toString();
                result['gender'] = reveal(obj['gender']).toString();
                result['firstName'] = reveal(obj['firstName']);
                result['middleName'] = reveal(obj['middleName']).toString();
                result['accountNumber'] = reveal(obj['accountNumber']).toString();
                result['isActive'] =obj['isActive'];
                result['phone'] = reveal(obj['phone']).toString();
                result['userPin'] = reveal(obj['userPin']).toString();
                result['fullName'] = reveal(obj['fullName']).toString();
                result['acreSize'] = reveal(obj['landAcreSize']).toString();
                result['conservancy'] = obj['conservancy'].toString();
                data.push(result)


            }


            res.send({
                status: "SE200",
                data
            });

        });

    } catch (error) {

    }



}


const oneLandOwner = async (req, res, next) => {
    var result = {
        idNumber: '',
        dateOfBirth: '',
        lastName: '',
        userAddress: '',
        gender: '',
        firstName: '',
        middleName: '',
        accountNumber: '',
        isActive: true,
        phone: ''
    };

    try {
        let data = [];
        var sendPromise = await contract.getAllRangers(req.body.id, req.body.firstName);
        const response = Promise.resolve(sendPromise)
        response.then(resp => {

            for (let i = 0; i <= resp.length - 1; i++) {
                //console.log( resp[i])
                // convert array to th object
                var obj = Object.assign({}, resp[i]);

                var result = {
                    idNumber: '',
                    dateOfBirth: '',
                    lastName: '',
                    userAddress: '',
                    gender: '',
                    firstName: '',
                    middleName: '',
                    accountNumber: '',
                    isActive: true,
                    phone: ''
                };


                result['idNumber'] = obj['idNumber'].toString();
                result['dateOfBirth'] = obj['dateOfBirth'].toString();
                result['lastName'] = obj['lastName'];
                result['userAddress'] = obj['userAddress']
                result['gender'] = obj['gender'];
                result['firstName'] = obj['firstName'];
                result['middleName'] = obj['middleName'];
                result['accountNumber'] = obj['accountNumber'].toString();
                result['isActive'] = result['isActive'];
                result['phone'] = obj['phone'].toString();
                result['userPin'] = obj['userPin'].toString();
                console.log(result)

                //arr.push(result)
                data.push(result)


            }


            res.send({
                status: "SE200",
                data
            });

        });

    } catch (error) {

    }




}




const oneRanger = async (req, res, next) => {
    var result = {
        idNumber: '',
        dateOfBirth: '',
        lastName: '',
        userAddress: '',
        gender: '',
        firstName: '',
        middleName: '',
        accountNumber: '',
        isActive: true,
        phone: ''
    };

    try {

        var sendPromise = await contract.getRanger(req.body.idTag, req.body.firstName);
        const response = Promise.resolve(sendPromise)
        response.then(obj => {
            // console.log(obj)
            var result = {
                idNumber: '',
                dateOfBirth: '',
                lastName: '',
                userAddress: '',
                gender: '',
                firstName: '',
                middleName: '',
                accountNumber: '',
                isActive: true,
                phone: ''
            };
            result['idNumber'] = obj['idNumber'].toString();
            result['dateOfBirth'] = obj['dateOfBirth'].toString();
            result['lastName'] = obj['lastName'];
            result['userAddress'] = obj['userAddress']
            result['gender'] = obj['gender'];
            result['firstName'] = obj['firstName'];
            result['middleName'] = obj['middleName'];
            result['accountNumber'] = obj['accountNumber'].toString();
            result['isActive'] = result['isActive'];
            result['phone'] = obj['phone'].toString();
            result['userPin'] = obj['userPin'].toString();
            console.log(result)


            res.send({
                status: "SE200",
                result
            });

        });

    } catch (error) {

    }




}




module.exports = {
    viewAllRangers,
    oneRanger,
    oneLandOwner,
    viewAllLandOwners
}