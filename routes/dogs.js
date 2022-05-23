const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/dogs')
const { validateDog } = require('../controllers/validation')

const router = Router({ prefix: '/api/v1/dogs' })
const auth = require('../controllers/auth')
const can = require('../permissions/dogs')

//const passport = require('koa-passport')

//未update 個dog update ,create 做auth
/*
function getAll(ctx, next) {
  //ctx.body=dogs
}*/

async function getAll(ctx, next) {
  let dogs = await model.getAll()
  if (dogs.length) {
    ctx.body = dogs
  }
}
/*
async function getById(ctx) {
  let id = ctx.params.id
  let dog = await model.getById(id)
  if (dog.length) {
    ctx.body = dog[0]
  }
}*/

async function createDog(ctx) {
  const body = ctx.request.body
  let result = await model.add(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
    ctx.body = { ID: result, created: true}
  } else {
    ctx.status = 201
    ctx.body = "{}"
  }
}

async function getById(ctx) {
  let id = ctx.params.id
  let dog = await model.getById(id)
  if (dog.length) {
    ctx.body = dog[0]
  }

  //if((id<dogs.length+1) &&  (id>0)) {
  //ctx.body = dogs[id-1]
  //}  else {
  //ctx.status=404
  //ctx.body = {error: 'Information not found'}
  //}
}

async function updateDog(ctx, next) {
  const body = ctx.request.body
  let id = ctx.params.id

  /* const AdPermission = can.AdUpdate(ctx.state.user, data);
      if (AdPermission.granted){*/
  let result = await model.update(body, id)
  if (result) {
    ctx.status = 201
    ctx.body = result

    console.log("Success update");
    ctx.res.body = "Success update ";
    ctx.body = { ID: id, updated: true };
  } else {
    //    ctx.status=201
    //ctx.body = "{}"
    ctx.status = 404

/*
    ctx.status = 403
    ctx.body = "no premission to update"*/
  }
}
// TODO edit an existing dog

async function delById(ctx) {
  const permission = can.readAll(ctx.state.user)
  //delete premission error
  if (!permission.granted) {
    ctx.status = 403
  } else {

    const id = ctx.params.id
    let result = await model.delById(id)
    ctx.status = 201
    ctx.body = result
     ctx.body = { ID: id, deleted: true };
  }
    // if (result.length) {
    //   const data = result[0];
    //   console.log("trying to delete", data);
      //const empPermission = can.empDelete(ctx.state.user, data);
      // const AdPermission = can.AdDelete(ctx.state.user, data);

      //  const Permission = can.Delete(ctx.state.user, data);
      // console.log("trying to delete", data);

      //    if (empPermission.granted) {
      // if (Permission.granted) {

      //   const result = await model.delById(id);

      //   console.log("emp deleted", Permission);
      //   //ctx.body = { ID: id, deleted: true }

      //   ctx.res.body = "Success deleted by employee";

      //   ctx.res.statusCode = 201;

      //   ctx.status = 201
      //   ctx.body = result
      // }
      /* else if (AdPermission.granted) {
         const result = await model.delById(id);
         ctx.res.body = "Success deleted by admin";
         ctx.res.statusCode = 200;
         ctx.status = 201
         ctx.body = result
       }*/
      /*
          else {
            ctx.status = 403;
          }*/
      // ctx.body ="{}"
    // }
  //}

  /*
const id = ctx.params.id
  let result = await model.delById(id)
  if (result) {
    

      const result = await model.delById(id);

      ctx.status = 201
      ctx.body = result
    }

    else {
      ctx.status = 403;
    }
  */

}


//if((id<dogs.length+1) &&  (id>0)) {
//ctx.body = dogs[id-1]
//}  else {
//ctx.status=404
//ctx.body = {error: 'Information not found'}
//}
//}


router.get('/', getAll)
router.post('/', bodyParser(), validateDog, createDog)
router.get('/:id([0-9]{1,})', getById)
//router.put('/:id([0-9]{1,})', bodyParser(), validateDog, updateDog)
//router.del('/:id([0-9]{1,})', deleteDog)
router.put('/:id([0-9]{1,})', bodyParser(), updateDog)
//router.delete('/:id([0-9]{1,})', passport.authenticate('basic', {session: false}), delById)
router.delete('/:id([0-9]{1,})', auth, delById)


module.exports = router