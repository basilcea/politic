import seed from "../helpers/seed";
export const votes=[
  {
    "id":1,
    "createdBy" : 1,
    "office"  : 1 ,
    'candidate': 1
  },
  {
    "id":2,
    "createdBy" : 1,
    "office"  : 1 ,
    'candidate': 2
  }
]

export const seedVotes = seed('votes', votes)