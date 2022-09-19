const { getUserService } = require("../../services/user/getUserService");
const { CheckListType } = require("../../utils/CheckType")
const argon2 = require('argon2'); 
const jsonwebtoken = require('jsonwebtoken');

async function Login({username = '', password = ''}) {
    try {
        //Check User Values
        await CheckListType([
            {fieldValue: username, fieldName: 'username', type: 'string', checkNotUndefined: true },
            {fieldValue: password, fieldName: 'password', type: 'string', checkNotUndefined: true }
        ])

        //Get user
        const user = await getUserService({username});
        if(!user){
            console.error(`User ${username} doesn't exists`)
            return {codeResult: 403, jwt: null}
        }

        //Check password authentication
        const verifyPassword = await argon2.verify(user.password, password);
        if(!verifyPassword){
            console.error(`Wrong password`)
            return {codeResult: 403, jwt: null}
        }

        //Generate user jwt
        const jwt = jsonwebtoken.sign({username: user.username}, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRATION
        });
        return {codeResult: 200, jwt: jwt}
    } catch (error) {
        console.error(error)
        return {codeResult: 400, jwt: null}
    }
}

module.exports = {Login}

