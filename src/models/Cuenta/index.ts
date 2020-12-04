import { ICuenta } from '../../interfaces/Cuenta'
import { Document, model, Schema } from 'mongoose'

export interface ICuentaDocument extends Document, ICuenta {}

export const schemaCuenta = new Schema({
  nombre: String,
  numero: Number,
  cci: {
    type: Number,
    unique: true,
  },
  banco: String, // enum Banco
  tipo: String, // enum TipoCuenta
  moneda: String, // enum TipoMoneda
  propietario: String, // _id de Persona o Empresa
})

const Cuenta = model<ICuentaDocument>('Cuenta', schemaCuenta, 'cuentas')

export default Cuenta
