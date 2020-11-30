import { MongooseDocument } from 'mongoose'
import { Banco, TipoCuenta, TipoMoneda } from './Utils'

export type IdCuenta = MongooseDocument['_id']
export interface ICuenta {
  _id: IdCuenta
  numero: number
  cci: number
  banco: Banco
  tipo: TipoCuenta
  moneda: TipoMoneda
}
