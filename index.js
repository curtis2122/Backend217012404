//'use strict'
const Koa = require('koa')
const static = require('koa-static-router')


const cors =  require('@koa/cors')


const app = new Koa()

const options  =  {
  origins: '*'
}

const passport = require('koa-passport')
const basicAuth = require('./strategies/basic')
passport.use(basicAuth)

const specials = require('./routes/special')   
const dogs = require('./routes/dogs')
const users = require('./routes/users')



app.use(cors(['*']))
app.use(specials.routes())
app.use(dogs.routes())
app.use(users.routes())
app.use(static({dir:'docs', router:'/doc/'}))
//app.use(cors())
let port = process.env.PORT || 10888
app.listen(port)

console.log('API is ready')
