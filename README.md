STUB BACKEND (WIP)
============
* **Description** The aim of this project is to _mock the backend_  building different responses with authentication and different status.

* Based on json server module (https://www.npmjs.com/package/json-server) which behind is using express framework. 

HOW TO USE IT
=============

* First of all, follow the json-server page in order to understand how it is working. You will need to set it running the following command.

    ```npm install json-server --save-dev```

* My recomendation is to use this project in the root and include it in your repository as well because you will be able to manage versions in it.

* There are three files in the resources:
    - _environment.js_  you can add the data related to the environment like tokens, headers, endpoints, etc.
    - _utils.js_ place all the functions used by the stub server.
    - _db.json_ this file is explained in json server page very well. Just in order to add authorization in the reponses, we need for each response two fields more: 

        a) auth 
            true, it is required a token 
            false, it is not needed a token
            ```Have a look to the template provided```
        b) description (this is optional)
            add a brief description of the request

* Once you have completed last 2 steps, you just need to add your responses and run it using the following command:
            ```node stub-backend/server.js```

* Be aware of the file _server.js_, it is manage the request. Take care changing this file.

PENDING
=======
POC --> More things are coming!! :)
