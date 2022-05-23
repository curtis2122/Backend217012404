const request = require('supertest')
//const app = require('./common/index')
const app = require('./app.test')

    

describe('Testing Private Site', () => {
 
  it('Check the status code for private site is correct',async()=>{
    const res=await request(app.callback())
    .get('/api/v1/private')
        .send({})
 .auth('candy45', 'test123')
    expect(res.statusCode).toEqual(200)
  })
 
})


describe('Testing Public Site', () => {
  it('Check the status code for public site is correct', async () => {
    const res = await request(app.callback())
  .get('/api/v1')
        .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")

  })
});

