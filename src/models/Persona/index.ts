import { Document, model, Schema } from 'mongoose'
import { IPersona } from '../../interfaces/Persona'
import bcrypt from 'bcryptjs'

export interface IPersonaDocument extends IPersona, Document {
  comparePassword: (password: string) => Promise<boolean>
}

export const schemaPersona = new Schema({
  identidad: {
    tipoDocumentoIdentidad: String,
    documentoIdentidad: String,
    foto: String,
    nacionalidad: String,
    nombres: String,
    primerApellido: String,
    segundoApellido: String,
  },

  verificado: {
    type: Boolean,
    default: false,
  }, // Verificado por iMoney
  pep: [
    {
      cargo: String,
      organizacion: String,
    },
  ],
  correo: String,
  contraseña: String,

  usuarios: {
    propietario: [String],
    administrador: [String],
    estandar: [String],
    visitante: [String],
  },
  asignamientos: [
    {
      _id: String,
      tipo: String,
    },
  ],

  cambiosAsignamientos: [
    {
      momento: Date,
      asignamientos: [
        {
          _id: String,
          tipo: String,
        },
      ],
    },
  ],

  cuentas: [String],
})

schemaPersona.pre<IPersonaDocument>('save', async function (next) {
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

schemaPersona.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.contraseña)
}

const Persona = model<IPersonaDocument>('Person', schemaPersona, 'personas')

export default Persona
