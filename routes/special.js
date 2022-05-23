const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('../controllers/auth');

const router = Router({ prefix: '/api/v1' });

function publicAPI(ctx) {
  ctx.body = {
    message: 'PUBLIC PAGE: You requested a new message URI (root) of the API',
  };
}

function privateAPI(ctx) {
  const { user } = ctx.state;
  ctx.body = { message: `hello ${user.username}you registered on ${user.dateRegistered}` };
}

router.get('/', publicAPI);
router.get('/private', auth, privateAPI);

module.exports = router;
