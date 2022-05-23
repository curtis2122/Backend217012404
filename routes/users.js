const Router = require('koa-router')
const can = require('../permissions/users')
const model = require('../models/users')
const auth = require('../controllers/auth')
const router = Router({ prefix: '/api/v1/users' })

const bcrypt = require('bcrypt');
const bodyParser = require('koa-bodyparser');
const { validateUser } = require('../controllers/validation');

router.get('/', auth, getAll)

//router.post('/login', auth, login);
router.post('/', bodyParser(), validateUser, createUser);
router.get('/:id([0-9]{1,})', auth, getById);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateUser, updateUser);
router.del('/:id([0-9]{1,})', auth, deleteUser);



async function getAll(ctx) {
  const permission = can.readAll(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403
  } else {
    //3-5
    console.log(ctx.request.query);
    //org
    const result = await model.getAll()
    if (result.length) {
      ctx.body = result
    }
  }
}


async function createUser(ctx) {
  const permission = can.Create(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403
  } else {
    const body = ctx.request.body
    let result = await model.add(body)
    if (result) {
      ctx.status = 201
      ctx.body = result
    } else {
      ctx.status = 201
      ctx.body = "{}"
    }
  }
}

// login function
/*async function login(ctx) {
  // return any details needed by the client
  const { ID, username, email, role } = ctx.state.user
  const links = {
   
  }
  ctx.body = { ID, username, email, role, links };
}*/

// Function to get users account by ID
async function getById(ctx) {
  const id = ctx.params.id;
  const result = await model.getById(id);
  if (result.length) {
    const data = result[0]
   
    const Permission = can.readAll(ctx.state.user, data);

    if (Permission.granted) {
      ctx.body = Permission.filter(data);
      ctx.res.body = "Success read by employee";
      ctx.res.statusCode = 200;
    } else {
      ctx.status = 403;
    }
  }
}
// Function to update users account
async function updateUser(ctx) {

  const id = ctx.params.id;
 
  let result = await model.getById(id);  
  if (result.length) {
    let data = result[0];
    console.log("going to update", data);
    const Permission = can.Update(ctx.state.user, data);

    if (Permission.granted) {
      const newData = Permission.filter(ctx.request.body);

      // overwrite and update fields with body data
      //   Object.assign(newData, {ID: id});
      try {
        result = await model.update(newData, id);
        if (result.affectedRows) {
          ctx.body = { ID: id, updated: true, link: ctx.request.path };
          ctx.res.body = "Success Update by employee";
          ctx.res.statusCode = 200;
          //      res.send{"update success"}
        }
      } catch (error) {
        return error
      }
    } else {
      ctx.status = 403;
      ctx.res.body = "No premission";
    }
  }
}


// Function delete users account 
async function deleteUser(ctx) {
  console.log("ctx is ", ctx);


  const permission = can.Delete(ctx.state.user)

  
  if (!permission.granted) {
    ctx.status = 403
  } else {

    const id = ctx.params.id
    let result = await model.delById(id)
    ctx.status = 201
    ctx.body = result
    ctx.body = { ID: id, deleted: true };
  }
}


module.exports = router