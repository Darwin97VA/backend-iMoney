import { Document, MongooseDocument } from 'mongoose'
import { IdArchivo } from './Archivo'
import { IdCuenta } from './Cuenta'
import { IdPersona } from './Persona'
import { Usuarios } from './Utils'

interface RepresentanteLegal {
  _id: IdPersona
  docRelacion: IdArchivo
  estado: {
    estaRegistrado: boolean // Si la persona con ese DNI tiene una cuenta en iMoney
    relacionVerificada: boolean // Si iMoney lo verificó
  }
  cargo: string // El cargo administrativo que tiene en la empresa
}

export type IdEmpresa = MongooseDocument['_id']
export interface IEmpresa extends Document {
  _id: IdEmpresa
  ruc: number
  razonSocial: String
  representanteLegal: RepresentanteLegal[]

  usuarios: Usuarios

  cuentas: IdCuenta[]
}
