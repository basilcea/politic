import seedUsers from './users'
import seedCandidates from './candidates'
import seedOffices from './offices'
import seedParties from './parties'
import seedPetitions from './petitions'
import seedVotes from './votes'



const seedAll = async function(){
  try{
    await seedUsers()
    await seedOffices()
    await seedCandidates()
    await seedParties()
    await seedPetitions()
    await seedVotes()
  }catch(err){
    console.log(err)
  }
}
export default seedAll