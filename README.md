# @hectorjs/stub-backend

## Quality measures

![](https://github.com/HecJimSan/stub-backend/workflows/%40hectorjs%2Fstub%2Dbackend/badge.svg)
 - ![](https://github.com/HecJimSan/stub-backend/workflows/eslint%2Dconfig%2Dgoogle/badge.svg)
 - ![](https://github.com/HecJimSan/stub-backend/workflows/Unit%20tests/badge.svg)
 - ![](https://github.com/HecJimSan/stub-backend/workflows/Coverage/badge.svg)
 - [![codecov](https://codecov.io/gh/HecJimSan/stub-backend/branch/development/graph/badge.svg)](https://codecov.io/gh/HecJimSan/stub-backend)

 Others measures

 - ![](https://img.shields.io/npm/v/@hectorjs/stub-backend?label=version&logo=npm)
 - ![](https://img.shields.io/npm/dt/@hectorjs/stub-backend?logo=npm&logoColor=blue)
 - ![](https://img.shields.io/snyk/vulnerabilities/npm/@hectorjs/stub-backend?logo=snyk)
 - ![](https://img.shields.io/github/last-commit/HecJimSan/stub-backend?logo=github)

# Description

The aim of this project is to mock the backend services building different responses for a given authentication, cookie, request among others.

This project gives the chance to focus in your code **reducing** the amount of work mocking the dependencies. :smile:

# Install

```sh
npm install @hectorjs/stub-backend
```

# CLI

There is a command line to generate default methods like get, post, put, among others.
I strongly recommend you to have a look and use it. It will reduce the time to mock the services which is one of the main goal of this project.

Have a look [@hectorjs/stub-cli](https://www.npmjs.com/package/@hectorjs/stub-cli).

## Methods availabe to mock at this moment

- [x] GET
- [x] HEAD
- [x] POST
- [x] PUT
- [x] DELETE
- [x] OPTIONS
- [x] TRACE
- [x] PATCH


# Usage
## Shortcut
### Install the library locally

#### Execute npm init with your data:
```
npm init -y
```
#### Install the library 
```
npm install @hectorjs/stub-backend
```

#### Use hjs command

Include in your _package.json_ the _hjs_ command as script:

```json
"scripts":{
  "hjs":"hjs"
}
```

_Note:_ You can check it running ```npm run hjs -- --version``` or ```hjs --version``` if you have previously installed it globally [@hectorjs/stub-cli](https://www.npmjs.com/package/@hectorjs/stub-cli).

**hjs** command can avoid the following steps because the _cli_ generates all the folders, methods and endpoints for you. Just the data as identifiers, headers, cookies or bodies must be added manually.

# Structure

## Folder data

Create a folder named _resources_ in the package root directory and add a couple of json files under that folder (it does not matter the name of those files) with the properties. You can create subfolders under resources as well.

```
 resources
    ¦
     - *.json
     - *.json
     - subfolder
       ¦
        - *.json
        - *.json
```
Each json file must follow the following format:

## Method level 
The first key means the method and it must have a "_" as a prefix. For example:

```json
{
  "_get":{        
  },
  "_post":{       
  }    
}
```
_Methods:_ _get, _head, _post, _put, _delete, _options, _trace, _patch.

## Path level

The next level means the endpoint. The path is written like theses examples:

  - /customers/names
  - /customers/{id}/name
  - /countries/{id}/product
  - /countries/{id}/population?town={param1}&postcode={param2}

     ```json
    {
      "_get":{
         "/customers/names":[
           {}
         ],
         "/customers/{id}/name":[
           {}
         ],
         "/countries/{id}/product":[
           {}
         ],
         "/countries/{id}/population?town={param1}&postcode={param2}":[
           {}
         ]
      }
    }
    ```
_NOTE_: id, param1 or param2 can be named as you want.

## Array of scenarios

Index:
 - [_req](#_req)
 - [_res](#_res)


An array of possible scenarios based on different identifiers.

Each scenario has two mandatory sections **_req** (request) and **_res** (response) where we place the properties related to the request and response.

Both level are **mandatory** in each scenario. Even if you dont want to add anything in the request, you must add an empty __req_.

### _req

This section deals with the request and it checks if the request is matching with the scenario.

```json
"/customers/{id1}/data/{id2}" : [
  {
    "_req":{
    }
  },
  {
    "_req":{
    }
  }
]
```

You can have the following properties:
 - [_[id]](#_[id])
 - [_headers](#_headers)
 - [_cookies](#_cookies)
 - [_body](#_body)
 - [_bodyPaths](#_bodyPaths)
 - [_excludeBodyFields](#_excludeBodyFields)

#### _[id]

Identifiers of a path. For example, given a path ```/customers/{id}/data```, the scenario with an id should be structured like this:
```json
"/customers/{id1}/data/{id2}" : [
  {
    "_req":{
      "_id1": "chris",
      "_id2": "1"
    }
  },
  {
    "_req":{
      "_id1": "fran",
      "_id2": "2"
    }
  }
]
```
#### _headers

There are two different ways to validate the headers:

##### Validate by key

It is an array of header keys. Basically, it will validate if the request contains the header in the array. If the request does not contain the header, the service will return a 401 response.

```json
"/customers/{id}/data" : [
  {
    "_req":{
      "_headers": ["authorization", "client_Id"]
    }
  }
]
```

Using _cli_ command:
```hjs generate get customers/{id}/data --headers authorization,client_Id```

##### Validate by key and value

It is an array of objects. The key is the header name and the value is the header value. You can see in the next example:


```json
"/customers/{id}/data" : [
  {
    "_req":{
      "_headers": [{"authorization":"1234"},{ "client_Id":"121"}]
    }
  }
]
```

Using _cli_ command:
```hjs generate get customers/{id}/data --headers authorization,client_Id```

Set the key value headers manually.

_NOTE:_ If the scenario does not contain any headers section, the service won't check anything.
Capital letters are not allow in headers section.

#### _cookies

There are two different ways to validate the cookies:

##### Validate by key

It is an array of cookies keys. Basically, it will validate if the request contains the cookie in the array. If the request does not contain the cookie,the service will return a 401 response.

```json
"/customers/{id}/data" : [
  {
    "_req":{
      "_cookies": ["Universal", "sec"]
    }
  }
]
```

_cli_: ```hjs generate get customers/{id}/data --cookies Universal,sec```

##### Validate by key and value

It is an array of objects. The key is the header name and the value is the header value. You can see in the next example:

```json
"/customers/{id}/data" : [
  {
    "_req": {
      "_cookies": [{"Universal":"123"}, {"sec":"1232"}]
    }
  }
]
```

_NOTE:_ If the scenario does not contain any cookies section, the service won't check anything.

#### _body

Some methods like post, put or delete needs to verify the body response as well. **requestBody** is the request for a specific scenario.

```json
"/customers/{id}/data" : [
  {
    "_req": {
      "_body": {
        "dummyRequestBody1": "anyValue"   
      }
    },
    "_res":{
      "_body": {
        "dummyRequestBody2": "anyValue"   
      }
    },
    "_description":"secure scenario given an authorization header"
  }
]
```

_Note:_ If any field is missed, it means it is not required.

#### _bodyPaths

Instead of verifying the entire body of the request, you can choose to verify just a specific fields or objects using __bodyPaths_.

_bodyPaths is an array of key values objects where the _key_ is the jsonPath and the _value_ is the object to check.

Example:

```json
"/customers/{id}/data" : [
  {
    "_req": {
      "_bodyPaths" :[
        { "$.heroes": { "name": "superman"}}, 
        { "$.cities[0].name": "madrid" }
      ]
    },
    "_res":{
    },
    "_description":"secure scenario given an authorization header"
  }
]
```

_NOTE:_ bodyPaths and body section can not be at the same time.

#### _excludeBodyFields

Whenever you need to exclude the comparation of some fields or objects from the __body_. You can do it adding an array of json paths  (you can exlude multiple fields or objects)

```json
"_excludeBodyFields": [ "$.value1.value2[0]", "$.value3"]
```
_Note:_ If you have any doubt about how to do the path, you can have a look to [jsonPath libray](https://www.npmjs.com/package/jsonpath) which is used in the project.

_Note:_ The library will not exclude any field or object if __excludeBodyFields_ is not added.

### _res

This section create a response when an scenario is matched.

```json
"/customers/{id1}/data/{id2}" : [
  {
    "_res":{
    }
  },
  {
    "_res":{
    }
  }
]
```

You can have the following properties:

 - [_status](#_status)
 - [_headers](#_headers)
 - [_cookies](#_cookies)
 - [_delay](#_delay)
 - [_body](#_body)

#### _status

Just in case the request contain the cookie and headers, you can set your own status or leave it 200 as default.

```json
"/customers/{id1}/data/{id2}" : [
  {
    "_res":{
      "_status":"400"
    }
  },
  {
    "_res":{
      "_status":"404"
    }
  }
]
```

_cli_: ```hjs generate get customers/{id}/data/{id2} --status 404```

#### _headers

You have the option to set headers in the response just by key or key-value.

##### by key
```json
"/customers/{id1}/data/{id2}" : [
  {
    "_res":{
      "_headers": ["key-header-1", "key-header-2"]
    }
  }
]
```

_NOTE:_ the value of each key will be generated with default values.

##### by key-value
```json
"/customers/{id1}/data/{id2}" : [
  {
    "_res":{
      "_headers": [
        {"key-header-1": "custom-value-1"},
        {"key-header-2": "custom-value-2"}
      ]
    }
  }
]
```


#### _cookies

You have the option to set cookies in the response just by key or key-value.

##### by key
```json
"/customers/{id1}/data/{id2}" : [
  {
    "_res":{
      "_cookies": ["key-cookie-1", "key-cookie-2"]
    }
  }
]
```

_NOTE:_ the value of each key will be generated with default values.

##### by key-value
```json
"/customers/{id1}/data/{id2}" : [
  {
    "_res":{
      "_cookies": [
        {"key-cookie-1": "custom-value-1"},
        {"key-cookie-2": "custom-value-2"}
      ]
    }
  }
]
```

#### _delay

It is adding a delay in milliseconds to the response.

```json
"/customers/{id1}/data/{id2}" : [
  {
    "_res":{
      "_delay": 10000
    }
  }
]
```

_cli_: ```hjs generate get customers/{id}/data --delay 1000```

#### _body

This section contains the response for a given request.

```json
"/customers/{id1}/data/{id2}" : [
  {
    "_res":{
      "_body": {
        "dummyResponse1": "anyValue"
      }
    }
  },
  {
    "_res":{
      "_body": {
        "dummyResponse2": "anyValue"
      }
    }
  }
]
```

### _description

Brief explanation about the scenario.

```json
"/customers/{id}/data" : [
  {
    "_req": {
      
    },
    "_res":{

    },
    "_description":"secure scenario given an authorization header"
  }
]
```

_cli_: ```hjs generate get customers/{id}/data --description "Hello world"```

# Example

Below, we have a example:

```json
{
  "_get": {
    "/stories/{id}/person$": [
      {
        "_req":{
          "_id": "Nathan",
          "_headers": []
        },
        "_res":{
          "_body": {
            "name": "Nathan"
          }
        },
        "_description": "Get person details related to  Nathan without authentication"
      },
      {
        "_req":{
          "_id": "Lucas",
          "_headers": []
        },
        "_res":{
          "_status": 304,
          "_body": {
            "name": "Nathan"
          }
        },
        "_description": "There won't be any response    because the status is 304"
      },
      {
        "_req":{
          "_id": "mark",
          "_headers": ["authorization"],
          "_cookies": []
        },
        "_res":{
          "_body": {
            "name": "Mark"
          }
        },
        "_description": "Get person details related to Mark     with authentication"
      }
    ]
  },
  "_post" :{
      "/stories/{id}/budget": [
        {
          "_req":{
            "_id": "Nathan",
            "_headers": ["Client_id"],
            "_cookies": [
              "session-id",
              "key-id"
            ],
            "_body": {
              "anyData": "anyData"
            },
          },
          "_res":{
            "_body": {
              "name": "Nathan"
            }
          },
          "_description": "Get budget details related to  Nathan with authentication"
        }
      ]
  }
}
```

If you want to test it, copy the previous example and paste it in one of the json files. Then execute the following command:

```sh
node .\\node_modules\\@hectorjs\\stub-backend\\lib\\app.js
```
or with _cli_

```sh
hjs start
```

The service will be running in the port *3005* waiting for a request.

Make a request:

```sh
curl http://localhost:3005/stories/nathan/person
```

The response will be like this:

```json
{
    "name": "Nathan"
}
```

# Advance options

## Xml

This section is in progress. At this moment, the user can response a xml setting the **_xml** flag to true like the following scenario:

```json
{
 "_post" :{
    "/stories/{id}/budget": [
      {
        "_req":{
          "_id": "Nathan",
          "_body": "<xml><book><title>The lyon king</title></book></xml>",
        },
        "_res":{
          "_xml": true,
          "_body": "<xml><book><title>Flash</title></book></xml>"
        }
      }
    ]
  }
}
```

## Config file

You can add your config file in the root of the mock service or in the root of the project. The name of the file must be _.hjs.config.json_

At this moment, the developer can use the following options:

### corsOptions

You can add _corsOptions_ as the [cors library](https://www.npmjs.com/package/cors#configuring-cors) is doing. For example:

```json
{
  "corsOptions":{
    "origin": "http://your-url.com",
    "optionsSuccessStatus": 200
  }
}
```

### logs

You can include the level of logs fot the mock using [morgan options](https://www.npmjs.com/package/morgan). For example: 

```json
{
  "logs": ":method :url :status :res[content-length] - :response-time ms"
}
```

#### port

Expecify the port. It is 3005 by default.

```json
{
  "port": 8081
}
```

# Respository

https://github.com/HecJimSan/stub-backend


Please, I am up for feedback and new issues for the respository.

Thank you