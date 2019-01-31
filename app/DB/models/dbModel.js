import client from '../connect';

  export const dropUsersTable = async function(){
    try{
      await client.query(`DROP TABLE IF EXISTS users CASCADE`)
      console.log('User table deleted')
    }catch(err){
      console.log(err)
    }
    ;
  };
  export const createUsersTable = async function(){
    try{
      await client.query(`
        CREATE TABLE IF NOT EXISTS users(
          userId UUID PRIMARY KEY,
          firstName VARCHAR(20),
          lastName VARCHAR(20),
          userName VARCHAR(30) UNIQUE not null,
          email VARCHAR(40) UNIQUE not null,
          bio VARCHAR(250),
          stack VARCHAR(250),
          quote TEXT,
          profileImage VARCHAR(255),
          profileImageId VARCHAR(255),
          password VARCHAR(255) UNIQUE not null,
          password2 VARCHAR(255) UNIQUE not null,
          userCreated timestamp not null,
          userUpdated timestamp,
          isAdmin BOOLEAN
        )`
      )
      console.log('User table created')
    }catch(err){
      console.log(err)
    }
  }
  export const dropQuestionsTable= async function(){
    try{
      await client.query(`DROP TABLE IF EXISTS questions CASCADE`)
      console.log('Question table deleted')
    }catch(err){
      console.log(err)
    }

  }
  export const createQuestionsTable = async function(){
    try{
      await client.query(
        `CREATE TABLE IF NOT EXISTS questions(
          questionId UUID PRIMARY KEY,
          authorId UUID References users(userId) ON DELETE CASCADE,
          authorName VARCHAR(50),
          subject VARCHAR(400) not null,
          subjectVector tsvector,
          question text not null,
          questionVector tsvector,
          category VARCHAR(100) not null,
          tags text[],
          Questioncreated timestamp not null
        )`
      )
      console.log('Question table created')
    }catch(err){
      console.log(err)
    }
  }
  export const dropAnswersTable = async function(){
    try{
      await client.query(`DROP TABLE IF EXISTS answers CASCADE`)
      console.log('Answers table deleted')
    }catch(err){
      console.log(err)
    }
    ;
  }
  export const createAnswersTable = async function(){
    try{
      await client.query(`
        CREATE TABLE IF NOT EXISTS answers(
          answerId serial PRIMARY KEY,
          questionId UUID references questions(questionId) ON DELETE CASCADE,
          authorId UUID References users(userId) ON DELETE CASCADE,
          answerAuthor  VARCHAR(100),
          answer text not null,
          upvotes integer,
          downvotes integer,
          isPreferred BOOLEAN,
          answerCreated timestamp not null,
          answerUpdated timestamp
        )`
      )
      console.log('Answers table created')
    }catch(err){
      console.log(err)
    }

  };
 export const dropCommentsTable = async function(){
    try{
      await client.query(`DROP TABLE IF EXISTS comments`)
      console.log('Comments table deleted')
    }catch(err){
      console.log(err)
    }

  }
   export const createCommentsTable = async function(){
    try{
      await client.query(`
        CREATE TABLE IF NOT EXISTS comments(
          commentId serial PRIMARY KEY,
          answerId integer references answers(answerId) ON DELETE CASCADE,
          authorId UUID References users(userId) ON DELETE CASCADE,
          commentAuthor VARCHAR(100),
          description text not null,
          desVector tsvector,
          commentCreated timestamp not null,
          commentUpdated timestamp
        )`
      )
      console.log('Comments table created')
    }catch(err){
      console.log(err)
    }
    ;
  }
   export const dropAllTables = async function(){
    try{
      await dropCommentsTable()
      await dropAnswersTable()
      await dropQuestionsTable()
      await dropUsersTable()
      console.log('All Tables deleted')
    }catch(err){
      console.log(err)
    }

  }
   export const createAllTables =  async function(){
    try{
      await createUsersTable()
      await createQuestionsTable()
      await createAnswersTable()
      await createCommentsTable()
    console.log('All Tables created')
    }catch(err){
      console.log(err)
    }

  }
 require('make-runnable')