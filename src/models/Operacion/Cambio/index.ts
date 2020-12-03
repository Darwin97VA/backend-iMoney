import { IOperacionCambio } from 'interfaces/Servicio/Cambio'
import { Document, model, Schema } from 'mongoose'

export interface IOperacionCambioDocument extends Document, IOperacionCambio {}

export const schemaOperacionCambio = new Schema({
  idOperacion: {
    type: Number,
    require: true,
    unique: true,
  },
  data: {
    moneda: String, // enum TipoMoneda
    compra: Number,
    venta: Number,
  },
  operacion: {
    momento: Date,
    persona: String, // _id de Persona
    asignamiento: {
      _id: String, // _id de Persona o Empresa del cual se hizo
      tipo: String, // 'Persona' || 'Empresa'
    },
    archivo: String, // _id de Archivo IdArchivo
  },
  historia: [
    {
      estado: String, // EstadoCambio
      momento: Date,
      mensajeDePersona: {
        tipo: String,
        contenido: String,
        momento: Date,
      },
      mensajeDeAdmin: {
        tipo: String,
        contenido: String,
        momento: Date,
      },
    },
  ],
})

const OperacionCambio = model<IOperacionCambioDocument>(
  'OperacionCambio',
  schemaOperacionCambio,
  'operacionCambios'
)

export default OperacionCambio
