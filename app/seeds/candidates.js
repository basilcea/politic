import users from "./users" ;
import offices from "./offices" ;
import parties from "./parties" ;
import seed from "../helpers/seed";

export const candidatesA=[
  {
    "office" :1  ,
    "party" : 1  ,
    "candidate" : 1 ,
  },
  {
    "office" : 2,
    "party" : 2 ,
    "candidate" :2 ,

  }
]
export const seedCandidates =seed('candidates', candidatesA)