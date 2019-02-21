import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import 'dotenv';

const authHelper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  isUniqueEmail(columnValue, query) {
    const allValues = query.rows.map(a => a.email);
    if (query === undefined || allValues.includes(columnValue) === false) {
      return null;
    }
  },
  isUniquePhone(columnValue, query) {
    const allValues = query.rows.map(a => a.phonenumber);
    if (query === undefined || allValues.includes(columnValue) === false) {
      return null;
    }
  },
  isUniqueName(columnValue, query) {
    const allValues = query.rows.map(a => a.name);
    if (query === undefined || allValues.includes(columnValue) === false) {
      return null;
    }
  },
  generateToken(id, isAdmin) {
    const token = jwt.sign(
      {
        id,
        isAdmin,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
    return token;
  },
};

export default authHelper;
