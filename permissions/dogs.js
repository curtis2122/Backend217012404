const AccessControl = require('role-acl')
const ac = new AccessControl()

//---------------------------------------------
// Grant user role permission

//---------------------------------------------
// Grant employee role permission
ac.grant('employee')
  .execute('read')
  .on('dogs')
ac.grant('employee')
  .execute('update')
  .on('dogs')
ac.grant('employee')
  .execute('delete')
  .on('dogs')


  //---------------------------------------------
// Grant admin role permission
ac.grant('admin')
  .execute('read')
  .on('dogs')
ac.grant('admin')
  .execute('update')
  .on('dogs')
ac.grant('admin')
  .execute('delete')
  .on('dogs')

//check premission

exports.empRead = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('read').sync().on('dogs').console.log(requester)

exports.empUpdate = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('update').sync().on('dogs').console.log(requester) 

exports.empDelete = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('delete').sync().on('dogs').console.log(requester)


exports.AdRead = (requester, data) => 
  ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('read').sync().on('dogs').console.log(requester).console.log(data)

exports.AdUpdate = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('update').sync().on('dogs') 

exports.AdDelete = (requester, data) => ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('delete').sync().on('dogs')