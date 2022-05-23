module.exports =
{
  "$schema":"http://json-schema.org/draft-04/schema#",
  "id":"/dog",
  "title":"Dog",
  "description": "Register Dog in Website",
  "type": "object",
  "properties": {
    /*"title":{
      "description":"Title",
      "type": "string"
    },*/
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
      "description":"Shelter User ID",
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
  "required":["name", "age", "sex","breed", "shelterid", "staffid"],
  "additionalProperties": false

},
{
   "id":"/dogUpdate",
  "title":"Dog Update",
  "description": "Update Dog in Website",
  "type": "object",
  "properties": {
   
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
      "description":"shelter ID",
      "type": "integer",
      "minimum":0
    },    
   
    "staffid":{
      "description":"Staff User ID",
      "type": "integer",
      "minimum":0
    }
  },
  "required":["name", "age", "sex","breed", "shelterid", "staffid"],
  "additionalProperties": false

},

{
  "id": "/dogDelete",
  "title": "Dog Delete",
  "description": " delete dogs by ID.",
  "type": "object",
  "properties": {
    "ID": {
      "description": "ID of the dog",
      "type": "integer"
    } 
  },
  "additionalProperties": false
}