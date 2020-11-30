import { Document, model, Schema } from 'mongoose'

export interface IArchivo extends Document {
  ruta: string
  subidoPor: number
  perfil: string // _id de Perfil
}

export const schemaArchivo = new Schema({
  ruta: String,
  subidoPor: Number, // DNI de (Persona | Persona)
  perfil: String, // _id de Perfil
})

const Archivo = model<IArchivo>('Archivo', schemaArchivo, 'archivos')

export default Archivo
