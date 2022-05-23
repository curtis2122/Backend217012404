const Koa = require('koa')
const app = new Koa()

const specials = require('../../routes/special')   
const dogs = require('../../routes/dogs')
const users = require('../../routes/users')


app.use(specials.routes())
app.use(dogs.routes())
app.use(users.routes())



module.exports = app