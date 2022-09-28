
var ethers = require('ethers');
const utils = ethers.utils
const reveal=(inBytes)=> {
  return utils.parseBytes32String(inBytes);
}

const connection = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/', { chainId: 80001 });

let contractAddress = "0xB2a01C6f6B7c66bE22A1A523acD0D3778BFE95c0";
let privateKey = "0xee1d97b85ec19d7ed8a3beff5e6b3f9a43afc4ccaabfe8bed475b1a68bbd01d8";
const Donor = "(bytes32 idNumber,bytes32 email,bytes32 typeOf)";
const LandOwner ="( bytes32 idNumber,bytes32 dateOfBirth,bytes32 lastName,bytes32 conservancy,bytes32 landAcreSize,bytes32 userAddress,bytes32 gender,bytes32  firstName,bytes32 middleName,bytes32 userPin,bytes32 accountNumber,bool isActive,bytes32 phone,bytes32 fullName,bytes32 leaseFee)";
  const Ranger ="(bytes32 idNumber,bytes32 dateOfBirth,bytes32 lastName,bytes32 userAddress,bytes32 gender,bytes32 firstName,bytes32 middleName,bytes32 accountNumber,bool isActive,bytes32 phone,bytes32 userPin,bytes32 fullName,bytes32 salary)";

const ABI = [

  `function addRanger(bytes32 _id,bytes32 _userAdd,bytes32 _gender,bytes32 _dob,bytes32 _phone,bytes32 _middleName,bytes32 _firstName,bytes32 _lastName,bytes32 _account,bytes32 _fullName) public`,
  `function getRanger(bytes32 _idNumber) public view returns (${Ranger}) `,
  ` function getAllRangers() public view returns (${Ranger}[])`,
  `event AddedRanger(${Ranger} created)`,

  `event AddedLandOwner(${LandOwner} created)`,
  `function addLandOwner(bytes32 _idNumber,bytes32 _middleName,bytes32 _firstName,bytes32  _lastName,bytes32 _userAddress,bytes32 _gender,bytes32 _dob,bytes32 _phone,bytes32  _account,bytes32 _landSize,bytes32 _fullName, bytes32 _conservancy) public`,
    `function getLandOwner(bytes32 _idNumber) public view returns (${LandOwner}) `,
  ` function getAllLandOwners() public view returns (${LandOwner}[])`,





    `event AddedDonor(${Donor}  created)`,
    `function getDonor(bytes32 _idNumber) public view returns (${Donor}) `,
  `function getAllDonors() public view returns (${Donor}[])`,
  `function addDonor(bytes32  _idNumber,bytes32  _email, bytes32  _typeOf) public`];
const contract = new ethers.Contract(contractAddress, ABI, connection);
var signer = new ethers.Wallet(privateKey, connection)
const txSigner = contract.connect(signer);

module.exports = {
  contract,
  Donor,
  Ranger,
  LandOwner,
  ABI,
  txSigner,
  reveal,
  allowedOrigins: ['http://localhost:3000/'],
  SERVER_PORT: process.env.PORT || 3000,
  SERVER_DB_URI: process.env.DB_URI,
  JWT_SECRET: 'thisIsASimpleTest',
  OTP_LENGTH: 10,
  OTP_CONFIG: {
    upperCaseAlphabets: false,
    specialChars: false,
  },
  MAIL_SETTINGS: {
    service: 'gmail',
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  },
}