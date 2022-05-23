/**
 * A module for the models for Users CRUD.
 * @author Wang Ka Li
 * @module models/users
 */

const db = require('../helper/database')
//3-5
const bcrypt = require('bcrypt');

exports.findByUsername = async function getByUsername(username) {
  const query = "select * from users where username = ?"
  let values = [username]
  const user = await db.run_query(query, values)
  return user
}

exports.getAll = async function getAll() {
  let query = "select * FROM users"
  let data = await db.run_query(query)
  return data
}

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

  let keys = Object.keys(user)   // keys = ['title', ' description']
  let values = Object.values(user) // values = ['xxx', 2222]
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


  /*
    const values = [user, user.ID];
    const data = await db.run_update(query, values);
    return data;
  */
}

/*
exports.add = async function add(user) {
  const data = await db.insert({ ...user })
    .into('user')
    .catch(console.error);
  return data;
};
*/

//test by curtis 25-4
//create a new article in the database
exports.add = async function add(user) {
  /* e.g. 
    article = {
      title: 'xxx',
      description: 2222
    }
  */
  //3-5
  const password = user.password;
  const hash = bcrypt.hashSync(password, 10);
  user.password = hash;

  let keys = Object.keys(user)   // keys = ['title', ' description']
  let values = Object.values(user) // values = ['xxx', 2222]
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

/*
//find and check users employee code 
//do it at frontend
exports.findEmpSepCode = async function findEmpSepCode(empCode) {
  const query = "SELECT name FROM roles WHERE empcode = ?;";
  const data = await db.run_query(query, [empCode]);
  return data;

}*/