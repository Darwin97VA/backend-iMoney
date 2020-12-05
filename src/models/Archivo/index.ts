import { IArchivo } from 'interfaces/Archivo'
import { Document, model, Schema } from 'mongoose'

export interface IArchivoDocument extends Document, IArchivo {}

const AsignamientoSchema = new Schema({
  _id: String, // IdPersona || IdEmpresa
  tipo: String, // 'Persona' || 'Empresa'
})

const SubidoPorSchema = new Schema({
  _id: String, // IdPersona
  asignamiento: {
    type: AsignamientoSchema,
    default: null,
  },
})

export const schemaArchivo = new Schema({
  ruta: String,
  tipo: String, // enum TipoArchivo
  subidoPor: SubidoPorSchema,
})

const Archivo = model<IArchivoDocument>('Archivo', schemaArchivo, 'archivos')

export default Archivo
