import persistenciaMemory from './productosMemory.js'
import persistenciaMongo from './productos.js'

/* -------------------------------------- */
/*                FACTORY                 */
/* -------------------------------------- */
class FactoryProductoModel {
    static set(opcion) {
        console.log('**** PERSISTENCIA SELECCIONADA **** [' + opcion + ']')
        switch(opcion) {
            case 'Mem': return new persistenciaMemory()
            case 'Mongo': return new persistenciaMongo();
        }
    }
}

const opcion = process.argv[2] || 'Mem'
export default FactoryProductoModel.set(opcion)