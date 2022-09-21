
var ethers = require('ethers');
const otpGenerator = require('otp-generator');
const connection = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/', { chainId: 80001 });
let contractAddress = "0x92023772b3bB1C0C7C60899A585A7281F0153660";
const privateKey = "0xee1d97b85ec19d7ed8a3beff5e6b3f9a43afc4ccaabfe8bed475b1a68bbd01d8";
const Ranger = "(uint256 idNumber,uint256 dateOfBirth,string lastName,string userAddress,string gender,string  firstName,string middleName,uint256 accountNumber,bool isActive,uint256 phone)";
const LandOwner=" (uint256 idNumber,uint256 dateOfBirth,string lastName,string conservancy,uint256 landAcreSize,string userAddress,string gender,string  firstName,string middleName,uint256 accountNumber,bool isActive,uint256 phone)";



const ABI = [
    `function addLandOwner(uint256 _id,string _userAdd,string _gender,uint256 _dob,uint _phone,string _middleName,string _firstName,string _lastName,uint256  _account,uint256 _landSize,string _conservancy) public`,
     `function addRanger(uint256 _id,string _userAdd,string  _gender,uint256 _dob,uint _phone,string _middleName,string _firstName,string _lastName,uint256  _account) public`,
    `function getAllUsers() public`,
    `event AddedRanger(${Ranger}  created)`,
    `event AddedDonor(Donor created)`,
    `event AddedLandOwner(${LandOwner}  created)`,
    `event AddedRest(string test)`,
    `function addDonor(string _name,string _password) public`


];
const contract = new ethers.Contract(contractAddress, ABI, connection);
var signer = new ethers.Wallet(privateKey, connection)
const txSigner = contract.connect(signer);


const saveRanger = async (req, res, next) => {
    var result={idNumber:'',
    dateOfBirth:0,
    lastName: '',
    userAddress: '',
    gender: '',
    firstName: '',
    middleName: '',
    accountNumber: '',
    isActive: true,
    phone: ''};


    try {
        // var result = [];
         const amt = ethers.utils.parseUnits("10", 18)
        const tx = await txSigner.addRanger(amt,'116,adeboye compound ilaje bariga','female','14101992','09078099974','CHRISTINE WAITHERA','MWAURA','WAMBUI','001980058',)
        const iface = new ethers.utils.Interface(ABI);
        contract.on("AddedRanger",(Ranger,event) => {
            const data = Promise.resolve(Ranger)
            data.then(value => {
                result['idNumber']=value.idNumber.toString();
                result['firstName']=value.firstName;
                result['middleName']=value.middleName;
                result['lastName']=value.lastName;
                result['gender']=value.gender;
                result['dateOfBirth']=value.dateOfBirth.toString();
                result['phone']=value.phone.toString();
                result['userAddress']=value.userAddress
                result['accountNumber']=value.accountNumber.toString()
                result['isActive']=JSON.parse(value.isActive);
               res.json({ status: "SE200", Data: result})
               console.log({
                value: Ranger
            });
            });
           
           
        });
        // let decodedData = iface.parseTransaction({ data: tx.data,value:tx.value });
        // const data = Promise.resolve(decodedData)
        //  data.then(value => {
        //     res.json({ status: "SE200", Data: value })
        //  });
       
    }
    catch (error) {
        res.status(400).json({ message: error['message']})
    }
}

const saveLandOwner = async (req, res, next) => {
    var result={idNumber:'',
    dateOfBirth:0,
    lastName: '',
    userAddress: '',
    gender: '',
    firstName: '',
    middleName: '',
    accountNumber: '',
    acre: '',
    conservancy: '',
    isActive: false,
    phone: ''};


    try {
        // var result = [];
         const amt = ethers.utils.parseUnits("10", 18)
        const tx = await txSigner.addLandOwner(amt,'116,adeboye compound ilaje bariga','female','14101992','09078099974','CHRISTINE WAITHERA','MWAURA','WAMBUI','001980058','5','ishera')
        contract.on("AddedLandOwner",(LandOwner,event) => {
            const data = Promise.resolve(LandOwner)
            data.then(value => {
                result['idNumber']=value.idNumber.toString();
                result['firstName']=value.firstName;
                result['middleName']=value.middleName;
                result['lastName']=value.lastName;
                result['gender']=value.gender;
                result['dateOfBirth']=value.dateOfBirth.toString();
                result['phone']=value.phone.toString();
                result['userAddress']=value.userAddress;
                result['accountNumber']=value.accountNumber.toString()
                result['conservancy']=value.conservancy.toString()
                result['acre']=value.landAcreSize.toString()
                result['isActive']=JSON.parse(value.isActive);
               res.json({ status: "SE200", Data: result});
            });
        });
        // let decodedData = iface.parseTransaction({ data: tx.data,value:tx.value });
        // const data = Promise.resolve(decodedData)
        //  data.then(value => {
        //     res.json({ status: "SE200", Data: value })
        //  });
       
    }
    catch (error) {
        res.status(400).json({ message: error['message']})
    }
}


module.exports = {
    saveLandOwner,
    saveRanger

};