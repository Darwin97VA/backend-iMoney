import { IArchivo } from 'interfaces/Archivo'
import { Document, model, Schema } from 'mongoose'

export interface IArchivoDocument extends Document, IArchivo {}

export const schemaArchivo = new Schema({
  ruta: String,
  tipo: String, // enum TipoArchivo
  subidoPor: {
    _id: String, // IdPersona
    asignamiento: {
      _id: String, // IdPersona || IdEmpresa
      tipo: String, // 'Persona' || 'Empresa'
    },
  },
})

const Archivo = model<IArchivoDocument>('Archivo', schemaArchivo, 'archivos')

export default Archivo
