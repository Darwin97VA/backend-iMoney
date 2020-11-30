import { Document, model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUsuario extends Document {
  dni: number
  correo: string
  contraseña: string
  comparePassword: (password: string) => Promise<boolean>
  perfiles: string[] // _id[] de Perfiles
}

export const schemaUsuario = new Schema({
  dni: Number,
  correo: {
    required: true,
    type: String,
  },
  contraseña: String,
  perfiles: [String], // _id[] de Perfiles
})

schemaUsuario.pre<IUsuario>('save', async function (next) {
  try {
    const user = this
    if (!user.isModified('contraseña')) return next()
    else {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(user.contraseña, salt)
      user.contraseña = hash
    }
  } catch (error) {
    console.error(error)
  }
})

schemaUsuario.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.contraseña)
}

const Usuario = model<IUsuario>('Usuario', schemaUsuario, 'usuarios')

export default Usuario
