import pool from '../migrate';
import seed from "../helpers/seed";
import candidates from '../seed/candidates'
import users from '../seed/users'
import offices from '../seed/offices'
import parties from '../seed/parties'
import votes from '../seed/votes'
import petitions from '../seed/petitions'

/**
* Delete user table
* @async
* @function dropUserTable
* @return {Promise<string>} user table deleted
*/
export const dropUserTable = async function () {
  try {

    await pool.query('DROP TABLE IF EXISTS users CASCADE');
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

    const userTable = await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id Serial PRIMARY KEY,
        firstname VARCHAR(20) not null,
        lastname VARCHAR(20),
        othername VARCHAR(30),
        email VARCHAR(40) UNIQUE not null,
        phoneNumber VARCHAR(11) not null,
        passportUrl TEXT,
        password VARCHAR(255) UNIQUE not null,
        registerAs text not null,
        isAdmin BOOLEAN
      )`);
    console.log('User table created');
    seed("users",users)
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

    await pool.query('DROP TABLE IF EXISTS parties CASCADE');
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

    await pool.query(
      `CREATE TABLE IF NOT EXISTS parties(
          id Serial PRIMARY KEY,
          name VARCHAR(50) not null,
          AKA VARCHAR(50),
          hqAddress VARCHAR(400) not null,
          logoUrl TEXT not null
        )`
    );
    console.log('Party table created');
     seed("parties",parties)
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

    await pool.query('DROP TABLE IF EXISTS votes CASCADE');
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

    await pool.query(`
      CREATE TABLE IF NOT EXISTS votes(
        id serial unique,
        createdOn timestamp Default Current_timeStamp,
        createdBy Integer references users(id) ON DELETE CASCADE not null,
        office Integer references offices(id) On DELETE CASCADE  not null,
        candidate Integer references candidates(id) ON DELETE CASCADE not null,
        Constraint votes_id_pkey  PRIMARY KEY (createdBy, office)
      )`);
    console.log('Votes table created');
    seed("votes",votes)
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

    await pool.query('DROP TABLE IF EXISTS offices CASCADE');
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

    await pool.query(`
      CREATE TABLE IF NOT EXISTS offices(
        id serial PRIMARY KEY,
        type varchar(255) not null,
        name Varchar(255) not null
      )`);
    console.log('offices table created');
    seed("offices",offices)
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

    await pool.query('DROP TABLE IF EXISTS candidates CASCADE');
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

    await pool.query(`
      CREATE TABLE IF NOT EXISTS candidates(
        id serial Unique,
        office integer references offices(id) ON DELETE CASCADE not null,
        party integer references parties(id) ON DELETE CASCADE not null,
        candidate integer references users(id) ON DELETE CASCADE not null,
        Constraint candidate_id_pkey PRIMARY KEY (office ,candidate)
      )`);
    console.log('candidates table created');
    seed("candidates",candidates);
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

    await pool.query('DROP TABLE IF EXISTS petitions');
    console.log('petitions table deleted');
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

    await pool.query(`
      CREATE TABLE IF NOT EXISTS petitions(
        id serial PRIMARY KEY,
        createdOn timestamp Default Current_timeStamp,
        createdBy Integer references users(id) ON DELETE CASCADE not null,
        office Integer references offices(id) On DELETE CASCADE not null,
        subject text not null ,
        body text not null
      )`);
    console.log('petitions table created');
     seed("petitions",petitions);
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
    await dropPetitionTable();
    await dropVoteTable();
    await dropCandidateTable();
    await dropPartyTable();
    await dropOfficeTable()
    await dropUserTable();
    ;

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
    await createOfficeTable();
    await createPartyTable();
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
