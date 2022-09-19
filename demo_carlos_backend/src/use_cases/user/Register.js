const { addUserService } = require("../../services/user/addUser");
const { CheckPassword } = require("../../utils/CheckPassword");
const { CheckListType } = require("../../utils/CheckType")
const argon2 = require('argon2'); 
const jsonwebtoken = require('jsonwebtoken');

async function Register({username = '', password = ''}) {
    try {
        //Check User Values
        await CheckListType([
            {fieldValue: username, fieldName: 'username', type: 'string', checkNotUndefined: true },
            {fieldValue: password, fieldName: 'password', type: 'string', checkNotUndefined: true }
        ])
        //Check password complexity
        const passwordChecked = await CheckPassword(password);
        if(!passwordChecked.result){
            console.error(passwordChecked.error)
            return {codeResult: 400, jwt: null}
        }
        //Generate User's JWT
        const jwt = jsonwebtoken.sign({username: username}, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRATION
        });
        //Argon2 hashing
        const password_hash = await argon2.hash(password);
        
        const addedUser = await addUserService({username, password: password_hash, jwt});
        if(addedUser.error){
            switch (addedUser.error.code.toString()) {
                case '11000': 
                    //Username already exists
                    return {codeResult: 409, jwt: null }
                default:
                    return {codeResult: 400, jwt: null }
            }
        }
        return {codeResult: 200, jwt: addedUser.data.jwt }
    } catch (error) {
        console.error(error)
        return {codeResult: 400, jwt: null}
    }
}

module.exports = {Register}

