import { Document, model, Schema } from 'mongoose'

export interface IPerfil extends Document {
  verificado: boolean // Verificado por iMoney
  verificadoPorRepresentante: boolean // Verificado por el representante

  administradores: number[] // Dni[]; dni de usuarios administradores
  gestores: number[] // dni de usuarios gestores
  visitantes: number[] // dni de usuario visitantes
  operaciones: string[] // _id[] de Operaciones

  info: number // Dni | Ruc
  tipo: string // Persona | Empresa
}

export const schemaPerfil = new Schema({
  verificado: {
    type: Boolean,
    default: false,
  },
  verificadoPorRepresentante: {
    type: Boolean,
    default: false,
  },
  administradores: [Number], // Dni[]; dni de usuarios administradores
  gestores: [Number], // dni de usuarios gestores
  visitantes: [Number], // dni de usuario visitantes
  operaciones: [String], // _id[] de Operaciones

  info: Number, // Dni | Ruc
  tipo: String, // Persona | Empresa
})

const Perfil = model<IPerfil>('Perfil', schemaPerfil, 'perfiles')

export default Perfil
