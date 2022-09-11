const CryptoJS = require('crypto-js')

// Password security
const EncryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET).toString()
}
const DecryptPassword = (hashedPassword) => {
    return CryptoJS.AES.decrypt(hashedPassword, process.env.PASSWORD_SECRET).toString(CryptoJS.enc.Utf8)
}

module.exports = { EncryptPassword, DecryptPassword }