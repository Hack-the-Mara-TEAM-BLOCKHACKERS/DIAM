
const diamModel = require('../model/model')
var ethers = require('ethers');


const connection = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/', { chainId: 80001 });
let contractAddress = "0x92023772b3bB1C0C7C60899A585A7281F0153660";
const privateKey = "0xee1d97b85ec19d7ed8a3beff5e6b3f9a43afc4ccaabfe8bed475b1a68bbd01d8";
const Donor="(uint256 idNumber,string firstName,string lastName,string email,uint256 phone,string typeOf)";
const ABI = [
    `function addLandOwner(uint256 _id,string _userAdd,string _gender,uint256 _dob,uint _phone,string _middleName,string _firstName,string _lastName,uint256  _account,uint256 _landSize,string _conservancy) public`,
     `function addRanger(uint256 _id,string _userAdd,string  _gender,uint256 _dob,uint _phone,string _middleName,string _firstName,string _lastName,uint256  _account) public`,
    `function getAllUsers() public`,
    `event AddedDonor(${Donor}  created)`,
    `function addDonor(uint256 _idNumber,string _lastName,string _firstName,string _email,uint256  _phone, string _typeOf) public`


];
const contract = new ethers.Contract(contractAddress, ABI, connection);
var signer = new ethers.Wallet(privateKey, connection)
const txSigner = contract.connect(signer);


const home = (req, res, next) => {
    res.json("Ayo Solomon,Chinwendu Iheanetu,Micheal Oladipopo presents Sopa-Ereto first place winner at Hack The Mara"
    )
}




const addDonor = async (req, res, next) => {
 

    try {
        // var result = [];
         const id = ethers.utils.parseUnits(req.body.idNumber, 18)
         const phone = ethers.utils.parseUnits(req.body.phone, 18)
       
        const tx = await txSigner.addDonor(id,req.body.firstName,req.body.lastName,req.body.email,phone,req.body.typeOf);
        contract.on("AddedDonor",async(Donor,event) => {
            var result={idNumber:'',
            lastName: '',
            email: '',
            firstName: '',
            typeOf: '',
            phone: ''};
        
            const data =  Promise.resolve(Donor)
            data.then(value => {
                result['idNumber']=value.idNumber.toString();
                result['firstName']=value.firstName;
                result['lastName']=value.lastName;
                result['email']=value.email;
                result['phone']=value.phone.toString();
                result['typeOf']=value.typeOf;
                return res.json({ status: "SE200", Data:result});
            });
       
        });
      
    }
    catch (error) {
      return  res.json({ message: error['message']});
    }
}


// const loginDonor = (req, res, next) => {
//     diamModel.findOne({ email: req.body.email }, (err, data) => {
//         if (data) {
//             return res.json({
//                 status: 200,
//                 data: data
//             }); } else {
//             if (err) return res.json({
//                 status: 500,
//                 Error: 'something went wrong $err'
//             });
//             return res.json({
//                 status: 404,
//                 error: 'User not found'
//             });

//         }
//     })

// };

// const allDonor = (req, res, next) => {
//     diamModel.find({}, (err, data) => {

//         if (err) return res.json({
//             Error: err
//         });
//         return res.json({
//             status: 200,
//             data: data
//         });


//     })

// };
// const registerDonor = (req, res, next) => {

//     diamModel.findOne({ email: req.body.email }, (err, data) => {
//         if (!data) {
//             const newDiam = new diamModel({
//                 email: req.body.email,
//                 image: req.body.image,
//                 password: req.body.password,
//                 donor: req.body.donor

//             })

//             newDiam.save((err, response) => {
//                 if (err) return res.json({
//                     Error: err
//                 });
//                 return res.json({
//                     status: 200,
//                     "data": response
//                 });

//             })
//         } else {
//             if (err) return res.json({
//                 Error: 'something went wrong $err'
//             });
//             return res.json({
//                 status: 302,
//                 data: 'User already exist'
//             });

//         }
//     })





// }



module.exports = {
    home,
    addDonor
    // loginDonor,
    // registerDonor,
    // allDonor

};