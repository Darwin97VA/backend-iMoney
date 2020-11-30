import { model, Schema } from 'mongoose'
import { IEmpresa } from '../../interfaces/Empresa'

const schemaRepresentante = new Schema({
  _id: String,
  docRelacion: String, // _id del archivo
  estado: {
    estaRegistrado: Boolean, // Si la persona con ese DNI tiene una cuenta en iMoney
    relacionVerificada: Boolean, // Si iMoney lo verificó
  },
  cargo: String, // El cargo administrativo que tiene en la empresa
})
export const schemaEmpresa = new Schema({
  ruc: Number,
  razonSocial: String,
  representanteLegal: [schemaRepresentante], // DNI

  usuarios: [
    {
      propietario: [String], // _id de Persona
      administrador: [String], // _id de Persona
      estandar: [String], // _id de Persona
      visitante: [String], // _id de Persona
    },
  ],

  cuentas: [String], // _idCuentaBancaria[]
})

const Empresa = model<IEmpresa>('Empresa', schemaEmpresa, 'empresas')

export default Empresa
