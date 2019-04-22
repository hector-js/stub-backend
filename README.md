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

Create a folder named _data_ and create under that folder a json file named data.json

```json
    {}
```
The json must follow the next format:

1. A regex to validate the path. 

2. An array of possible responses based on the identifier.

3. Each response contains an id_, auth_ and description_ property:

    *  *id_* identifier 
        (/stories/Nathan/person => id_: Nathan)
    *  *auth_* authentication. 
        It is looking if Authorization header exits
    *  *description_*
        Brief explanation about the response

Below, we have a example:

```json
    {
        "stories/(.*?)/person": [
            {
                "id_": "Nathan",
                "auth_": false,
                "description_": "Get person details related to Nathan without authentication",
                "name": "Nathan"
            },
            {
                "id_": "mark",
                "auth_": false,
                "description_": "Get person details related to Mark without authentication",
                "name": "Mark"
            }
        ],
        "stories/(.*?)/budget": [
            {
                "id_": "Nathan",
                "auth_": true,
                "description_": "Get budget details related to Nathan with authentication",
                "name": "Nathan"
            }
        ]
    }
```

If you want to test it, copy the previous example and paste it in data.js. Then execute the following command:

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
        "auth_": false,
        "description_": "Get person details related to Nathan without authentication",
        "name": "Nathan"
    },
```



# Description

The aim of this project is to _mock the backend_  building different responses with authentication and different status.

# Respository

https://github.com/HecJimSan/stub-backend

