import { Request, Response } from 'express'
import { IEmpresa } from 'interfaces/Empresa'
import { IdMensaje } from '../interfaces/Mensaje'
import Mensaje from '../models/Mensaje'
import { IPersonaDocument } from '../models/Persona'

export const getMensajeById = (_id: string) => Mensaje.findById(_id)

export const getMensajesByIdPersonaAndPerfil = async (
  persona: IPersonaDocument,
  perfil: { mensajes: IdMensaje[] }
) => {
  try {
    if (perfil.mensajes) {
      const mensajes = await Promise.all(perfil.mensajes.map(getMensajeById))
      return mensajes.filter(
        (msg) => msg?.from._id === persona._id || msg?.to._id === persona._id
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

// export const getMensajeById = async (req: Request, res: Response) => {
//   try {

//   } catch (error) {
//     console.error(error)
//     return res.status(404).json({ error })
//   }
// }
