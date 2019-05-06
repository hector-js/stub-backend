# @hectorjs/stub-backend

# Install

```sh
   npm i @hectorjs/stub-backend
```

# Usage

A shortcut:

```sh
    touch app.js
    mkdir data
    cd data
    touch data.js
```

## Add library to your runner file

Create a javascript file and add the library @hectorjs/stub-backend

```js
   const hectorjs = require('@hectorjs/stub-backend')
```

Note: add the previous line in app.js file

## Folder data

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

_Note:_ If any field is missed, it means it is not required.

Below, we have a example:

```json
    {
        "stories/(.*?)/person": [
            {
                "id_": "Nathan",
                "headers_":[],
                "description_": "Get person details related to Nathan without authentication",
                "body_":{
                    "name": "Nathan"
                }
            },
            {
                "id_": "mark",
                "headers_":["Authorization"],
                "cookies_": [],
                "description_": "Get person details related to Mark without authentication",
                "body_":{
                    "name": "Mark"
                }
            }
        ],
        "stories/(.*?)/budget": [
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
    curl http:localhost:3005/stories/nathan/person
```

The response will be like this:

```json
    {
        "id_": "Nathan",
        "headers_":["Client_id"],
         "cookies_": [
            "session-id",
            "key-id"
        ],
        "description_": "Get person details related to Nathan without authentication",
        "body_":{
            "name": "Nathan"
        }
    },
```



# Description

The aim of this project is to _mock the backend_  building different responses with authentication and different status.

# Respository

https://github.com/HecJimSan/stub-backend

# Notes

* _extend_ library has been upgraded to version 3.2.0 because vulneravility detected (CVE-2018-16492)

