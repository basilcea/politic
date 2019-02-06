import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import 'dotenv';

const authHelper  = {
    hashPassword(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    },

    comparePassword(hashPassword, password){
        return bcrypt.compareSync(password,hashPassword)
    },

    isValidEmail(email){
        return /\S+@\S+\.\S+/.test(email)
    },
    isValidPassword(password){
        return /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/.test(password)
        /*must be between 6 and  15 characters containing at least one letter and one digit */
    },
    isUniqueUserName(columnValue,query){
        if(query === undefined || columnValue.toLowerCase() !== query.username.toLowerCase()){
            return  null
        }
    },
    isLoggedOut(){

    },
    isValidName(name){
      return /^[a-zA-Z]+$/.test(name)
    },
    isUniqueEmail(columnValue,query){
        if(query === undefined ||columnValue !== query.email ){
            return null
        }
    },
    generateToken(userId,isAdmin, userName, isCandidate) {
        const token = jwt.sign(
            {
                userId: userId,
                username: userName,
                isAdmin: isAdmin,
                isCandidate: isCandidate
            },
            process.env.SECRET,
            {expiresIn: '7d' }
        );
        return token;
    },
}

export default authHelper ;