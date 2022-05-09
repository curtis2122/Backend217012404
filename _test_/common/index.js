const Koa = require('koa')
const app = new Koa()

const specials = require('../../routes/special')   
const dogs = require('../../routes/dogs')
const users = require('../../routes/users')


app.use(specials.routes())
app.use(dogs.routes())
app.use(users.routes())


//let port = process.env.PORT || 10888
//app.listen(port)

//console.log('API is ready')
//只係模擬出黎所以delete左d code
module.exports = app