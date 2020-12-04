import { Mensaje } from '../Mensaje'
import { IdPersona } from '../Persona'
import { Asignamiento, TipoMoneda } from '../Utils'
import { Document, MongooseDocument } from 'mongoose'
import { IdArchivo } from '../Archivo'

export enum EstadoCambio {
  Iniciado = 'Iniciado',
  Aprovado = 'Aprovado',
  Rechazado = 'Rechazado',
  Terminado = 'Terminado',
}

interface InformacionCambio {
  moneda: TipoMoneda
  compra: number
  venta: number
}

export type IdCambio = MongooseDocument['_id']
export interface ICambio extends InformacionCambio, Document {
  _id: IdCambio
}

export type IdOperacionCambio = MongooseDocument['_id']
export interface IOperacionCambio extends Document {
  _id: IdOperacionCambio
  idOperacion: number // un Id que el usuario podrá compartir con el admin
  data: InformacionCambio
  operacion: {
    momento: Date
    persona: IdPersona
    asignamiento: Asignamiento
    archivo: IdArchivo
  }
  historia: {
    estado: EstadoCambio
    momento: Date
    mensajeDePersona?: Mensaje
    mensajeDeAdmin?: Mensaje
  }[]
}
