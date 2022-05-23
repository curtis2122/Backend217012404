/**
 * A module for the models for Users CRUD.
 * @author Wang Ka Li
 * @module models/users
 */

const db = require('../helper/database')

const bcrypt = require('bcrypt');

exports.findByUsername = async function getByUsername(username) {
  const query = "select * from users where username = ?"
  let values = [username]
  const user = await db.run_query(query, values)
  return user
}
//get all user info 
exports.getAll = async function getAll() {
  let query = "select * FROM users"
  let data = await db.run_query(query)
  return data
}
//get user info by user ID
exports.getById = async function getById(id) {
  let query = "select * from users where id = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

//delete a user by ID
exports.delById = async function delById(id) {
  const query = "DELETE FROM users WHERE ID = ?;";
  const values = [id];
  const data = await db.run_delete(query, values);
  return data;
}

//update an existing user information
exports.update = async function update(user, id) {
  //const query = "UPDATE users SET ? WHERE ID = ?;";
  if (user.password) {
    const password = user.password;
    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;
  }

  let keys = Object.keys(user)   
  let values = Object.values(user) 
  let id1 = [id]
  keys = keys.join(',')
  let parm = ''
  for (i = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1)
  let query = `UPDATE users SET (${keys}) = (${parm}) WHERE id = '${id1}'`
  try {
    await db.run_update(query, values)
    return { 'status': 201 }
  } catch (error) {
    return error
  }


  
}



//create a new users in the database
exports.add = async function add(user) {
 
  const password = user.password;
  const hash = bcrypt.hashSync(password, 10);
  user.password = hash;

  let keys = Object.keys(user)   
  let values = Object.values(user) 
  keys = keys.join(',')
  let parm = ''
  for (i = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1)
  let sql = `insert into users (${keys}) values (${parm})`
  try {
    await db.run_insert(sql, values)
    return { 'status': 201 }
  } catch (error) {
    return error
  }
}

