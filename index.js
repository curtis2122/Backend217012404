//'use strict'
const Koa = require('koa')
const static = require('koa-static-router')

//koa cors call 法
const cors =  require('@koa/cors')

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
const options  =  {
  origins: '*'
}

const specials = require('./routes/special')   
const dogs = require('./routes/dogs')
const users = require('./routes/users')

//app.use(cors(['*'])) 表示所有可以用
//https call http 必block
app.use(cors(['*']))
app.use(specials.routes())
app.use(dogs.routes())
app.use(users.routes())
app.use(static({dir:'docs', router:'/doc/'}))
//app.use(cors())
let port = process.env.PORT || 10888
app.listen(port)

console.log('API is ready')
