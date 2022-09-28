
var ethers = require('ethers');
const utils = ethers.utils;
const otpGenerator = require('otp-generator');
const { txSigner, contract, LandOwner, Donor, Ranger, reveal } = require('../../constants/constants');

const saveRanger = async (req, res, next) => {


    try {

        const removeSpaces = str => str.replace(/\s/g, '');
        let cleanmiddleName = removeSpaces(req.body.middleName);
        var allNames = `${req.body.firstName} ${cleanmiddleName} ${req.body.lastName}`;
        var _id = utils.formatBytes32String(req.body._id);
        var address = utils.formatBytes32String(req.body.address);
        var gender = utils.formatBytes32String(req.body.gender);
        var dob = utils.formatBytes32String(req.body.dob);
        var phone = utils.formatBytes32String(req.body.phone);
        cleanmiddleName = utils.formatBytes32String(cleanmiddleName.toUpperCase());
        var firstName = utils.formatBytes32String(req.body.firstName.toUpperCase());
        var lastName = utils.formatBytes32String(req.body.lastName.toUpperCase());
        var account = utils.formatBytes32String(req.body.account);
        var fullName = utils.formatBytes32String(allNames);


        const tx = await txSigner.addRanger(_id, address, gender, dob, phone, cleanmiddleName, firstName, lastName, account, fullName)

        contract.on("AddedRanger", (Ranger, event) => {
            const data = Promise.resolve(Ranger)
            data.then(obj => {
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
                result['isActive'] = obj['isActive'];
                result['phone'] = reveal(obj['phone']).toString();
                result['userPin'] = reveal(obj['userPin']).toString();
                result['fullName'] = reveal(obj['fullName']).toString();
                result['salary'] = reveal(obj['salary']).toString();
                res.json({ status: "SE200", Data: result })

            });


        });

    }
    catch (error) {
        res.status(400).json({ message: error })
        console.log(error)
    }
}





const saveLandOwner = async (req, res, next) => {


    try {

        const removeSpaces = str => str.replace(/\s/g, '');
        let cleanmiddleName = removeSpaces(req.body.middleName);
        var allNames = `${req.body.firstName} ${cleanmiddleName} ${req.body.lastName}`;
        var _id = utils.formatBytes32String(req.body._id);
        var address = utils.formatBytes32String(req.body.address);
        var gender = utils.formatBytes32String(req.body.gender);
        var dob = utils.formatBytes32String(req.body.dob);
        var phone = utils.formatBytes32String(req.body.phone);
        var cleanmiddle = utils.formatBytes32String(cleanmiddleName);
        var firstName = utils.formatBytes32String(req.body.firstName.toUpperCase());
        var lastName = utils.formatBytes32String(req.body.lastName);
        var account = utils.formatBytes32String(req.body.account);
        var fullName = utils.formatBytes32String(allNames);
        var acre = utils.formatBytes32String(req.body.acreSize);
        var cost = utils.formatBytes32String(req.body.conservancy);


    const tx = await txSigner.addLandOwner(_id, cleanmiddle, firstName, lastName, address, gender, dob, phone, account, acre, fullName, cost)

        contract.on("AddedLandOwner", (LandOwner, event) => {
            const data = Promise.resolve(LandOwner)
            data.then(obj => {
                var result = {};


                result['idNumber'] = reveal(obj['idNumber']).toString();
                result['dateOfBirth'] = reveal(obj['dateOfBirth']).toString();
                result['lastName'] = reveal(obj['lastName']);
                result['userAddress'] = reveal(obj['userAddress']).toString();
                result['gender'] = reveal(obj['gender']).toString();
                result['firstName'] = reveal(obj['firstName']);
                result['middleName'] = reveal(obj['middleName']).toString();
                result['accountNumber'] = reveal(obj['accountNumber']).toString();
                result['isActive'] = obj['isActive'];
                result['phone'] = reveal(obj['phone']).toString();
                result['userPin'] = reveal(obj['userPin']).toString();
                result['fullName'] = reveal(obj['fullName']).toString();
                result['AcreSize'] = reveal(obj['landAcreSize']).toString();
                result['conservancy'] = reveal(obj['conservancy']);
                result['leaseFee'] = reveal(obj['leaseFee']);
                res.json({ status: "SE200", Data: result })

            });


        });
        // let decodedData = iface.parseTransaction({ data: tx.data,value:tx.value });
        // const data = Promise.resolve(decodedData)
        //  data.then(value => {
        //     res.json({ status: "SE200", Data: value })
        //  });

    }
    catch (error) {
        res.status(400).json({ message: error['message'] })
    }
}


module.exports = {
    saveLandOwner,
    saveRanger

};