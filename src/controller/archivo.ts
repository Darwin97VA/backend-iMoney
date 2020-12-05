import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import { path_files } from '../routes/Archivo'
import Archivo from '../models/Archivo'
import { IPersonaDocument } from '../models/Persona'
import { IdArchivo } from '../interfaces/Archivo'
import { Asignamiento } from 'interfaces/Utils'
import _config from '../_config'
import { RequestDataPersona } from './interfaces'

const moveFile = (file: { mv: Function }, __path: string, name: string) => {
  const _path = path.resolve(__path)
  const exist = fs.existsSync(_path)
  if (!exist) {
    fs.mkdirSync(_path, { recursive: true })
  }
  return file.mv(_path + '/' + name)
}

export const create = async (req: Request, res: Response) => {
  try {
    const momento = new Date().getTime()
    const { params, files } = req
    const { persona, tipoDonde, idDonde } = params

    if (files) {
      const { dni, representante, mensaje, cambio } = files

      let path_api = '/api/archivo/'

      if (dni) {
        const name = momento + '--' + dni.name
        await moveFile(dni, path.resolve(path_files, 'dni', persona), name)
        path_api += 'dni/' + persona + '/' + name
      } else if (representante) {
        const name = momento + '--' + representante.name
        await moveFile(
          representante,
          path.resolve(path_files, 'representante', persona),
          name
        )
        path_api += 'representante/' + persona + '/' + name
      } else if (mensaje) {
        const name = momento + '--' + mensaje.name
        await moveFile(
          mensaje,
          path.resolve(path_files, 'mensaje', persona),
          name
        )
        path_api += 'mensaje/' + persona + '/' + name
      } else if (cambio) {
        const name = momento + '--' + cambio.name
        await moveFile(
          cambio,
          path.resolve(path_files, 'cambio', persona, idDonde),
          name
        )
        path_api += 'cambio/' + persona + '/' + idDonde + '/' + name
      } else {
        return res
          .status(400)
          .json({ error: 'Falta datos para subir el archivo' })
      }
      const finalPath = path.resolve(path_files, path_api)
      const nuevoArchivo = new Archivo({
        tipo: path.extname(finalPath),
        ruta: path_api,
        subidoPor: {
          _id: persona, // _id de la persona
          asignamiento: {
            _id: idDonde,
            tipo: tipoDonde,
          }, // en qué perfil lo hizo
        },
      })
      await nuevoArchivo.save()
      return res.json({ data: path_api })
    } else {
      return res.status(400).json({ error: 'No se envió ningún archivo.' })
    }
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}
interface UploadRequest extends Request, RequestDataPersona {
  body: {
    asignamiento?: Asignamiento
  }
}
export const uploadByPersona = async (req: UploadRequest, res: Response) => {
  try {
    const momento = new Date().getTime()
    const { files, body, __data } = req
    const { asignamiento } = body

    if (__data?.persona && files) {
      const { persona } = __data
      let path_system = path.resolve(_config.PATH_ARCHIVOS, persona?._id)
      let subidoPor
      if (asignamiento) {
        path_system = path.resolve(path_system, asignamiento._id)
        subidoPor = {
          _id: persona, // _id de la persona
          asignamiento,
        }
      } else {
        path_system = path.resolve(path_system, 'temporal')
        subidoPor = { _id: persona }
      }
      const path_file = path.resolve(
        path_system,
        momento + '--' + files.archivo.name
      )
      await files.archivo.mv(path_file)

      const nuevoArchivo = new Archivo({
        tipo: path.extname(path_file),
        ruta: path_file,
        subidoPor,
      })
      const archivoGuardado = await nuevoArchivo.save()
      return res.json({ data: archivoGuardado })
    }
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}
export const getArchivoById = (_id: string) => Archivo.findById(_id)

export const getArchivosByIdPersonaAndPerfil = async (
  persona: IPersonaDocument,
  perfil: { archivos: IdArchivo[] }
) => {
  try {
    if (perfil.archivos) {
      const archivos = await Promise.all(perfil.archivos.map(getArchivoById))
      return archivos.filter(
        (arch) =>
          arch?.subidoPor?._id === persona._id ||
          arch?.subidoPor?._id === persona._id
      )
    }
    console.log('El perfil: ', persona._id, 'no tiene mensajes')
    return []
  } catch (error) {
    console.log('Error en: getMensajesByPersonaAndPerfil')
    console.error(error)
    return error
  }
}
