var ethers = require('ethers');
const utils = ethers.utils
const ID = require("nodejs-unique-numeric-id-generator");
const reveal = (inBytes) => {
    return utils.parseBytes32String(inBytes);
}


 const connection = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/', { chainId: 80001 });
require('dotenv').config();
process.env.USER_ID;
let contractAddress = "0x7505A4BDcc5E782eD9e0c1Bc36B53359505F923F";
let privateKey = "0xee1d97b85ec19d7ed8a3beff5e6b3f9a43afc4ccaabfe8bed475b1a68bbd01d8";
const Admin = "(string conservancy,bytes32 accountNumber,bytes32 userId,bytes32 email,bytes32 phrase)";
const ABI = [

    `event AddedAdmin(${Admin}  created)`,
    `function getAdmin(bytes32 _idNumber) public view returns (${Admin}) `,
    `function getAllAdmins() public view returns (${Admin}[])`,
    `function addAdmin(bytes32  _userId,bytes32  _email, bytes32  _accountNumber,bytes32  _phrase,string _conservancy) public`];
const contract = new ethers.Contract(contractAddress, ABI, connection);
var signer = new ethers.Wallet(privateKey, connection)
const txSigner = contract.connect(signer);



module.exports={
    contract,
    txSigner,
    Admin,
    ABI,
    reveal
}