/**
 * @module {import} CryptoJS
 */
const CryptoJS = require("crypto-js");
/**
 * @module {export} decryptValue
 * @param {*} getValue 
 */

module.exports = class decrypt {
    constructor() {
        this.base64Key = "ODNBQkNCOTRCM0ZDNgAAAA==";
        this.key = CryptoJS.enc.Base64.parse(this.base64Key);
    }

    getDecryptedValue(getValue) {
        console.log('Shiva: decrypt -> getDecryptedValue -> getValue', getValue);
        return CryptoJS.AES.decrypt(getValue, this.key, {
            iv: this.key
        }).toString(CryptoJS.enc.Utf8);
    }

    getEncryptedValue(getValue) {
        console.log('Shiva: decrypt -> getEncryptedValue -> getValue', getValue);
        return CryptoJS.AES.encrypt(getValue, this.key, {
            iv: this.key
        }).toString();
    }
    getKey(){
        return this.key;
    }
}





