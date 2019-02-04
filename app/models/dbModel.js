import client from '../migrate';
/**
* Delete user table
* @async
* @function dropUserTable
* @return {Promise<string>} user table deleted
*/
export const dropUserTable = async function () {
  try {
    await client.query('DROP TABLE IF EXISTS users CASCADE');
    console.log('User table deleted');
  } catch (err) {
    console.log(err);
  }
};
/**
* Create user table
* @async
* @function createUserTable
* @return {Promise<string>} user table created
*/

export const createUserTable = async function () {
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS users(
          id Serial PRIMARY KEY,
          firstname VARCHAR(20) not null,
          lastname VARCHAR(20),
          othername VARCHAR(30),
          email VARCHAR(40) UNIQUE not null,
          phoneNumber VARCHAR(11),
          passportUrl TEXT,
          password VARCHAR(255) UNIQUE not null,
          registerAs text not null,
          isCandidate BOOLEAN,
          isAdmin BOOLEAN
        )`);
    console.log('User table created');
  } catch (err) {
    console.log(err);
  }
};
/**
* Delete party table
* @async
* @function dropPartyTable
* @return {Promise<string>} party table deleted
*/
export const dropPartyTable = async function () {
  try {
    await client.query('DROP TABLE IF EXISTS parties CASCADE');
    console.log('party table deleted');
  } catch (err) {
    console.log(err);
  }
};
/**
* Create party table
* @async
* @function createUserTable
* @return {Promise<string>} party table created
*/
export const createPartyTable = async function () {
  try {
    await client.query(
      `CREATE TABLE IF NOT EXISTS parties(
          id Serial PRIMARY KEY,
          name VARCHAR(50) not null,
          AKA VARCHAR(50),
          hqAddress VARCHAR(400) not null,
          logoUrl TEXT not null
        )`
    );
    console.log('Party table created');
  } catch (err) {
    console.log(err);
  }
};
/**
* Delete vote table
* @async
* @function dropVoteTable
* @return {Promise<string>} votes table deleted
*/
export const dropVoteTable = async function () {
  try {
    await client.query('DROP TABLE IF EXISTS votes CASCADE');
    console.log('votes table deleted');
  } catch (err) {
    console.log(err);
  }
};

/**
* Create vote table
* @async
* @function createVoteTable
* @return {Promise<string>} votes table created
*/

export const createVoteTable = async function () {
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS votes(
          id serial PRIMARY KEY,
          createdOn timestamp Default Current_timeStamp,
          createdBy Integer references users(id) ON DELETE CASCADE,
          office Integer references offices(id) On DELETE CASCADE,
          candidate Integer references candidates(id) ON DELETE CASCADE
        )`);
    console.log('Votes table created');
  } catch (err) {
    console.log(err);
  }
};
/**
* Delete Office table
* @async
* @function dropOfficeTable
* @return {Promise<string>} offices table deleted
*/

export const dropOfficeTable = async function () {
  try {
    await client.query('DROP TABLE IF EXISTS offices CASCADE');
    console.log('offices table deleted');
  } catch (err) {
    console.log(err);
  }
};
/**
* Create Office table
* @async
* @function createOfficeTable
* @return {Promise<string>} offices table deleted
*/

export const createOfficeTable = async function () {
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS offices(
          id serial PRIMARY KEY,
          type varchar(255),
          name Varchar(255)
        )`);
    console.log('offices table created');
  } catch (err) {
    console.log(err);
  }
};

/**
* Delete Candidate table
* @async
* @function dropCandidateTable
* @return {Promise<string>} candidates table deleted
*/

export const dropCandidateTable = async function () {
  try {
    await client.query('DROP TABLE IF EXISTS candidates CASCADE');
    console.log('candidates table deleted');
  } catch (err) {
    console.log(err);
  }
};

/**
* create Candidate table
* @async
* @function createCandidateTable
* @return {Promise<string>} candidates table deleted
*/
export const createCandidateTable = async function () {
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS candidates(
          id serial PRIMARY KEY,
          office integer references offices(id) ON DELETE CASCADE,
          party integer references parties(id) ON DELETE CASCADE,
          candidate integer references parties(id) ON DELETE CASCADE
        )`);
    console.log('candidates table created');
  } catch (err) {
    console.log(err);
  }
};

/**
* Delete petition table
* @async
* @function dropPetitionTable
* @return {Promise<string>} petition table deleted
*/

export const dropPetitionTable = async function () {
  try {
    await client.query('DROP TABLE IF EXISTS petitions');
    console.log('offices table deleted');
  } catch (err) {
    console.log(err);
  }
};

/**
* Create petition table
* @async
* @function createPetitionTable
* @return {Promise<string>} petition table created
*/
export const createPetitionTable = async function () {
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS petitions(
          id serial PRIMARY KEY,
          createdOn timestamp Default Current_timeStamp,
          createdBy Integer references users(id) ON DELETE CASCADE,
          office Integer references offices(id) On DELETE CASCADE,
          subject text ,
          body text
        )`);
    console.log('offices table created');
  } catch (err) {
    console.log(err);
  }
};

/**
* Delete all tables
* @async
* @function dropAllTables
* @return {Promise<string>} All table deleted
*/

export const dropAllTables = async function () {
  try {
    await dropUserTable();
    await dropPartyTable();
    await dropCandidateTable();
    await dropVoteTable();
    await dropPetitionTable();
    await dropOfficeTable();
    console.log('All Tables deleted');
  } catch (err) {
    console.log(err);
  }
};
/**
* Create all tables
* @async
* @function createAllTables
* @return {Promise<string>} All table created
*/

export const createAllTables = async function () {
  try {
    await dropAllTables();
    await createUserTable();
    await createPartyTable();
    await createOfficeTable();
    await createCandidateTable();
    await createVoteTable();
    await createPetitionTable();

    console.log('All Tables created');
  } catch (err) {
    console.log(err);
  }
};
// run each function seperately.
require('make-runnable');
