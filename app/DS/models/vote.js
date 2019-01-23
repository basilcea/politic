import users from "./user" ;
import offices from "./office" ;
import candidates from "./candidate" ;

const votes=[
  {
    "id":1;
    "createdOn" : new Date() ,
    "createdBy" : users[2].id ,
    "office"  : offices[0].name ,
    'candidate': candidate[0].candidateName
  },
  {
    "id":2;
    "createdOn" : new Date() ,
    "createdBy" : users[2].id ,
    "office"  : offices[4].name ,
    'candidate': candidate[3].candidateName
  },
  {
    "id":3;
    "createdOn" : new Date() ,
    "createdBy" : users[2].id ,
    "office"  : offices[0].name ,
    'candidate': candidate[2].candidateName
  },
  {
    "id":4;
    "createdOn" : new Date() ,
    "createdBy" : users[2].id ,
    "office"  : offices[2].name ,
    'candidate': candidate[1].candidateName
  },
  {
    "id":5;
    "createdOn" : new Date() ,
    "createdBy" : users[2].id ,
    "office"  : offices[3].name ,
    'candidate': candidate[4].candidateName
  }
]

export default votes