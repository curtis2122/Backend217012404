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