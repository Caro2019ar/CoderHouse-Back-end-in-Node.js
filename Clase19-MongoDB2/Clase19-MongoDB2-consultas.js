------------------ Desafio 19 - Comandos de MongoDB -------
------>> Consigna: Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.
    
    use ecommerce
    db.createCollection("mensajes")
    db.createCollection("productos")

1) Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB. 

    -MENSAJES:
    db.mensajes.insert([{ email: "pedro@gmail.com", text: "Hola, que tal?",timestamp:ISODate()}, { email: "bia@yahoo.com.br", text: "Bieeeen!", timestamp:ISODate()},{ email: "juan@gmail.com", text: "hola, chicos!", timestamp:ISODate()},{ email: "toby@gmail.com", text: "Que onda?", timestamp:ISODate()}, { email: "pedro@gmail.com", text: "Estoy para salir...", timestamp:ISODate()}, { email: "bia@yahoo.com.br", text: "Vas a salir sin nosotros?", timestamp:ISODate()}, { email: "juan@gmail.com", text: "Quiero ir también!", timestamp:ISODate()}, { email: "toby@gmail.com", text: "Donde vas?", timestamp:ISODate()}, { email: "pedro@gmail.com", text: "Pero voy al mercado...", timestamp:ISODate()}, { email: "bia@yahoo.com.br", text: "Uff...", timestamp:ISODate()}])

2) Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990). 

    -PRODUCTOS:
    db.productos.insert([{ nombre: "Calculadora", precio: 120, foto:"https:1", descripcion: "calculadora HP12C", codigo: "9282", stock: 34, timestamp:ISODate()}, { nombre: "Globo", precio: 580, foto:"https:22", descripcion: "Globo Tierra", codigo: "282", stock: 34, timestamp:ISODate()},{ nombre: "Reloj", precio: 900, foto:"https:33", descripcion: "Rolex", codigo: "92", stock: 1, timestamp:ISODate()}, { nombre: "Escuadra", precio: 1280, foto:"https:44", descripcion: "Escuadra de plástico", codigo: "988", stock: 3, timestamp:ISODate()},{ nombre: "Calculadora", precio: 1700, foto:"https:55", descripcion: "calculadora Plata HP12C", codigo: "82", stock: 3, timestamp:ISODate()}, { nombre: "Globo azul", precio: 2300, foto:"https:66", descripcion: "Globo", codigo: "456", stock: 45, timestamp:ISODate()},{ nombre: "Reloj2", precio: 2860, foto:"https:77", descripcion: "Casio", codigo: "778", stock: 7, timestamp:ISODate()},{ nombre: "Escuadra", precio: 3350, foto:"https:88", descripcion: "Escuadra de oro", codigo: "887", stock: 2, timestamp:ISODate()},{ nombre: "Calculadora", precio: 4320, foto:"https:99", descripcion: "calculadora AI", codigo: "997", stock: 3, timestamp:ISODate()},{ nombre: "Globo negro", precio: 4990, foto:"https:10", descripcion: "Globo negro black", codigo: "100", stock: 1, timestamp:ISODate()}])


3) Listar todos los documentos en cada colección.

    db.mensajes.find().pretty()
    db.productos.find().pretty()

4) Mostrar la cantidad de documentos almacenados en cada una de ellas.

    db.mensajes.count()
    db.productos.count()

5)Realizar un CRUD sobre la colección de productos:
    a)Agregar un producto más en la colección de productos 

        db.productos.insertOne({ nombre: "Pantalones", precio: 4500, foto:"https:11", descripcion: "pantalones CK", codigo: "111", stock: "12", timestamp:ISODate()})

    b)Realizar una consulta por nombre de producto específico:

        db.productos.find({"nombre":"Pantalones"})

        i) Listar los productos con precio menor a 1000 pesos.

            db.productos.find({"precio":{$lt: 1000}})

        ii) Listar los productos con precio entre los 1000 a 3000 pesos.

            db.productos.find({$and:[{"precio":{$gt: 1000}},{"precio":{$lt: 3000}}]})

        iii) Listar los productos con precio mayor a 3000 pesos.

            db.productos.find({"precio":{$gt: 3000}})

        iv) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

            let order3Cheap = db.productos.find().pretty().sort({precio:1}).limit(3)
            let array3Cheap = order3Cheap.toArray()
            let prod3 = array3Cheap.pop().nombre
            prod3

    c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

            db.productos.updateMany({"stock":{$gt: 1}}, {$set:{"stock":100}})

    d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 

            db.productos.updateMany({"precio":{$gt: 4000}}, {$set:{"stock":0}})

    e) Borrar los productos con precio menor a 1000 pesos 

            db.productos.deleteMany({"precio":{$lt: 1000}})

6) Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

    use admin
    db.createUser({"user":"pepe", pwd: "asd456", roles:[{role:"read", db:"ecommerce"}]})