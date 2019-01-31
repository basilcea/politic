import client from '../connect';

  export const dropUserTable = async function(){
    try{
      await client.query(`DROP TABLE IF EXISTS users CASCADE`)
      console.log('User table deleted')
    }catch(err){
      console.log(err)
    };
  };
  export const createUserTable = async function(){
    try{
      await client.query(`
        CREATE TABLE IF NOT EXISTS users(
          id Serial PRIMARY KEY,
          firstname VARCHAR(20),
          lastname VARCHAR(20),
          othername VARCHAR(30) UNIQUE not null,
          email VARCHAR(40) UNIQUE not null,
          phoneNumber VARCHAR(11),
          passportUrl TEXT,
          password VARCHAR(255) UNIQUE not null,
          password2 VARCHAR(255) UNIQUE not null,
          isCandidate BOOLEAN,
          isAdmin BOOLEAN
        )`
      )
      console.log('User table created')
    }catch(err){
      console.log(err)
    }
  };
  export const dropPartyTable= async function(){
    try{
      await client.query(`DROP TABLE IF EXISTS parties CASCADE`)
      console.log('party table deleted')
    }catch(err){
      console.log(err)
    }

  }
  export const createPartyTable = async function(){
    try{
      await client.query(
        `CREATE TABLE IF NOT EXISTS parties(
          id Serial PRIMARY KEY,
          name VARCHAR(50) not null,
          hqAddress VARCHAR(400) not null,
          logoUrl TEXT
        )`
      )
      console.log('Party table created')
    }catch(err){
      console.log(err)
    }
  }
  export const dropVoteTable = async function(){
    try{
      await client.query(`DROP TABLE IF EXISTS votes CASCADE`)
      console.log('votes table deleted')
    }catch(err){
      console.log(err)
    }
    ;
  }
  export const createVoteTable = async function(){
    try{
      await client.query(`
        CREATE TABLE IF NOT EXISTS votes(
          id serial PRIMARY KEY,
          createdOn timestamp,
          createdBy Integer references users(id) ON DELETE CASCADE,
          office Integer references offices(id) On DELETE CASCADE,
          candidate Integer references candidates(id) ON DELETE CASCADE
        )`
      )
      console.log('Votes table created')
    }catch(err){
      console.log(err)
    }

  };
 export const dropOfficeTable = async function(){
    try{
      await client.query(`DROP TABLE IF EXISTS offices CASCADE`)
      console.log('offices table deleted')
    }catch(err){
      console.log(err)
    }

  }
   export const createOfficeTable = async function(){
    try{
      await client.query(`
        CREATE TABLE IF NOT EXISTS offices(
          id serial PRIMARY KEY,
          type varchar(255),
          name Varchar(255)
        )`
      )
      console.log('offices table created')
    }catch(err){
      console.log(err)
    }
    ;
  }

export const dropCandidateTable = async function(){
    try{
      await client.query(`DROP TABLE IF EXISTS candidates CASCADE`)
      console.log('candidates table deleted')
    }catch(err){
      console.log(err)
    }

  }
 export const createCandidateTable = async function(){
    try{
      await client.query(`
        CREATE TABLE IF NOT EXISTS candidates(
          id serial PRIMARY KEY,
          office integer references offices(id) ON DELETE CASCADE,
          party integer references parties(id) ON DELETE CASCADE,
          candidate integer references parties(id) ON DELETE CASCADE
        )`
      )
      console.log('candidates table created')
    }catch(err){
      console.log(err)
    }
    ;
  }

export const dropPetitionTable = async function(){
    try{
      await client.query(`DROP TABLE IF EXISTS petitions`)
      console.log('offices table deleted')
    }catch(err){
      console.log(err)
    }

  }
export const createPetitionTable = async function(){
    try{
      await client.query(`
        CREATE TABLE IF NOT EXISTS offices(
          id serial PRIMARY KEY,
          createdOn timestamp,
          createdBy Integer references users(userId) ON DELETE CASCADE,
          office Integer references offices(officeId) On DELETE CASCADE,
          subject text ,
          body text
        )`
      )
      console.log('offices table created')
    }catch(err){
      console.log(err)
    }
    ;
  }
   export const dropAllTables = async function(){
    try{
      await dropUserTable()
      await dropPartyTable()
      await dropCandidateTable()
      await dropVoteTable()
      await dropPetitionTable()
      await dropOfficeTable()
      console.log('All Tables deleted')
    }catch(err){
      console.log(err)
    }

  }
   export const createAllTables =  async function(){
    try{
      await createUserTable()
      await createPartyTable()
      await createCandidateTable()
      await createVoteTable()
      await createPetitionTable()
      await createOfficeTable()
    console.log('All Tables created')
    }catch(err){
      console.log(err)
    }

  }
 require('make-runnable')