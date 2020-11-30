import { IRequestUser } from '../../controllers/interfaces'
import { getUser } from '../../controllers/user'
import { Response, Router } from 'express'
import { getPerfil } from '../../controllers/perfil'
import Empresa, { IEmpresa } from '../../models/Empresa'
import Persona, { IPersona, IPersonaPura } from '../../models/Persona'
import Perfil from '../../models/Perfil'
import { Document, Model } from 'mongoose'

const router = Router()

const guardaPersona = async ({ persona }: PersonaYDni) => {
  const { dni } = persona
  const personaExistente = await Persona.findOne({ dni })
  if (personaExistente) {
    return personaExistente
  } else {
    const nuevaPersona = new Persona(persona)
    await nuevaPersona.save()
    return nuevaPersona
  }
}

interface RepresentanteYDocumento extends PersonaYDni {
  documento: string
}
interface PersonaYDni {
  persona: IPersonaPura
  fotoDni: string
}
interface RequestPerfilEmpresa {
  ruc: number
  razonSocial: string
  representanteLegal: RepresentanteYDocumento[]
  autorizados: PersonaYDni[]
}
type RequestPerfilPersona = IPersonaPura

interface IRequestPerfilEmpresa extends IRequestUser {
  body: {
    data?: RequestPerfilEmpresa
  }
}

router.post(
  '/create/empresa',
  getUser,
  getPerfil,
  async (req: IRequestPerfilEmpresa, res: Response) => {
    try {
      if (req.__data) {
        const { usuario } = req.__data

        if (usuario) {
          const dni = usuario.dni
          const infoEmpresa = req.body.data

          if (infoEmpresa) {
            const {
              ruc,
              razonSocial,
              representanteLegal,
              autorizados,
            } = infoEmpresa
            let empresa: IEmpresa
            const existeEmpresa = await Empresa.findOne({ ruc })

            if (existeEmpresa) {
              empresa = existeEmpresa
            } else {
              empresa = new Empresa({
                ruc,
                razonSocial,
              })
              /*
              interface DocumentoRepresentante {
                dni: number
                documento: string // _id del archivo
              }
              export interface IEmpresa extends Document {
                ruc: number
                razonSocial: string
                representanteLegal: DocumentoRepresentante[]
                cuentasBancarias: string[] // _idCuentaBancaria[]
              }
              
              */
            }
          }
          return res.json()
        }
        return res
          .status(400)
          .json({ data: 'El usuario registrador no existe' })
      }
      return res.status(400).json({ data: 'No está logeado' })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error })
    }
  }
)

export default router
