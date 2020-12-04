import { Document, MongooseDocument } from 'mongoose'
import { IdArchivo } from './Archivo'
import { IdCuenta } from './Cuenta'
import { IdMensaje } from './Mensaje'
import { Identidad, IdPersona } from './Persona'
import { IdOperacionCambio } from './Servicio/Cambio'
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

  // Lo de abajo funciona en Persona como un contexto especial
  // Funciona como un "Perfil":
  // Porque un "Perfil" (Empresa | Persona) tiene:
  // cuentas, mensajes, operaciones
  // Y esos comienzan aquí------
  archivos: IdArchivo[]
  mensajes: IdMensaje[]
  // (antes: ) operaciones: IdOperacionCambio /* | IdOperacionInversion | IdOperacionFinanciamiento */[]
  operaciones: {
    cambios: IdOperacionCambio[]
    // inversiones: IdInversion[]
    // credito: IdCredito[]
  }
  cuentas: IdCuenta[]
  // ------ hasta aquí.
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
