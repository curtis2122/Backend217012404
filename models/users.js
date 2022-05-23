/**
 * A module for the models for Users CRUD.
 * @author Wang Ka Li
 * @module models/users
 */

const bcrypt = require('bcrypt');
const db = require('../helper/database');

exports.findByUsername = async function getByUsername(username) {
  const query = 'select * from users where username = ?';
  const values = [username];
  const user = await db.run_query(query, values);
  return user;
};
// get all user info
exports.getAll = async function getAll() {
  const query = 'select * FROM users';
  const data = await db.run_query(query);
  return data;
};
// get user info by user ID
exports.getById = async function getById(id) {
  const query = 'select * from users where id = ?';
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
};

// delete a user by ID
exports.delById = async function delById(id) {
  const query = 'DELETE FROM users WHERE ID = ?;';
  const values = [id];
  const data = await db.run_delete(query, values);
  return data;
};

// update an existing user information
exports.update = async function update(user, id) {
  // const query = "UPDATE users SET ? WHERE ID = ?;";
  if (user.password) {
    const { password } = user;
    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;
  }

  let keys = Object.keys(user);
  const values = Object.values(user);
  const id1 = [id];
  keys = keys.join(',');
  let parm = '';
  for (i = 0; i < values.length; i++) { parm += '?,'; }
  parm = parm.slice(0, -1);
  const query = `UPDATE users SET (${keys}) = (${parm}) WHERE id = '${id1}'`;
  try {
    await db.run_update(query, values);
    return { status: 201 };
  } catch (error) {
    return error;
  }
};

// create a new users in the database
exports.add = async function add(user) {
  const { password } = user;
  const hash = bcrypt.hashSync(password, 10);
  user.password = hash;

  let keys = Object.keys(user);
  const values = Object.values(user);
  keys = keys.join(',');
  let parm = '';
  for (i = 0; i < values.length; i++) { parm += '?,'; }
  parm = parm.slice(0, -1);
  const sql = `insert into users (${keys}) values (${parm})`;
  try {
    await db.run_insert(sql, values);
    return { status: 201 };
  } catch (error) {
    return error;
  }
};
