import { MongooseDocument } from 'mongoose'
import { Asignamiento } from './Utils'

export enum TipoArchivo {
  PDF = 'PDF',
  PNG = 'PNG',
  JPG = 'JPG',
}

export type IdArchivo = MongooseDocument['_id']
export interface IArchivo {
  _id: IdArchivo
  tipo?: TipoArchivo
  ruta: string
  subidoPor: {
    _id: string // _id de la persona (si "isAdmin" es verdadero, entonces es el _id del Admin)
    asignamiento?: Asignamiento // en qué perfil lo hizo
    isAdmin?: boolean
  }
}
