import registerConfirmation from '../emails/registerConfirmation'
import { NextFunction, Request, Response } from 'express'
import Persona from '../models/Persona'
import { PATH_INICIAL_CORREO } from '../routes/Persona'
import jwt from 'jsonwebtoken'
import _config from '../_config'
import { IPersona } from '../interfaces/Persona'
import { RequestDataPersona, TokenData } from './interfaces'
import { getAllDataForPersona } from './dataParaLogin'

export const controllerTEST = async (_req: Request, res: Response) => {
  return await res.send('Hola')
}
// export const login = controllerTEST

export const login = async (req: Request, res: Response) => {
  try {
    if (req.body.correo && req.body.contraseña) {
      const persona = await Persona.findOne({ correo: req.body.correo })

      if (persona) {
        const verificaPassword = await persona.comparePassword(
          req.body.contraseña
        )

        if (verificaPassword) {
          const ID_PERSONA = persona._id
          const dataToken: TokenData = { ID_PERSONA }

          const TODA_LA_DATA = await getAllDataForPersona(persona)

          if (TODA_LA_DATA) {
            const token = jwt.sign(dataToken, _config.SECRET_JWT)
            return res.json({
              data: { token, _id: ID_PERSONA, persona, ...TODA_LA_DATA },
            })
          }
        }
      }
    }
    return res.status(400).json({ error: 'Credencial inválidas' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}
export const confirmMail = controllerTEST

interface RequestRegistro extends Request {
  body: IPersona
}
export const registro = controllerTEST
export const getPersona = controllerTEST
