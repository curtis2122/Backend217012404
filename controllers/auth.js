/**
 * A module validate basic authentication on request or response data.
 * @author Wang Ka Li


const passport = require('koa-passport')
const basicAuth = require('../strategies/basic')

passport.use(basicAuth)
module.exports = passport.authenticate(['basic'], {session: false})