const request = require('supertest')
//const app = require('./common/index')
const app = require('./app.test')


let token;

getauth((setauth) => {
  const req = request(app.callback())
    .post('/api/v1/users/login')
    .auth('candy45', 'test1234')
    .end((err, req) => {
      token = req.body.token; 
      console.log('the auth token is ', token);
      setauth();
    });
});

const expected = {
       "id": 3,
        "title": null,
        "name": "dogs1",
        "age": 1,
        "sex": "F",
        "breed": "Retrievers",
        "datecreated": "2022-04-25T13:35:08.363Z",
        "datemodified": "2022-04-25T13:35:08.363Z",
        "imageurl": null,
        "description": null,
        "shelterid": 1,
        "status": null,
        "published": null,
        "staffid": 1
}

describe('Dogs Testing Cases', () => {
  //async function call
  //case 1
  xit('Check the status code is correct',async()=>{
    const res=await request(app.callback())
    .get('/api/v1/dogs')
        .send({})

    expect(res.statusCode).toEqual(200)
  })
  //case2
  //xit 即係暫時skip, 例如未寫完
  //xit('Return all dogs record', async(),=> {
  it('Return id dogs record', async()=> {
    const res = await request(app.callback())
      //用post / put 都要改
      .get('/api/v1/dogs/3')
      //header / body 係呢到send 
      .send({})
    //tobe都得一定要=, 有d 就咁試status code
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    //toContainEqual 即係都會包以上database既data 
    expect(res.body).toContainEqual(expected)
})
})


describe('Post new dog Test Case', () => {
  it('should be create a new dog', async () => {
    const res = await request(app.callback())
      .post('/api/v1/dogs')
      .send({
        name: 'dogs12',
        age: '12', 
        sex: 'M',
        shelterid: '1',
        staffid: '1'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
    expect(res.body).toHaveProperty('created',true)
  })
});




describe('try the PUT method of Dogs', () => {
  it('Update a dog info ', async () => {
    const req = await request(app.callback())
      .put(`/api/v1/dogs/${dogID}`)
      .send({
        name: 'changeDogName',
        sex: 'M',
      })
      .set('Authorization', token);
    expect(req.statusCode).toEqual(201);
    expect(req.body).toHaveProperty('updated', true);
  });
});


describe('try the DELETE method of Dogs', () => {
  it('Testing to delete a dog', async () => {
    const req = await request(app.callback())
      .delete(`/api/v1/dogs/${dogID}`)
      .set('Authorization', token);
    expect(req.statusCode).toEqual(200);
    expect(req.body).toHaveProperty('deleted', true);
  });
});