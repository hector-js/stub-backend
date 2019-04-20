STUB BACKEND (WIP)
============
* **Description** The aim of this project is to _mock the backend_  building different responses with authentication and different status.

HOW TO USE IT
=============

UNDER CONSTRUCTION.....

* My advise is to use this project in the root and include it in your repository as well because you will be able to manage versions in it.

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
TBC, I plan to change the structure of the project and make it more reusable for different scenarios....
