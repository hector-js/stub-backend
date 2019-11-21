# @hectorjs/stub-backend

![](https://github.com/HecJimSan/stub-backend/workflows/%40hectorjs%2Fstub%2Dbackend/badge.svg)
 - ![](https://github.com/HecJimSan/stub-backend/workflows/eslint%2Dconfig%2Dgoogle/badge.svg)
 - ![](https://github.com/HecJimSan/stub-backend/workflows/Unit%20tests/badge.svg)
 - ![](https://github.com/HecJimSan/stub-backend/workflows/Coverage/badge.svg)

# Install

```sh
npm install -g @hectorjs/stub-backend
```

## CLI

Verify you have **hjs** command installed for automatic set up.

```sh
hjs --version
```
Now you can try it running the following commands:

a) ```hjs --help``` (it will tell some options)

b) ```hjs new/n [name-mock]```     (it will create a new mock project)

c) ```hjs generate/g get/g [name-path]```  (it will generate a get template)

d) ```hjs generate/g post/p [name-path]```     (it will generate a post template)

e) ```hjs generate/g delete/d [name-path]```     (it will generate a delete template)


It will generate a test with random data ready to use it for your test.

Give it a try. ```npm test```

If you want to run the mock ```hjs start```

# Methods availabe to mock at this moment

- [x] GET
- [x] HEAD
- [x] POST
- [ ] PUT
- [x] DELETE
- [ ] CONNECT
- [x] OPTIONS
- [x] TRACE
- [ ] PATCH

_Note:_ PUT, CONNECT and PATCH methods are **in progress**.

# Usage
## Shortcut
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

3. Each response contains an id_, _headers and _description property:

    *  *_id* identifier 
        (/stories/Nathan/person => id_: Nathan)
    *  *_headers*  
        _format:_ "_headers: string[]" 
        It is looking if the headers exist in the request and responding an error when they are not found.
    *  *_cookies* 
        _format:_ "_cookies: string[]"  
        It is looking if the cookies exist in the request and responding an error when they are not found.
    *  *_description*
        Brief explanation about the response.
    *  *_status*
        Just in case the request contain the cookie and headers, you can set your own status or leave it 200 as default.

_Note:_ If any field is missed, it means it is not required.

Below, we have a example:

```json
{
  "_get": {
    "/stories/{id}/person$": [
      {
        "_id": "Nathan",
        "_headers": [],
        "_description": "Get person details related to  Nathan without authentication",
        "_body": {
          "name": "Nathan"
        }
      },
      {
        "_id": "Lucas",
        "_headers": [],
        "_status": 304,
        "_description": "There won't be any response    because the status is 304",
        "_body": {
          "name": "Nathan"
        }
      },
      {
        "_id": "mark",
        "_headers": ["Authorization"],
        "_cookies": [],
        "_description": "Get person details related to Mark     with authentication",
        "_body": {
          "name": "Mark"
        }
      }
    ],
      "/stories/{id}/budget": [
        {
          "_id": "Nathan",
          "_headers": ["Client_id"],
          "_cookies": [
            "session-id",
            "key-id"
          ],
          "_description": "Get budget details related to  Nathan with authentication",
          "_body": {
            "name": "Nathan"
          }
        }
      ]
  }
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

2. Under *_post* you must the elements:


Below, we have a example:

```json
{
  "_post": {

		"/customers/data": [
			{
				"_headers": [],
				"_status: 0,
				"_requestBody":{}
				"_body":{}
			}
		]

	}
}
```

This section is under development


# Description

The aim of this project is to _mock the backend_  building different responses with authentication, cookies and different status.

Make the life easier for a nice development :smile:

# Respository

https://github.com/HecJimSan/stub-backend

# Notes

* _extend_ library has been upgraded to version 3.2.0 because a vulneravility has detected in that version (CVE-2018-16492)

