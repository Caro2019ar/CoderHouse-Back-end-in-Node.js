import * as model from './model.js'

class ProductosMongoDB {
    constructor() {}

    leer(id) {
        return id? 
            model.productos.find({_id:id}) : 
            model.productos.find({})
    }
    
    guardar(producto) {
        const productoModel = new model.productos(producto);
        return productoModel.save()
    }

    actualizar(producto, id) {
        return model.productos.updateOne( {_id: id }, { $set: {...producto} })
    }
    
    borrar(id) {
        return model.productos.deleteOne( {_id: id })
    }
}

export default ProductosMongoDB

