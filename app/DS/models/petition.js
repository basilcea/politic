import candidates from "./users" ;
import offices from "./office" ;
const petition =[
  {
    "id":1,
    "createdOn": new Date() ,
    "createdBy": candidates[0].candidateName,
    "office": offices[0].name,
    "subject": "Petition against Presidency Election" ,
    "body":"This is a petition against the presidenct election held in lagos on this date"
  },
   {
    "id":2,
    "createdOn": new Date() ,
    "createdBy": candidates[4].candidateName,
    "office": offices[3].name,
    "subject": "Petition against senatorial Election for Akwa-Ibom south" ,
    "body":"This is a petition against the presidenct election held in Akwa ibom south on this date"
  }
]