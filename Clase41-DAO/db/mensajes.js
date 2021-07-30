import * as model from './models/model.js'

class MensajesMongoDB {
    constructor() {}

    leer() {
        return model.mensajes.find({})
    }
    
    guardar(mensaje) {
        const mensajeModel = new model.mensajes(mensaje);
        return mensajeModel.save()
    }
}

export default MensajesMongoDB

