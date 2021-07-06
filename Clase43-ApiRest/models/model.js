import mongoose from 'mongoose';

const nombreCollectionProductos = 'productos';
const nombreCollectionMensajes = 'mensajes';
const nombreCollectionUsers = 'users';

// -------------------------------------------------------------
//                         SCHEMA
// -------------------------------------------------------------
const productoSchema = mongoose.Schema({
    title: String,
    price: Number,
    thumbnail: String
});

const mensajeSchema = mongoose.Schema({
  author: Object,
  text: String,
  fyh: String
});

const userSchema = mongoose.Schema({
  username: String,
  password: String
});

export const productos = mongoose.model(nombreCollectionProductos, productoSchema);
export const mensajes = mongoose.model(nombreCollectionMensajes, mensajeSchema);
export const user = mongoose.model(nombreCollectionUsers, userSchema);

