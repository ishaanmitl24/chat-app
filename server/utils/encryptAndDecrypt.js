const CryptoJS = require("crypto-js");

const encryptSomeText = ({ dataToEncrypt, encryptKey }) => {
  const encryptData = CryptoJS.AES.encrypt(
    dataToEncrypt,
    encryptKey
  ).toString();

  return encryptData;
};

const decryptSomeText = ({ dataToDecrypt, decryptKey }) => {
  const bytes = CryptoJS.AES.decrypt(dataToDecrypt, decryptKey);
  const decryptData = bytes.toString(CryptoJS.enc.Utf8);

  return decryptData;
};

module.exports = { encryptSomeText, decryptSomeText };
