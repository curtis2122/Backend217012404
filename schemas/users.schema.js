module.exports =
{
  "$schema": "http://json-schema.org/draft-04/schema#",

  "id": "/user",
  "title": "User",
  "description": "Registered a user of the website",
  "type": "object",
  "properties": {
    "firstname": {
      "description": "First name",
      "type": "string"
    },
    "lastname": {
      "description": "Last name",
      "type": "string"
    },
    "username": {
      "description": "Unique username",
      "type": "string"
    },
    "about": {
      "description": "Description of the user",
      "type": "string"
    },
    "password": {
      "description": "Password for registration",
      "type": "string"
    },
    "email": {
      "description": "Unique email address",
      "type": "string",
      "format": "email"
    },
    "avatarurl": {
      "description": "URL of avatar image",
      "type": "string",
      "format": "uri"
    },
    "role": {
      "description": "Role allocated for the users",
      "type": "string"
    },
    "shelterid": {
      "description": "Staff User ID",
      "type": "integer",
      "minimum": 0
    }

  },
  "required": [
    "username",
    "email",
    "password"
    /*,
    "firstName",
    "lastName"*/
  ],
  "additionalProperties": false
},

{
  "id": "/userUpdate",
  "title": "User Update",
  "description": " user can update users info (excluded username).",
  "type": "object",
  "properties": {
    "firstname": {
      "description": "First name",
      "type": "string"
    },
    "lastname": {
      "description": "Last name",
      "type": "string"
    },
    "about": {
      "description": "Description of the user",
      "type": "string"
    },
    "email": {
      "description": "Unique email address",
      "type": "string",
      "format": "email"
    },
    "avatarurl": {
      "description": "URL of avatar image",
      "type": "string",
      "format": "uri"
    },
    "password": {
      "description": "Password for registration",
      "type": "string",
      "minLength": 6
    },
    "shelterid": {
      "description": "Staff User ID",
      "type": "integer",
      "minimum": 0
    }
    /*  "role": {
        "description": "Role allocated for the users",
          "type": "string"
      }*/
  },
  "additionalProperties": false
},

{
  "id": "/userDelete",
  "title": "User Delete",
  "description": " delete users by ID.",
  "type": "object",
  "properties": {
    "ID": {
      "description": "ID of the user",
      "type": "integer"
    } 
  },
  "additionalProperties": false
}
