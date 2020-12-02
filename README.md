# @hectorjs/stub-backend

![](https://github.com/hector-js/stub-backend/workflows/%40hectorjs%2Fstub%2Dbackend/badge.svg)
 - ![](https://github.com/hector-js/stub-backend/workflows/eslint%2Dconfig%2Dgoogle/badge.svg) ![](https://github.com/hector-js/stub-backend/workflows/Unit%20tests/badge.svg) ![](https://github.com/hector-js/stub-backend/workflows/Coverage/badge.svg) [![codecov](https://codecov.io/gh/hector-js/stub-backend/branch/development/graph/badge.svg)](https://codecov.io/gh/hector-js/stub-backend)
 - ![](https://img.shields.io/npm/v/@hectorjs/stub-backend?label=version&logo=npm) ![](https://img.shields.io/npm/dt/@hectorjs/stub-backend?logo=npm&logoColor=blue) ![](https://img.shields.io/snyk/vulnerabilities/npm/@hectorjs/stub-backend?logo=snyk) ![](https://img.shields.io/github/last-commit/hector-js/stub-backend?logo=github)

 [Releases documentation](https://github.com/hector-js/stub-backend/releases)

# Description

The aim of this project is to mock the backend services based on a *JSON* configuration. You don't need to do anything programmatically.

This library gives you the chance to focus in your code **reducing** the amount of work mocking the dependencies. :smile:

# hjs-cli

There is a command line to generate default scenarios using GET, POST or PUT methods, among others ones.

I suggest you to have a look and give it a try. It will reduce the time to mock the services, which is one of the main goals of this library.

Have a look [@hectorjs/stub-cli](https://www.npmjs.com/package/@hectorjs/stub-cli).

# Installation 
```
npm i @hectorjs/stub-backend --save-dev
```
## Set hjs command 
:warning: _(this step is not necessary if you have the cli globally installed)_

Include _hjs_ command in your _package.json_ as a script:

```json
"scripts":{
  "hjs":"hjs"
}
```

_Note:_ You can check it executing ```npm run hjs -- --version``` in your terminal.

# Structure
## Packages
Create a folder named _\_hjs_ in the package root directory. Under that folder, create a _resources_ folder and add a couple of json files, which you can name as you wish. You can create subfolders under resources as well.

```
 package.json
 _hjs
 |
  -resources
   |
    - *.json
    - *.json
    - subfolder
      |
       - *.json
       - *.json
```
## Files structure 
Each file must contain a json object. The first key indicates the method of the request and it must have a "_" as a prefix. For example:

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

The next level indicates the endpoint to call. The path is written as the following examples:

  - /customers/names
  - /customers/{id}/name
  - /countries/{id}/product
  - /countries/{id}/population?town={param1}&postcode={param2}

    ```json
    {
      "_[method]":{
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
_NOTE_: id, param1 or param2 can be named as you want. However, they must be unique.

## Scenarios

This level indicates possible scenarios based on different parameters.

Index:
 - [_req](#_req)
 - [_res](#_res)


Each scenario contains two sections **_req** (request) and **_res** (response) where we place the properties in relation to the request and response.

:warning: Both levels are **mandatory** in each scenario. Even if you don't want to add anything in the request, you must add an empty __req_.

## _req

Basically, the scenario which is going to be selected to provide the response is the one which has more matches in the _req section with the real request.

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

You can have the following properties for matching the request:
 - [_[id]](#_[id])
 - [_headers](#_headers)
 - [_cookies](#_cookies)
 - [_body](#_body)
 - [_bodyPaths](#_bodyPaths)
 - [_excludeBodyFields](#_excludeBodyFields)

### _[id]

Identifiers of a path. For example, given a path ```/customers/{id1}/data/{id2}```, it should be structured as follows:

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
      "_id1": "Fran",
      "_id2": "2"
    }
  }
]
```

It will choose the first scenario when _id1_ is Chris and _id2_ is 1 and the second one when _id1_ is Fran and _id2_ is 2.

_cli_ ```hjs generate get customers/{id1}/data/{id2}```

_NOTE:_ If you include ```*``` as a value, it will work as a wildcard.

For example, given the example above when the request is ```/customers/chris/data/*```, it will choose the first scenario.

### _headers

There are two different ways to match by headers:

#### Match by key

It is an array of header keys. Basically, it will match if the request contains all the headers in the array.

```json
"/customers/{id}/data" : [
  {
    "_req":{
      "_headers": ["authorization", "client_Id"]
    }
  }
]
```
_cli_ ```hjs generate get customers/{id}/data --headers authorization,client_Id```

#### Match by key or match by value

Header can match key or values for specific fields also where required.

```json
"/customers/{id}/data" : [
  {
    "_req":{
      "_headers": ["authorization", {"client_Id": "expected_value"}]
    }
  }
]
```

#### Match by key and value

It is an array of objects. The key is the header name and the value is the header value. You can see it in the next example:


```json
"/customers/{id}/data" : [
  {
    "_req":{
      "_headers": {
        "authorization":"1234",
        "client_Id":"121"
        }
    }
  }
]
```

_cli_ ```hjs generate get customers/{id}/data --headers authorization,client_Id```

Set the key value headers manually.

_NOTE:_ If the scenario does not contain any headers section, the service won't check anything. Capital letters are not allow in headers section.

#### Content-type

By default all the requests are based on json.

If you include in your header the following options:

1. multipart/form-data 
  
  The values keyName=ValueName will be matching in the body section like:

  ```
  {
    _body:{
      [keyName]:[ValueName]
    }  
  }
  ```

2. application/x-www-form-urlencoded
  
  The values keyName=ValueName will be matching in the body section like:

  ```
  {
    _body:{
      [keyName]:[ValueName]
    }  
  }
  ```

### _cookies

There are two different ways to match the cookies:

#### Match by key

It is an array of cookies keys. Basically, it will match if the request contains all the cookies in the array.

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

#### Match by key-value

It is an array of objects. The key is the header name and the value is the header value. You can see in the next example:

```json
"/customers/{id}/data" : [
  {
    "_req": {
      "_cookies": {
        "Universal":"123", 
        "sec":"1232"
        }
    }
  }
]
```

_NOTE:_ If the scenario does not contain any cookies section, the service won't check anything.


_cli_ ```hjs generate get customers/{id}/data --cookies authorization,client_Id```

Set the key value cookies manually.

_NOTE:_ If the scenario does not contain any cookies section, the service won't check anything.

### _body

You might want to match the body for some methods like post, put or delete. **_body** object is the request body  for a specific scenario. It will check the entire object.

```json
"/customers/{id}/data" : [
  {
    "_req": {
      "_body": {
        "dummyRequestBody1": "anyValue"   
      }
    }
    "_description": "secure scenario given an authorization header"
  }
]
```

_Note:_ If any field is missed, the scenario will not be matched.

### _bodyPaths

Instead of matching the entire body of a request, you can verify verify just a specific fields or objects using __bodyPaths_.

_bodyPaths_ is a key value object where the _key_ is the jsonPath and the _value_ is the object to match.

Example:

```json
"/customers/{id}/data" : [
  {
    "_req": {
      "_bodyPaths": {
        "$.heroes": { "name": "superman"}, 
        "$.cities[0].name": "madrid"
      }
    },
    "_res":{
    },
    "_description":"secure scenario given an authorization header"
  }
]
```

_bodyPaths can be an array also as an option to validate a field or value.

```json
"/customers/{id}/data" : [
  {
    "_req": {
      "_bodyPaths": [
        "$.heroes": { "name": "superman"}, 
        "$.cities[0].name"
      ]
    },
    "_res":{
    },
    "_description":"secure scenario given an authorization header"
  }
]
```


_NOTE:_ bodyPaths and body section can not be at the same time.

### _excludeBodyFields

Whenever you need to exclude the comparation of some fields (timestamps for example) or objects from the __body_ or _bodyPaths_,  You can do it adding an array of json paths  (you can exlude multiple fields or objects).

```json
"_excludeBodyFields": [ "$.value1.value2[0]", "$.value3"]
```

_Note:_ If you have any doubt about how to do the path, you can have a look to [jsonPath libray](https://www.npmjs.com/package/jsonpath) which is used in the project.

_Note:_ The library will not exclude any field or object if __excludeBodyFields_ is not added.

## _res

This section create a response when a scenario is matched.

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

You can have the following properties in the response:

 - [_status](#_status)
 - [_headers](#_headers)
 - [_cookies](#_cookies)
 - [_delay](#_delay)
 - [_body](#_body)

### _status

You can set your own status.

```json
"/customers/{id1}/data/{id2}" : [
  {
    "_res":{
      "_status": 400
    }
  },
  {
    "_res":{
      "_status": 404
    }
  }
]
```

_cli_: ```hjs generate get customers/{id}/data/{id2} --status 404```

_NOTE:_ if _status doesn't exist, it will return 200.

### _headers

You have the option to set headers in the response just by key or key-value.

#### by key
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

#### by key-value
```json
"/customers/{id1}/data/{id2}" : [
  {
    "_res":{
      "_headers": {
        "key-header-1": "custom-value-1",
        "key-header-2": "custom-value-2"
      }
    }
  }
]
```

### _cookies

You have the option to set cookies in the response just by key or key-value.

#### by key
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

#### by key-value
```json
"/customers/{id1}/data/{id2}" : [
  {
    "_res":{
      "_cookies": {
        "key-cookie-1": "custom-value-1",
        "key-cookie-2": "custom-value-2"
      }
    }
  }
]
```

### _delay

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

### _body

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

## _description

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

- [Xml](#Xml)
- [Avoid delays](#Avoid&nbsp;Delays)
- [Banner](#Banner)
- [Retry opts](#Retry&nbsp;opts)
- [Same request different response](#Same&nbsp;request&nbsp;different&nbsp;response)
- [Config file](#Config&nbsp;file)

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

## Avoid Delays
You have the option to avoid all the delays. By default, it will execute the mocks with delays, but you can add ```--no_delay``` arg and the application won't add delays.

Example: ```hjs start --no_delay```

## Banner
You can use your own banner instead of hectorjs one. You just need to add a file called ```.hjs.banner.js``` in the roor of your project. Have a look to the following example:

```js
module.exports = function(){
    console.log('\x1b[32m%s\x1b[0m', 'My custom message');
}
```

_NOTE:_ you can add a config file using the following command:
For an existing project:
  * ```hjs config --banner``` have upper version  0.24.0 hectorjs/stub-cli.
For a new mock service:
  * ```hjs new --banner``` create project with a custom banner.

## Retry opts

A possible scenario including retry options could be:

```json
{
  "_get": {
    "/customers/{id}": [{
        "_req": {
          "_id": "2"
        },
        "_retry": 2,
        "_res": {
          "_body": {
            "any": "dummy response"
          }
        },
        "_resRetry": [{
            "_body": {
              "any": "body for first try"
            },
            "_headers": [ "header for first try"]
          },
          {
            "_body": {
              "any": "body for second try"
            },
            "_headers": [ "header for second try"]
          }]
      }]
    }
}
```
Where ```_retry``` fields means the number of retries for that specific request and ```_resRetry``` will be an array of different responses scenarios.

For the example, the first request will optain a response:

```json
{
  "_body": {
    "any": "dummy response"
  }
}
```
2 request:
```json
{
  "_body": {
    "any": "body for first try"
  },
  "_headers": [ "header for first try"]
}
```

3 request: 
```json
{
  "_body": {
    "any": "body for second try"
  },
  "_headers": [ "header for second try"]
}
```

If you make again a request it will start from the beginning as you have achieved the number of retries.

## Same request different response

There are scenarios where the user wants to provide different responses for the same request. The library provide the following feature to be able to do it.

It needs to add a custom id in the root of the scenario like the example below:

```json
{
  "_get": {
    "/customers":[
      {
        "_id": "ID_1",
        "_req":{},
        "_res":{
          "_body": {
            "size":100
          }
        }
      },
      {
        "_id": "ID_2",
        "_req":{},
        "_res":{
          "_body": {
            "size":200
          }
        }
      }
    ]
}
```
Basically, it requires to tell to the library which id to use before making the request.

The library expose three endpoints to deal with the id.

- POST "/__scenario" body: ```{ id: 'CUSTOM_ID' }```
  This request sets the id in the library. For the example above, if we want to response the first scenario, we should make the next request before the mock is executed:

  ```curl
  curl -X POST \
  http://localhost:3005/__scenario \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	  "id":"ID_1"
  }'
  ```

- GET "/__scenario" response: ```{ id: 'CUSTOM_ID' }```
  If we want to know which id is set in the library in that moment, we need to make a a get request. Using the example above:

  ```curl
  curl -X GET \
  http://localhost:3005/__scenario \
  ```

- POST "/__scenario/reset 
  Reset the identifier in the library

  ```curl
  curl -X POST \
  http://localhost:3005/__scenario/reset \
  ```


## Config file

You can add your config file in the root of the mock service or in the root of the project. The name of the file must be _.hjs.config.json_

At this moment, the developer can use the following options:

### Cors Options

You can add _corsOptions_ as the [cors library](https://www.npmjs.com/package/cors#configuring-cors) is doing. For example:

```json
{
  "corsOptions":{
    "origin": "http://your-url.com",
    "optionsSuccessStatus": 200
  }
}
```

### Logs

You can include the level of logs fot the mock using [morgan options](https://www.npmjs.com/package/morgan). For example: 

```json
{
  "logs": ":method :url :status :res[content-length] - :response-time ms"
}
```

### Port

Expecify the port. It is 3005 by default.

```json
{
  "port": 8081
}
```

# Compatibility

 It requires 1.0.0 or newer versions of @hectorjs/cli.

# Respository

https://github.com/hector-js/stub-backend


Please, I am up for feedback and new issues for the respository.

Thank you