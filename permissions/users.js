/**
 * A module for the permissions for Users.
 * @author Wang Ka Li
 * @module models/users
 */

const AccessControl = require('role-acl')
const ac = new AccessControl()

//---------------------------------------------
// Grant user role permission
ac.grant('user')
  .condition({Fn: 'EQUALS', args: {'requester': '$.owner'}})
  .execute('read')
  .on('user', ['*','!password', '!passwordSalt'])
ac.grant('user')
  .condition({Fn: 'EQUALS', args: {'requester': '$.owner'}})
  .execute('update')
  .on('user', ['firstName', 'lastName', 'about', 'password','email','avatarURL'])

//---------------------------------------------
// Grant employee role permission
ac.grant('employee')
  .condition({Fn: 'EQUALS', args: {'requester': '$.owner'}})
  .execute('read')
  .on('employee', ['*','!password', '!passwordSalt'])
ac.grant('employee')
  .condition({Fn: 'EQUALS', args: {'requester': '$.owner'}})
  .execute('read')
  .on('user', ['*','!password', '!passwordSalt'])

ac.grant('employee')
  .condition({Fn: 'EQUALS', args: {'requester': '$.owner'}})
  .execute('updates')
  .on('employee', ['firstname', 'lastname', 'about', 'password','email','avatarurl'])
/*
ac.grant('employee').execute('read').on('user')
ac.grant('employee').execute('read').on('employee')*/

ac.grant('employee').execute('updates').on('user', ['firstName', 'lastName', 'about', 'password','email','avatarURL'])
ac.grant('employee').execute('delete').on('employee','user')
/*
  ac.grant('employee')
  .condition({Fn: 'EQUALS', args: {'requester': '$.owner'}})
  .execute('delete')
  .on('employee')
*/
//---------------------------------------------
// Grant admin role permission

ac.grant('admin').execute('read').on('user')
ac.grant('admin').execute('read').on('employee')
ac.grant('admin').execute('read').on('users')
ac.grant('admin').execute('read').on('employees')
ac.grant('admin').execute('update').on('users')
ac.grant('admin').execute('update').on('employees')
/*
ac.grant('admin').execute('update').on('users')
ac.grant('admin').execute('update').on('employees')*/
ac.grant('admin')
  //.condition({Fn: 'NOT_EQUALS',  args:{'requester':'$.owner'}})
  .execute('delete').on('users')
ac.grant('admin')
//  .condition({Fn: 'NOT_EQUALS',  args:{'requester':'$.owner'}})
  .execute('delete').on('employees')

//check premission


exports.readAll = (requester) => ac.can(requester.role).execute('read').sync().on('users')

exports.Read = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('read').sync().on('users')

exports.Create = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('create').sync().on('users')

exports.Update = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('update').sync().on('users') 

exports.Delete = (requester, data) =>  ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('delete').sync().on('users')



