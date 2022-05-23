const request = require('supertest')
//const app = require('./common/index')
const app = require('./app.test')


const expected =  {
        "id": 3,
        "title": null,
        "name": "Bulldogs girl",
        "age": 1,
        "sex": "F",
        "breed": "Bulldogs",
        "datecreated": "2022-04-25T13:35:08.363Z",
        "datemodified": "2022-04-25T13:35:08.363Z",
        "imageurl": "https://images.squarespace-cdn.com/content/v1/59aeff50d482e950a6559590/1504738568286-7JA33CN9R6597FQW21YQ/bulldogstandards.jpg",
        "description": null,
        "shelterid": 1,
        "status": null,
        "staffid": 1
    }

describe('Dogs Testing Cases', () => {
  //async function call

  it('Check the status code is correct for get all dog',async()=>{
    const res=await request(app.callback())
    .get('/api/v1/dogs')
        .send({})

    expect(res.statusCode).toEqual(200)
  })

  it('Return id dogs record', async()=> {
    const res = await request(app.callback())
   
      .get('/api/v1/dogs/3')
    
      .send({})
  
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
  
//    expect(res.body).toContainEqual(expected)
})
})


describe('Post new dog Test Case', () => {
  xit('check status code for create a new dog', async () => {
    const res = await request(app.callback())
      .post('/api/v1/dogs')
      .send({
        name: 'dogs122',
        age: '1', 
        sex: 'M',
        breed:'Bulldogs',
        shelterid: '1',
        staffid: '1'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
   // expect(res.body).toContainEqual(expected)
    expect(res.body).toHaveProperty('created',true)
  })
});




describe('try the PUT method of Dogs', () => {
  it('Update a dog info ', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/dogs/34`)
      // .put(`/api/v1/dogs/${dogID}`)
      .send({
        name: 'changeDogName2',
        age: '2',
        sex: 'M'
      })

    expect(res.statusCode).toEqual(201);
  //  expect(res.type).toEqual("application/json")
    expect(res.body).toHaveProperty('updated', true);
  });
});


describe('try the DELETE method of Dogs', () => {
  it('Testing to delete a dog', async () => {
    const res = await request(app.callback())
      .delete(`/api/v1/dogs/35`)
     .auth('candy45', 'test123')
  
    expect(res.statusCode).toEqual(201);
  //  expect(res.type).toEqual("application/json")
    expect(res.body).toHaveProperty('deleted', true);
  });
});