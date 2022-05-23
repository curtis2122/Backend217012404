const request = require('supertest')
//const app = require('./common/index')
const app = require('./app.test')




const expected =  {
        "id": 1,
        "firstname": "amy",
        "lastname": "lau",
        "username": "amy",
        "about": null,
        "dateregistered": "2022-04-25T13:37:01.091Z",
        "password": "$2b$10$TX8g.pEz6zmDTZRuIPhhheehWIPJcFqkMGZfq8a3wY4Z7Nc1UZMl.",
        "passwordhints": "aa12345",
        "email": "amy@charity.com",
        "avatarurl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Fiona_Fung.JPG/640px-Fiona_Fung.JPG\r\n",
        "code": null,
        "role": "admin",
        "link": null,
        "shelterid": 1
    }
    

describe('Users Testing Cases', () => {
  //async function call
  //case 1
  it('Check the status code is correct',async()=>{
    const res=await request(app.callback())
    .get('/api/v1/users')
        .send({})
 .auth('candy45', 'test123')
    expect(res.statusCode).toEqual(200)
  })
  
 
  it('Return id users record', async()=> {
    const res = await request(app.callback())
      
      .get('/api/v1/users/1')
    
      .send({})
     .auth('candy45', 'test123')
   
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
  
//    expect(res.body).toContainEqual(expected)
})
})


describe('Post new users Test Case', () => {
  xit('should be create a new users', async () => {
    const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
        username: 'testcase',
        password: 'test',
        email: 'testamy@charity.com',
        role: 'admin',
        shelterid: '1'
      })
     .auth('candy45', 'test123')
    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
   // expect(res.body).toContainEqual(expected)
    expect(res.body).toHaveProperty('created',true)
  })
});




describe('try the PUT method of Users', () => {
  xit('Update a user info ', async () => {
    const req = await request(app.callback())
      .put(`/api/v1/users/53`)
      // .put(`/api/v1/users/${dogID}`)
      .send({
        firstname: 'JasonAdmintest',
        shelterid: '2'
      })
     .auth('candy45', 'test123')

    expect(req.statusCode).toEqual(201);
  //  expect(res.type).toEqual("application/json")
    expect(req.body).toHaveProperty('updated', true);
  });
});


describe('try the DELETE method of Users', () => {
  it('Testing to delete a user', async () => {
    const req = await request(app.callback())
      .delete(`/api/v1/users/56`)
    .auth('candy45', 'test123')
    expect(req.statusCode).toEqual(201);
  //  expect(res.type).toEqual("application/json")
    expect(req.body).toHaveProperty('deleted', true);
  });
});