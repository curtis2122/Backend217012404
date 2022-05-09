const Koa = require('koa')
//const cors =  require('@koa/cors')
//const static = require('koa-static-router')

//const Router =  require('koa-router')

const app = new Koa()
//const router = new Router()

//router.get('/api/v1', welcomeAPI)
//app.use(router.routes())

//function welcomeAPI(ctx, next)  {
//  ctx.body =  {
    //message:  "Welcome to the blog API!"
  //}
//}

const specials = require('../../routes/special')   
const dogs = require('../../routes/dogs')
//const articles = require('../../routes/articles')
const users = require('../../routes/users')
app.use(specials.routes())
app.use(dogs.routes())
app.use(users.routes())
//app.use(static({dir:'docs', router:'/doc/'}))
//app.use(cors())
//let port = process.env.PORT || 10888
//app.listen(port)

module.exports = app