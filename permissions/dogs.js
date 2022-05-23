/**
 * A module for the permissions for Dogs.
 * @author Wang Ka Li
 * @module models/dogs
 */

const AccessControl = require('role-acl');

const ac = new AccessControl();

//---------------------------------------------
// Grant user role permission

ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { requester: '$.owner' } })
  .execute('read')
  .on('dogs', ['*']);
/* ac.grant('user')
  .condition({Fn: 'EQUALS', args: {'requester': '$.owner'}})
  .execute('update')
  .on('dogs', ['firstName', 'lastName', 'about', 'password','email','avatarURL']) */

//---------------------------------------------
// Grant employee role permission
ac.grant('employee')
  .execute('read')
  .on('dogs');
ac.grant('employee')
  .execute('update')
  .on('dogs');
ac.grant('employee')
  .execute('delete')
  .on('dogs');

//---------------------------------------------
// Grant admin role permission
ac.grant('admin')
  .execute('read')
  .on('dog');
ac.grant('admin')
  .execute('read')
  .on('dogs');
ac.grant('admin')
  .execute('update')
  .on('dogs');

ac.grant('admin')
  .execute('delete')
  .on('dog');
ac.grant('admin')
  .execute('delete')
  .on('dogs');

// check premission
exports.readAll = (requester) => ac.can(requester.role).execute('read').sync().on('dogs');

exports.Read = (requester, data) => ac.can(requester.role).context({ requester: requester.ID, owner: data.ID }).execute('read').sync()
  .on('dogs').console.log(requester);

exports.Create = (requester, data) => ac.can(requester.role).context({ requester: requester.ID, owner: data.ID }).execute('create').sync()
  .on('dogs').console.log(requester);

exports.Update = (requester, data) => ac.can(requester.role).context({ requester: requester.ID, owner: data.ID }).execute('update').sync()
  .on('dogs').console.log(requester);

exports.Delete = (requester, data) => ac.can(requester.role).context({ requester: requester.ID, owner: data.ID }).execute('delete').sync()
  .on('dogs').console.log(requester);
