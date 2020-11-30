import { MongooseDocument } from 'mongoose'

export enum TipoArchivo {
  PDF = 'PDF',
  PNG = 'PNG',
  JPG = 'JPG',
}

export type IdArchivo = MongooseDocument['_id']
export interface IArchivo {
  _id: IdArchivo
  tipo: TipoArchivo
}
