
const diamModel = require('../../model/model')
var ethers = require('ethers');
const bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
const utils = ethers.utils
const { txSigner, contract, ABI, reveal, } = require('../../constants/constants');






const home = async (req, res, next) => {

}

const addDonor = async (req, res, next) => {
    var result = {
        idNumber: '',
        email: '',
        typeOf: '',
    };

    var _id = utils.formatBytes32String(req.body._id);
    var email = utils.formatBytes32String(req.body.email);
    var typeOf = utils.formatBytes32String(req.body.typeOf);
    const tx = await txSigner.addDonor(_id, email, typeOf);
    contract.on("AddedDonor", (Donor, event) => {
        const data = Promise.resolve(Donor)

        data.then(obj => {
            var result = {
                idNumber: '',
                email: '',
                typeOf: '',
            };

            result['idNumber'] = reveal(obj['idNumber']).toString();
            result['email'] = reveal(obj['email']);
            result['typeOf'] = reveal(obj['typeOf']);
            res.send(result);

        })
    })
}



const viewAllDonor = async (req, res, next) => {
    var result = {
        idNumber: '',
        email: '',
        typeOf: '',

    };

    try {
        let data = [];
        var sendPromise = await contract.getAllDonors();
        const response = Promise.resolve(sendPromise)
        response.then(resp => {

            for (let i = 0; i <= resp.length - 1; i++) {

                var obj = Object.assign({}, resp[i]);

                var result = {
                    idNumber: '',
                    email: '',
                    typeOf: '',
                };


                result['idNumber'] = reveal(obj['idNumber']).toString();
                result['email'] = reveal(obj['email']);
                result['typeOf'] = reveal(obj['typeOf']);

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




const loginDonor = async (req, res, next) => {

}

module.exports = {
    home,
    addDonor,
    loginDonor,
    viewAllDonor
    // registerDonor,
    // allDonor

};