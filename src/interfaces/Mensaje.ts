import { Document, MongooseDocument } from 'mongoose'
import { IdAdmin } from './Admin'
import { IdEmpresa } from './Empresa'
import { IdPersona } from './Persona'

export enum TipoMensaje {
  Archivo = 'Archivo',
  Texto = 'Texto',
}
export interface Mensaje {
  tipo: TipoMensaje
  contenido: string // El texto o el _id del archivo
  momento: Date
}
export enum TipoMensajero {
  Admin = 'Admin',
  Persona = 'Persona',
}

export type IdMensaje = MongooseDocument['_id']
export interface IMensaje extends Mensaje, Document {
  _id: IdMensaje
  from: {
    _id: IdPersona | IdAdmin
    usuario: TipoMensajero
    perfil?: IdPersona | IdEmpresa // Opcional porque lo puede emitir un admin y un admin no tiene perfil
  }
  to: {
    _id: IdPersona | IdAdmin
    usuario: TipoMensajero
    perfil?: IdPersona | IdEmpresa // Opcional porque lo puede emitir un admin y un admin no tiene perfil
  }
  mensaje: Mensaje
}
