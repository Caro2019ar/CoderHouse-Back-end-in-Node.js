import MensajesMongoDB from '../db/mensajes.js'

/* --------------------- NORMALIZACIÓN DE MENSAJES ---------------------------- */
import { normalize, schema, denormalize } from 'normalizr'
import util from 'util'

function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
}

// Definimos un esquema de autor
const schemaAuthor = new schema.Entity('author',{},{idAttribute: 'email'});

// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity('post', {
    author: schemaAuthor
},{idAttribute: '_id'})

// Definimos un esquema de posts
const schemaMensajes = new schema.Entity('posts', {
  mensajes: [schemaMensaje]
},{idAttribute: 'id'})
/* ---------------------------------------------------------------------------- */

class Mensajes {

    constructor() {
        this.mensajesMongoDB = new MensajesMongoDB()
    }

    async getAll() {
        try {
            let mensajes = await this.mensajesMongoDB.leer()
            //print(mensajes)
            let mensajesConId = { 
                id: 'mensajes', 
                mensajes : mensajes.map( mensaje => ({...mensaje._doc}))
            }
            //print(mensajesConId)
            let mensajesConIdN = normalize(mensajesConId, schemaMensajes)
            //print(mensajesConIdN)
            return mensajesConIdN;
        }
        catch {
            return []
        }
    }

    async guardar(mensaje) {
        try {
            mensaje.fyh = new Date().toLocaleString()
            //console.log(mensaje)
            await this.mensajesMongoDB.guardar(mensaje)
        }
        catch(error) {
            console.log('Error en guardar mensaje', error)
        }
    }
}

export default Mensajes
