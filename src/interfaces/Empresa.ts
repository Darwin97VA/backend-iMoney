import { Document, MongooseDocument } from 'mongoose'
import { IdArchivo } from './Archivo'
import { IdCuenta } from './Cuenta'
import { Identidad, IdPersona } from './Persona'
import { Usuarios, UsuariosDetalle } from './Utils'

interface RepresentanteLegal {
  idPersona: IdPersona
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
  razonSocial: string
  representanteLegal: RepresentanteLegal[]

  usuarios: Usuarios

  cuentas: IdCuenta[]
}

// REQUEST.-------------------------
interface RequestRepresentanteLegal {
  identidad: Identidad
  docRelacion: IdArchivo
  estado: {
    estaRegistrado: boolean // Si la persona con ese DNI tiene una cuenta en iMoney
    relacionVerificada: boolean // Si iMoney lo verificó
  }
  cargo: string // El cargo administrativo que tiene en la empresa
}
export interface IEmpresaRequest {
  ruc: number
  razonSocial: String
  representanteLegal: RequestRepresentanteLegal[]

  usuarios: UsuariosDetalle
}
