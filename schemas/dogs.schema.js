module.exports =
{
  "$schema":"http://json-schema.org/draft-04/schema#",
  "id":"/dog",
  "title":"Dog",
  "description": "Dog in Website",
  "type": "object",
  "properties": {
    "title":{
      "description":"Main Title",
      "type": "string"
    },
    "name":{
      "description":"Body",
      "type": "string"
    },
    "age":{
      "description":"Age of the dog?",
      "type": "integer"
    },
    "sex": {
      "description": "What is sex of the dog?",
      "type": "string"
    },
    "breed": {
      "description": "What is the breed of the dog?",
      "type": "string"
    },
    "imageURL":{
      "description":"Image URL",
      "type": "uri"
    },
    "description":{
      "description":"(Option) Description",
      "type": "string"
    },
    "shelterid":{
      "description":"Staff User ID",
      "type": "integer",
      "minimum":0
    },    
    "status":{
      "description":"Pickup already?",
      "type": "boolean"
    },
    "staffid":{
      "description":"Staff User ID",
      "type": "integer",
      "minimum":0
    }
  },
  "required":["name", "age", "sex","breed", "shelterid", "staffid"]
//跟大細楷
}