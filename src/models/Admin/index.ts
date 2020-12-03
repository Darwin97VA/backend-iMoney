import { Document, model, Schema } from 'mongoose'
import { IAdmin, TipoAdmin } from '../../interfaces/Admin'
import bcrypt from 'bcryptjs'

export interface IAdminDocument extends IAdmin, Document {
  comparePassword: (password: string) => Promise<boolean>
}

export const schemaAdmin = new Schema({
  nombres: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
    unique: true,
  },
  tipo: {
    type: String,
    required: true,
    default: TipoAdmin.Admin,
  },
})

schemaAdmin.pre<IAdminDocument>('save', async function (next) {
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

schemaAdmin.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.contraseña)
}

const Admin = model<IAdminDocument>('Admin', schemaAdmin, 'admins')

export default Admin
