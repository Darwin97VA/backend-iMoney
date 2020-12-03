import { Document, model, Schema } from 'mongoose'
import { IMensaje } from '../../interfaces/Mensaje'

export interface IMensajeDocument extends IMensaje, Document {}

export const schemaMensaje = new Schema({
  from: {
    _id: String, // IdPersona | IdAdmin
    usuario: String, // enum TipoMensajero
    perfil: String, // IdPersona | IdEmpresa // Opcional porque lo puede emitir un admin y un admin no tiene perfil
  },
  to: {
    _id: String, // IdPersona | IdAdmin
    usuario: String, // TipoMensajero
    perfil: String, // IdPersona | IdEmpresa // Opcional porque lo puede emitir un admin y un admin no tiene perfil
  },
  mensaje: {
    tipo: String, // enum TipoMensaje
    contenido: String, // El texto o el _id del archivo
    momento: Date,
  },
})

const Mensaje = model<IMensajeDocument>('Mensaje', schemaMensaje, 'mensajes')

export default Mensaje
