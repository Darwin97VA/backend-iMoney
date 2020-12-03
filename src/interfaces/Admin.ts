import { Document, MongooseDocument } from 'mongoose'

export enum TipoAdmin {
  Propietario = 'Propietario',
  Admin = 'Admin',
}

export type IdAdmin = MongooseDocument['_id']
export interface IAdmin extends Document {
  _id: IdAdmin
  nombres: string
  correo: string
  contraseña: string
  tipo: TipoAdmin
}
