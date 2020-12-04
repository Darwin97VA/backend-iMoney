import { Document, MongooseDocument } from 'mongoose'
import { IdEmpresa } from './Empresa'
import { IdPersona } from './Persona'
import { Banco, TipoCuenta, TipoMoneda } from './Utils'

export type IdCuenta = MongooseDocument['_id']
export interface ICuenta extends Document {
  _id: IdCuenta
  nombre: string // es un apodo
  numero: number
  cci: number
  banco: Banco
  tipo: TipoCuenta
  moneda: TipoMoneda
  propietario: IdEmpresa | IdPersona
}
