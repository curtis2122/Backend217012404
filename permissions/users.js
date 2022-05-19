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
ac.grant('admin').execute('update').on('user')
ac.grant('admin').execute('update').on('employee')
/*
ac.grant('admin').execute('update').on('users')
ac.grant('admin').execute('update').on('employees')*/
ac.grant('admin')
  //.condition({Fn: 'NOT_EQUALS',  args:{'requester':'$.owner'}})
  .execute('delete').on('user')
ac.grant('admin')
//  .condition({Fn: 'NOT_EQUALS',  args:{'requester':'$.owner'}})
  .execute('delete').on('employee')

//check premission

//exports.readAll = (requester) => ac.can(requester.role).execute('read').sync().on('users')

exports.readAll = (requester) => ac.can(requester.role).execute('read').sync().on('users','employees')

exports.userRead = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('read').sync().on('user')

exports.userUpdate = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('update').sync().on('user') 

exports.userDelete = (requester, data) =>  ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('delete').sync().on('user')

exports.empRead = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('read').sync().on('employee')

exports.empUpdate = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('update').sync().on('employee') 

exports.empDelete = (requester, data) =>  ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('delete').sync().on('employee')
//owner:data.ID}).execute('delete').sync().on('employee','users')

/*
exports.AdRead = (requester, data) => 
  ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('read').sync().on('admin').console.log(requester).console.log(data)

exports.AdUpdate = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('update').sync().on('admin') 

exports.AdDelete = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('delete').sync().on('admin')*/