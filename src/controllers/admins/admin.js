
var ethers = require('ethers');
const utils = ethers.utils
const ID = require("nodejs-unique-numeric-id-generator");
const { txSigner,contract,Admin,reveal } = require('../../constants/admin_data');






const addAdmin = async (req, res, next) => {


    try {

        let yourID = ID.generate(new Date().toJSON());
        var id = utils.formatBytes32String(yourID);
        var phrase = utils.formatBytes32String(req.body._id);
        var email = utils.formatBytes32String(req.body.email);
  
        var acct = utils.formatBytes32String(req.body.accountNumber);
        const tx = await txSigner.addAdmin(id, email, acct, phrase, req.body.conservancy);
        contract.on("AddedAdmin", (Admin, event) => {
            const data = Promise.resolve(Admin)
            console.log(data)
            if (!data) {
                return res.send({
                    status: 'SE404',
                    message: 'Registration failed'
                });
            } else {
                data.then(obj => {
                    var result = {};

                    result['idNumber'] = reveal(obj['userId']).toString();
                    result['email'] = reveal(obj['email']);
                    result['accountNumber'] = reveal(obj['accountNumber']);
                    result['conservancy'] = obj['conservancy'];

                    return res.send({
                        status: 'SE200',
                        data: result
                    });

                })
            }


        })
    }

    catch (error) {
        return res.send({
            status: 'SE404',
            message: 'Registration failed'
        });

    }

}


const viewAllAdmin = async (req, res, next) => {
    var result = {
        idNumber: '',
        email: '',
        typeOf: '',

    };

    try {
        let data = [];
        var sendPromise = await contract.getAllAdmins();
        const response = Promise.resolve(sendPromise)
        response.then(resp => {

            if (!resp) {
                return res.send({
                    status: 'SE404',
                    message: 'error failed'
                });
            } else {
                for (let i = 0; i <= resp.length - 1; i++) {

                    var obj = Object.assign({}, resp[i]);
    
                    var result = { };
                     result['idNumber'] = reveal(obj['_idNumber']).toString();
                    result['email'] = reveal(obj['email']);
                    result['accountNumber'] = reveal(obj['accountNumber']);
                    result['conservancy'] = obj['conservancy'];
    
                    data.push(result)
    
    
                }
    
    
                res.send({
                    status: "SE200",
                    data
                });
                
            }

           

        });

    } catch (error) {

    }




}




const loginAdmin = async (req, res, next) => {
    try {
        let data = [];
        var _id = utils.formatBytes32String(req.body._id);
        var sendPromise = await txSigner.getAdmin(_id);

        const response = Promise.resolve(sendPromise)
        response.then(obj => {

            var result = {};


            result['idNumber'] = reveal(obj['userId']).toString();
            result['email'] = reveal(obj['email']);
            result['accountNumber'] = reveal(obj['accountNumber']);
            result['conservancy'] = obj['conservancy'];

            data.push(result);
            res.send({
                status: "SE200",
                data
            });

        });

    } catch (error) {

    }
}

module.exports = {
    addAdmin,
    loginAdmin,
    viewAllAdmin

};