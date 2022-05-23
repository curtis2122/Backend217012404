/*20-5am
const BasicStrategy = require('passport-http').BasicStrategy
const users = require('../models/users')
//3-5
const bcrypt = require('bcrypt');
/*
const verifyPassword = function(user, password) {
    // compare user.password with the password supplied
  return user.password === password
}
*/
/*20-5am
const verifyPassword = function (user, password) {
  // compare user.password with the password the user supplied
  const isMatch = bcrypt.compareSync(password, user.password);
  return isMatch;
}*/




/*har
const checkUserAndPass =  (username, password, done) => {
   // look up the user and check the password if the user exists
  // call done() with either an error or the user, depending on outcome

  console.log('try checking', username, password)
  let result
  try {
    // result = await users.findByUsername(username)
    console.log(result, 'check by username')
    
    if(result.length) {
      const user = result[0]
      if(verifyPassword(user, password)) {
        console.log(`Successfully authentiated user ${username}`)
        console.log(user)
        return done(null, user)
      } else  {
        console.log(`Password inccorrect for user ${username} and ${password}`,user)
        throw new Error(`Password inccorrect for user ${username} and ${password}`)
      }
    } else {
      console.log(`No user found with username ${username}`)
        throw new Error(`No user found with username ${username}`)
    }
  } catch(error) {
    console.error(`Error during authentication for user ${username}`)
    return done(error)
  } // username or password were incorrect
}*/
/*20-5
const strategy = new BasicStrategy(checkUserAndPass)
module.exports = strategy*/


const BasicStrategy = require('passport-http').BasicStrategy
const users = require('../models/users')
//3-5
const bcrypt = require('bcrypt');
/*
const verifyPassword = function(user, password) {
    // compare user.password with the password supplied
  return user.password === password
}
*/

const verifyPassword = function (user, password) {
  // compare user.password with the password the user supplied
  const isMatch = bcrypt.compareSync(password, user.password);
  return isMatch;
}

/*disable 22-5
const checkUserAndPass = async (username, password, done) => {
   // look up the user and check the password if the user exists
  // call done() with either an error or the user, depending on outcome

  let result
  console.log('hello')
  try {
    result = await users.findByUsername(username)
    
    if(result.length) {
      const user = result[0]
      if(verifyPassword(user, password)) {
        console.log(`Successfully authentiated user ${username}`)
        console.log(user)
        return done(null, user)
      } else  {
        console.log(`Password inccorrect for user ${username} and ${password}`,user)
        throw new Error(`Password inccorrect for user ${username} and ${password}`)
      }
    } else {
      console.log(`No user found with username ${username}`)
        throw new Error(`No user found with username ${username}`)
    }
  } catch(error) {
    console.error(`Error during authentication for user ${username}`)
    return done(error)
  } // username or password were incorrect
}*/


//22-5

const checkUserAndPass =  async (username, password, done) => {
   // look up the user and check the password if the user exists
  // call done() with either an error or the user, depending on outcome
  let result
  try {
    result = await users.findByUsername(username)
  } catch(error) {
    console.error(`Error during authentication for user ${username}`)
    return done(error)
  }
  if(result.length) {
    const user = result[0]
    if(verifyPassword(user, password)) {
      console.log(`Successfully authentiated user ${username}`)
      console.log(user)
      return done(null, user)
    } else  {
      console.log(`Password inccorrect for user ${username} and ${password}`,user)
    }
  } else {
    console.log(`No user found with username ${username}`)
  }
  return done(null, false) // username or password were incorrect
}


const strategy = new BasicStrategy(checkUserAndPass)
module.exports = strategy