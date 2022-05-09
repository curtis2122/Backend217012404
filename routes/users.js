const Router = require('koa-router')
const can = require('../permissions/users')
const model = require('../models/users')
const auth = require('../controllers/auth')
const router = Router({prefix:'/api/v1/users'})
//3-5
const bcrypt = require('bcrypt');
const bodyParser = require('koa-bodyparser');
const {validateUser, validateUserUpdate} = require('../controllers/validation');
//org
router.get('/', auth, getAll)
//3-5
router.post('/login', auth, login);
router.post('/', bodyParser(), validateUser, createUser);
router.get('/:id([0-9]{1,})', auth, getById);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateUser, updateUser);
router.del('/:id([0-9]{1,})', auth, deleteUser);
router.get('/:id([0-9]{1,})/signUpCode', getUserRole )

async function getAll(ctx)  {
  const permission  =  can.readAll(ctx.state.user)
  if(!permission.granted) {
    ctx.status  = 403
  } else {
//3-5
    console.log(ctx.request.query);
//org
    const result =  await model.getAll()
    if(result.length) {
      ctx.body = result
    }
  } 
}


async function createUser(ctx) {
  const body = ctx.request.body
  let result = await model.add(body)
  if(result) {
    ctx.status = 201
    ctx.body = result
  }else {
    ctx.status=201
    ctx.body = "{}"
  }
}

// login function
async function login(ctx) {
  // return any details needed by the client
  const {ID, username, email, role} = ctx.state.user
  const links = {
 //   self: `${ctx.protocol}s://${ctx.host}${prefix}/${ID}`
  }
  ctx.body = {ID, username, email, role, links};
}

// Function to get users account by ID
async function getById(ctx) {
  const id = ctx.params.id;
  const result = await model.getById(id);
  if(result.length){
    const data = result[0]
    const userPermission = can.userRead(ctx.state.user, data);
    const empPermission = can.empRead(ctx.state.user, data);
    
    
    if (empPermission.granted){
      ctx.body = empPermission.filter(data);
    } else if (userPermission.granted){
      ctx.body = userPermission.filter(data);
    } else {
      ctx.status = 403;
    }
  }
}
// Function to update users account
async function updateUser(ctx) {
  const id = ctx.params.id;
  //const id1 = ctx.params.id;
  let result = await model.getById(id);  // check if id is exists
  if (result.length) {
    let data = result[0];
    console.log("goint to update", data);
    const empPermission = can.empUpdate(ctx.state.user, data);
    const userPermission = can.userUpdate(ctx.state.user, data);
    
    if (empPermission.granted){
      const newData = empPermission.filter(ctx.request.body);
      
      // overwrite and update fields with body data
   //   Object.assign(newData, {ID: id});
      result = await model.update(newData, id);
      if (result.affectedRows) {
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
      }
    } else if (userPermission.granted){
      // exclude fields that should not be updated
      const newData = userPermission.filter(ctx.request.body);
      
      // overwrite updatable fields with body data
   //   Object.assign(newData, {ID: id});
      result = await model.update(newData, id);
      if (result.affectedRows) {
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
        
      }
    } else {
      ctx.status = 403;
    }
  }
}

// Function delete users account 
async function deleteUser(ctx) {
  const id = ctx.params.id;
  let result = await model.getById(id);
  if (result.length){
    const data = result[0];
    console.log("goint to delete", data);
    
    const empPermission = can.empDelete(ctx.state.user, data);
    const userPermission = can.userDelete(ctx.state.user, data);
    
    if (empPermission.granted){
      const result = await model.delById(id);
      if (result) {
        ctx.body = {ID: id, deleted: true}
      }
    } else if (userPermission.granted){
      const result = await model.delById(id);
      if (result) {
        ctx.body = {ID: id, deleted: true}
      }
    } else {
      ctx.status = 403;
    }    
  }
}

// Function to find users role
async function getUserRole (ctx){
  const id = ctx.params.id;
  let result = await model.findEmpCode(id);
  if (result.length){
    ctx.body = result;    
  }
}

module.exports = router