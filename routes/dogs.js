const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/dogs');
const { validateDog } = require('../controllers/validation');

const router = Router({ prefix: '/api/v1/dogs' });
const auth = require('../controllers/auth');
const can = require('../permissions/dogs');

async function getAll(ctx, next) {
  const dogs = await model.getAll();
  if (dogs.length) {
    ctx.body = dogs;
  }
}

// create a new dog
async function createDog(ctx) {
  const { body } = ctx.request;
  const result = await model.add(body);
  if (result) {
    ctx.status = 201;
    ctx.body = result;
    ctx.body = { ID: result, created: true };
  } else {
    ctx.status = 201;
    ctx.body = '{}';
  }
}

// get dog info by id
async function getById(ctx) {
  const { id } = ctx.params;
  const dog = await model.getById(id);
  if (dog.length) {
    ctx.body = dog[0];
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Information not found' };
  }
}

// update dog
async function updateDog(ctx) {
  const { body } = ctx.request;
  const { id } = ctx.params;

  const Permission = can.Update(ctx.state.user, data);
  if (Permission.granted) {
    const result = await model.update(body, id);
    if (result) {
      ctx.status = 201;
      ctx.body = result;

      console.log('Success update');
      ctx.res.body = 'Success update ';
      ctx.body = { ID: id, updated: true };
    }
  } else {
    ctx.status = 404;
  }
}

// delete dog by id
async function delById(ctx) {
  const permission = can.Delete(ctx.state.user);
  // delete premission
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const { id } = ctx.params;
    const result = await model.delById(id);
    ctx.status = 201;
    ctx.body = result;
    ctx.body = { ID: id, deleted: true };
  }
}

router.get('/', getAll);
router.post('/', bodyParser(), validateDog, createDog);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(), updateDog);

router.delete('/:id([0-9]{1,})', auth, delById);

module.exports = router;
