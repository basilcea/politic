import seed from "../helpers/seed";

export const users = [
  {
    "firstname": "'Ogbonna'",
    "lastname":  "'Basil'",
    "othername": "'Cea'" ,
    "email": "'basilcea@yahoo.co.uk'",
    "phoneNumber":"'08221111111'",
    "passportUrl":" '../../UI/Static/basil.jpg'" ,
    "password":"'nichjel2'",
    "password2":"'nichjel2'",
    "isCandidate": false,
    "isAdmin": true
  },
  {
    "firstname": "'lind'" ,
    "lastname": "'Thsu'",
    "othername":"''",
    "email": "'thsu@yahoo.co.uk'",
    "phoneNumber": "'07121111112'",
    "passportUrl":"'../../UI/Static/thsu.jpg'" ,
    "password":"'nichjel4'",
    "password2":"'nichjel4'",
    "isCandidate": false,
    "isAdmin": false
  },
  {
    "firstname": "'Miky'",
    "lastname": "'Bright'",
    "othername": "'other'",
    "email":"'bright.m@gmail.com'" ,
    "phoneNumber":"'06721111112'",
    "passportUrl": "'../../UI/Static/bright.jpg'",
    "password":"'nichjel1'",
    "password2":"'nichjel1'",
    "isCandidate": false,
    "isAdmin": false
  }
];


export const seedUsers = seed("users", users)