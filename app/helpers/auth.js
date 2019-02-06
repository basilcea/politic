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
    isValidNumber(number){
        return /^\d+$/.test(number)
    },
    isValidPhone(number){
      return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(number)
    },
    isValidPassword(password){
        return /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/.test(password)
        /*must be between 6 and  15 characters containing at least one letter and one digit */
    },
    isValidName(name){
      return /^[a-zA-Z]+$/.test(name)
    },
    isUniqueEmail(columnValue,query){
        let allEmails = query.rows.map (a=>a.email)
        if(query === undefined || allEmails.includes(columnValue)===false){
            return null
        }
    },
    generateToken(id,isAdmin) {
        const token = jwt.sign(
            {
                id: id,
                isAdmin: isAdmin
            },
            process.env.SECRET,
            {expiresIn: '7d' }
        );
        return token;
    },
}

export default authHelper ;