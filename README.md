# modul-api-crud-node-postgre

Guideline to use API Product
1. Copy this bearer Token to Authentication 'c73b6aab9952796bf8ea14f6e3b886dfa0f0599c57f31afc4c6d5a1dd9043030428d279fe4fb7591aa062e20f834a671cf57a032c554fe96c256534fbc12af35' without ''
2. To use the authentication 
- Authorization 
- Type: Bearer Token
3. Working with API 
- Insert New Product 
>methods = [POST] 
>url= http://127.0.0.1:3000/products_insert
```
go to Body 
form-data
```

``key:value``
``name : productName ``
``qty  : productQty ``
``price: productPrice ``
``photo: (change the type from text to file, and you ready to go to upload your photo)``

- Read Product
>methods = [GET] 
>url = http://127.0.0.1:3000/products (to read all products list) 
>url = http://127.0.0.1:3000/products/:products_id (to read products by products_id) 
!id is auto generate by the sistem, you can't manually input the products_id or passing some new products_id or even change the products_id this is the unique one


- Update Products 
>methods = [PUT] 
>url = http://127.0.0.1:3000/products_update/:products_id 
>go to Body
>raw 
>choose JSON format 
name, qty, price (choose this one as key bellow) 
{
"key" : "yourValue" 
}
>url = http://127.0.0.1:3000/photo_update/:products_id 
>go to Body 
>form-data
key:value
photo: (change the type from text to file, and you ready to go to upload your photo)

 	
- Delete Products 
>methods = [DELETE] 
>url= http://127.0.0.1:3000/products_delete/:products_id



callbacks[methods]: 
for(post, put and delete) if everything succes there will be a reply {"message" : "OK"}
for(get) the result is what you find for, if you try to search a products by their products_id but it doesn't registered before in the database, the reply will {"error" : "No data"}
for Wrong Token (in case you miss one number or other, there will be a reply {"error" : "Wrong Token"}



collection api postman: https://go.postman.co/workspace/coba~e54d042e-cb1d-402f-b11c-a0b07c117c36/collection/14954025-08d51c26-e162-4126-9e9d-cedee9aa1afa


4. running docker container: 

> ```$ curl localhost:3000``` => output :  {"message":"welcome home"}
this welcoming server is still run with empty table, for migrating table and create first seed run this command 

> ```$ docker exec crud-02-server-1 npm run migrate```

> ```$ docker exec crud-02-server-1 npm run seed```
(if there is tabel or incase i forget to delete it, the program automatically delete it first than create a new 'products' table) 

> ```$ curl localhost:3000/products``` 
(for see raw data from running seed) output will: {"error":"Wrong Token"} bcs we use token authentication, to not use this, go to products.js-> make Token function return 1 and rebuild again this container or just try it in postman using the one i've deploy on heroku with this url: https://maulia-api.herokuapp.com (all the route same like in local production))

in case you want to rebuild the container and use docker: 
```
$ docker-compose down
$ docker-compose up --build -d
$ docker exec crud-02-server-1 npm run migrate
$ docker exec crud-02-server-1 npm run seed
```
