import { ICambio } from 'interfaces/Servicio/Cambio'
import { Document, model, Schema } from 'mongoose'

export interface ICambioDocument extends Document, ICambio {}

export const schemaCambio = new Schema({
  moneda: String, // TipoMoneda
  compra: Number,
  venta: Number,
})

const Cambio = model<ICambioDocument>('Cambio', schemaCambio, 'cambios')

export default Cambio
