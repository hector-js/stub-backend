# @hectorjs/stub-backend

## Pipelines
### Main
![](https://github.com/HecJimSan/stub-backend/workflows/%40hectorjs%2Fstub%2Dbackend/badge.svg)
### Separate checks
 - ![](https://github.com/HecJimSan/stub-backend/workflows/eslint%2Dconfig%2Dgoogle/badge.svg)
 - ![](https://github.com/HecJimSan/stub-backend/workflows/Unit%20tests/badge.svg)
 - ![](https://github.com/HecJimSan/stub-backend/workflows/Coverage/badge.svg)

# Install

```sh
npm install @hectorjs/stub-backend
```

# Methods availabe to mock at this moment

- [x] GET
- [x] POST
- [ ] OPTIONS
- [ ] PUT
- [ ] DELETE
- [ ] PATCH

_Note:_ OPTIONS, PUT, DELETE and PATCH methods are **in progress**.

# Usage
## Shortcut

You can execute the following shell script and initialize a project given a name and a root path.

Below, the link shows you the shell script to execute:

https://github.com/HecJimSan/stub-backend/blob/development/initializer.sh

Also, I am building a cli command which is going to be in a different library. This cli command will help you to create a project. At this moment is under construction, but you can give it a try following the next steps:

### Install the library globally

When you install the library globally, the *hjs* command will be set and you can start using it. 

```sh
npm -g install @hectorjs/stub-backend
```

### Install the library locally

#### Execute npm init with your data:
```
npm init -y
```
#### Install the library 
```
npm install @hectorjs/stub-backend
```
#### Copy the bin field bellow in the package.json file at the same level of the version:

```json
  "version" :"example",
  "bin":{
    "hjs":"node_modules/@hectorjs/stub-backend/bin/hjs"
  }
```
#### Link the command
```sh
npm link
```
Now you can try it running the following commands:

a) ```hjs --version``` (it will tell you the version)

b) ```hjs new/n [name-mock]```     (it will create a new mock project)

c) ```hjs generate/g get/g [name-path-regez]```     (it will generate a template for the regex)

(Be aware that this section is under construction..)

## Manual use
## Add library to your runner file

Create a javascript file and add the library @hectorjs/stub-backend

```js
const hectorjs = require('@hectorjs/stub-backend')
```

Note: add the previous line in app.js file

## Folder data
### GET Method

Create a folder named _resources_ and create under that folder a couple of jsons files (it does not matter the name of the files) with the properties.

```json
{}
```
The json must follow the next format:

1. A regex to validate the path. 

2. An array of possible responses based on the identifier.

3. Each response contains an id_, headers_ and description_ property:

    *  *id_* identifier 
        (/stories/Nathan/person => id_: Nathan)
    *  *headers_*  
        _format:_ "headers_: string[]" 
        It is looking if the headers exist in the request and responding an error when they are not found.
    *  *cookies_* 
        _format:_ "cookies_: string[]"  
        It is looking if the cookies exist in the request and responding an error when they are not found.
    *  *description_*
        Brief explanation about the response.
    *  *status_*
        Just in case the request contain the cookie and headers, you can set your own status or leave it 200 as default.

_Note:_ If any field is missed, it means it is not required.

Below, we have a example:

```json
{
    "^/stories/(.*?)/person$": [
        {
            "id_": "Nathan",
            "headers_":[],
            "description_": "Get person details related to Nathan without authentication",
            "body_":{
                "name": "Nathan"
            }
        },
        {
            "id_": "Lucas",
            "headers_":[],
            "status_" : 304,
            "description_": "There won't be any response because the status is 304",
            "body_":{
                "name": "Nathan"
            }
        },
        {
            "id_": "mark",
            "headers_":["Authorization"],
            "cookies_": [],
            "description_": "Get person details related to Mark with authentication",
            "body_":{
                "name": "Mark"
            }
        }
    ],
    "^/stories/(.*?)/budget$": [
        {
            "id_": "Nathan",
            "headers_":["Client_id"],
            "cookies_": [
                "session-id",
                "key-id"
            ],
            "description_": "Get budget details related to Nathan with authentication",
            "body_":{
                "name": "Nathan"
            }
        }
    ]
}
```

If you want to test it, copy the previous example and paste it in one of the json files. Then execute the following command:

```sh
node app.js
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

### POST Method

You need to procedure with the same folder structure for a GET method
```
 resources
    ¦
     - *.json
     - *.json
     - ...
```
```json
{}
```
The json must follow the next format:

1. First property level must be *_post*. 

2. Under *_post* you must add an array of the following element:
```json
{
    "data": {},
    "response":{}
}
```
    Where _data_ is the body for the request and _response_ the body of the response

Below, we have a example:

```json
{
  "post_": [
    {
      "data": {
        "name": "Nathan"
      },
      "response":{
        "custom": "response"
      }
    },
    {
      "data": {
        "name": "Mark"
      },
      "response":{
        "custom": "responseTwo"
      }
    }
  ]
}
```

If you want to test it, copy the previous example and paste it in one of the json files. Then execute the following command:

```sh
node app.js
```

The service will be running in the port *3005* waiting for a request.

Make a request:

```sh
curl -d '{"name": "Mark"}' -X POST  -H "Content-Type: application/json"  http://localhost:3005/story/nathan
```

The response will be like this:

```json
{
    "custom": "response"
}
```


# Description

The aim of this project is to _mock the backend_  building different responses with authentication, cookies and different status.

Make the life easier for a nice development :smile:

# Respository

https://github.com/HecJimSan/stub-backend

# Notes

* _extend_ library has been upgraded to version 3.2.0 because a vulneravility has detected in that version (CVE-2018-16492)

