const db = require('../helper/database')


//get a single dog by its id 
exports.getById = async function getById(id) {
  let query = "select * from dogs where id = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

//list all the dogs in the database
exports.getAll = async function getAll(page, limit, order) {
  // TODO: use page, limit, order to give pagination
  //let query = "SELECT * FROM dogs;"
  let query = "SELECT * FROM dogs"
  let data = await db.run_query(query)  
  return data
}

//delete a dog in the database
exports.delById = async function deleteById(id) {
  let query = "DELETE FROM dogs where id = ?"
  let values = [id]
  let data = await db.run_delete(query, values)
  return data
}

//waiting to test
exports.searchDog = async function searchDog(filter, Svalue) {
  let values = [filter]
  let values2 = [Svalue]
  let query = "select * from dogs where ? LIKE ?"
  //  let query = "select * from dogs where ? LIKE '%${data.fullname}%'"
  let data = await db.run_query(query, values, values2)
  return data
}

exports.update = async function update(dog,id) {
/*
  let newvalues = [newdata]
  let valuesID = [id]
  let data = await db.run_update(query, newvalues,valuesID)
*/
//let query = "UPDATE dogs SET ? WHERE id = ?"

  let keys = Object.keys(dog)   // keys = ['title', ' description']
  let values = Object.values(dog) // values = ['xxx', 2222]
  let id1 = [id]
  keys = keys.join(',')
  let parm = ''
  for(i=0; i<values.length; i++) { parm+='?,' }
  parm=parm.slice(0,-1) 
  let query = `UPDATE dogs SET (${keys}) = (${parm}) WHERE id = '${id1}'`
    try {
    await db.run_update(query,values) 
    return {'status': 201}
  } catch(error) {
    return error
  }
}

//create a new dog in the database
exports.add = async function add(dog) {
  /* e.g. 
    dog = {
      title: 'xxx',
      description: 2222
    }
  */
  let keys = Object.keys(dog)   // keys = ['title', ' description']
  let values = Object.values(dog) // values = ['xxx', 2222]
  keys = keys.join(',')
  let parm = ''
  for(i=0; i<values.length; i++) { parm+='?,' }
  parm=parm.slice(0,-1) //唔要最後個,號
  let sql = `insert into dogs (${keys}) values (${parm})`
  try {
    await db.run_insert(sql, values) 
    return {'status': 201}
  } catch(error) {
    return error
  }
}


