import { ICambio } from '../../../interfaces/Servicio/Cambio'
import { TipoMoneda } from '../../../interfaces/Utils'
import { Document, model, Schema } from 'mongoose'

export interface ICambioDocument extends Document, ICambio {}

export const schemaCambio = new Schema({
  moneda: String, // TipoMoneda
  compra: Number,
  venta: Number,
})

const Cambio = model<ICambioDocument>('Cambio', schemaCambio, 'cambios')

let cambio = new Cambio({
  moneda: TipoMoneda.Sol, // TipoMoneda
  compra: 3.5,
  venta: 3.6,
})
cambio.save()
export default Cambio
