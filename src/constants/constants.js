//require('dotenv').config();
module.exports = {
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
};


let contractAddress = "0xB689eaAe3da92cB5BFde193C7F5C4f936401EEf2";
const privateKey = "0xee1d97b85ec19d7ed8a3beff5e6b3f9a43afc4ccaabfe8bed475b1a68bbd01d8";



module.exports={
  contractAddress,
  privateKey
}