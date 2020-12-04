import { IdArchivo } from './Archivo'
import { IdCuenta } from './Cuenta'
import { IdEmpresa } from './Empresa'
import {
  Nacionalidad,
  TipoDocumentoIdentidad,
  Usuarios,
  Asignamiento,
} from './Utils'
import { Document, MongooseDocument } from 'mongoose'
import { IdOperacionCambio } from './Servicio/Cambio'
import { IdMensaje } from './Mensaje'

export interface Identidad {
  tipoDocumentoIdentidad: TipoDocumentoIdentidad
  documentoIdentidad: string
  foto: IdArchivo
  nacionalidad: Nacionalidad

  nombres: string
  primerApellido: string
  segundoApellido: string
}

export type IdPersona = MongooseDocument['_id']
export interface IPersona extends Document {
  _id: IdPersona
  identidad: Identidad

  verificado?: boolean // Verificado por iMoney
  pep?: Pep[]
  correo: string
  contraseña: string

  usuarios: Usuarios
  // "Persona.usuarios" y "Empresa.usuarios"
  // mandan sobre "Persona.asignamientos"
  // por eso se obtiene el "Tipo de Relación"
  // desde la Empresa.usuarios o Persona.usuarios
  // cuya "Empresa" o "Persona" se obteniene con el "_id"
  asignamientos: Asignamiento[]

  // Se calculará los nuevos cambios comparando en
  // el cliente la diferencia entre el último y
  // penúltimo item de "cambiosAsignados".
  // Se añaderá un item a "cambiosAsignados" cada
  // vez que se haga login.
  cambiosAsignamientos: {
    momento: Date
    asignamientos: Asignamiento[]
  }[]

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
    // inversiones?: IdInversion[]
    // creditos?: IdCredito[]
  }
  cuentas: IdCuenta[]
  // ------ hasta aquí.
}

interface Pep {
  cargo: string
  organizacion: string
}

/*
type IdCuarto = string
interface Casa {
  piso1: {
    cuartos: IdCuarto[]
  }
}
interface Casota {
  piso1: {
    cuartos: IdCuarto[]
  }
  piso2: {
    cuartos: IdCuarto[]
  }
}
const casas: Casa[] = []
const Casota = {
  piso1: {
    cuartos: ['_idCasa_1', '_idCasa_2']
  }
}
casas.push(Casota)
*/
