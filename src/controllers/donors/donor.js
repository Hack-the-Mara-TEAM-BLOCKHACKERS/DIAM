
var ethers = require('ethers');
const utils = ethers.utils
const ID = require("nodejs-unique-numeric-id-generator");
const reveal=(inBytes)=> {
  return utils.parseBytes32String(inBytes);
}

const connection = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/', { chainId: 80001 });
require('dotenv').config();
process.env.USER_ID;
let contractAddress = "0xb0244d702483fb0DeEA32C45A342DC17EDE82480";
let privateKey = "0xee1d97b85ec19d7ed8a3beff5e6b3f9a43afc4ccaabfe8bed475b1a68bbd01d8";
const Donor = "(bytes32 userId,bytes32 email,bytes32 typeOf,bytes32 phrase)";
const LandOwner ="(bytes32 idNumber,bytes32 dateOfBirth,bytes32 lastName,bytes32 userAddress,bytes32 gender,bytes32 firstName,bytes32 middleName,bytes32 accountNumber,bool isActive,bytes32 phone,bytes32 userPin,bytes32 fullName,bytes32 landAcreSize,string conservancy)";
const Ranger ="(bytes32 idNumber,bytes32 dateOfBirth,bytes32 lastName,bytes32 userAddress,bytes32 gender,bytes32 firstName,bytes32 middleName,bytes32 accountNumber,bool isActive,bytes32 phone,bytes32 userPin,bytes32 fullName)";

const ABI = [

  `function addRanger(bytes32 _id,bytes32 _userAdd,bytes32 _gender,bytes32 _dob,bytes32 _phone,bytes32 _middleName,bytes32 _firstName,bytes32 _lastName,bytes32 _account,bytes32 _fullName) public`,
  `function getRanger(bytes32 _idNumber) public view returns (${Ranger}) `,
  ` function getAllRangers() public view returns (${Ranger}[])`,
  `event AddedRanger(${Ranger} created)`,

  `event AddedLandOwner(${LandOwner} created)`,
  `function addLandOwner(bytes32 _id,bytes32 _userAdd,bytes32 _gender,bytes32 _dob,bytes32 _phone,bytes32 _middleName,bytes32 _firstName,bytes32 _lastName,bytes32 _account,bytes32 _fullName,bytes32 landAcreSize) public`,
  `function getLandOwners(bytes32 _idNumber) public view returns (${LandOwner}) `,
  ` function getAllLandOwners() public view returns (${LandOwner}[])`,





    `event AddedDonor(${Donor}  created)`,
    `function getDonor(bytes32 _userId) public view returns (${Donor}) `,
  `function getAllDonors() public view returns (${Donor}[])`,
  `function addDonor(bytes32  _userId,bytes32  _email, bytes32  _typeOf,bytes32  _phrase) public`];
const contract = new ethers.Contract(contractAddress, ABI, connection);
var signer = new ethers.Wallet(privateKey, connection)
const txSigner = contract.connect(signer);



const home = async (req, res, next) => {

}

const addDonor = async (req, res, next) => {
    var result = {
        idNumber: '',
        email: '',
        typeOf: '',
    };
  let  yourID = ID.generate(new Date().toJSON());
    var id = utils.formatBytes32String(yourID);
    var phrase = utils.formatBytes32String(req.body._id);
    var email = utils.formatBytes32String(req.body.email);
    var typeOf = utils.formatBytes32String(req.body.typeOf);
    const tx = await txSigner.addDonor(id,email, typeOf,phrase,);
    contract.on("AddedDonor", (Donor, event) => {
        const data = Promise.resolve(Donor)
        if (!data) {
            return res.send({
                status: 'SE404',
                message: 'Registration failed'
            });
        } else {
            data.then(obj => {
                var result = {
                   
                };

                result['userId'] = reveal(obj['userId']);
                result['email'] = reveal(obj['email']);
                result['typeOf'] = reveal(obj['typeOf']);
                result['_id'] = reveal(obj['phrase']);
                return res.send({
                    status: 'SE200',
                    data: result
                });

            })
        }


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


                result['idNumber'] = reveal(obj['userId']).toString();
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
    try {
        let data = [];
        var _id = utils.formatBytes32String(req.body._id);
        var sendPromise = await txSigner.getDonor(_id);
      
        const response = Promise.resolve(sendPromise)
        response.then(obj => {

            var result = {};
     
          
            result['userId'] = reveal(obj['userId']);
            result['email'] = reveal(obj['email']);
            result['typeOf'] = reveal(obj['typeOf']);
            result['_id'] = reveal(obj['phrase']);
          
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
    home,
    addDonor,
    loginDonor,
    viewAllDonor
    // registerDonor,
    // allDonor

};