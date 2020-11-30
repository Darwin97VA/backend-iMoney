import { NextFunction, Request, Response } from 'express'
import Usuario from '../models/Usuario'
import { TokenData, IRequestUser } from './interfaces'
import jwt from 'jsonwebtoken'
import config from '../config'

export const login = async (req: Request, res: Response) => {
  try {
    const user = await Usuario.findOne({ correo: req.body.correo })
    const verificaPassword = await user?.comparePassword(req.body.contraseña)

    if (user && verificaPassword) {
      const ID_USUARIO = user._id
      const dataToken: TokenData = { ID_USUARIO }

      const token = jwt.sign(dataToken, config.SECRET_JWT)
      return res.json({ data: token })
    }
    return res.status(400).json({ error: 'Credencial inválidas' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}

export const getUser = async (
  req: IRequestUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const BearerToken = req.headers.authorization

    if (BearerToken) {
      const token = BearerToken.split(' ')[1]
      const decoded: TokenData | string = jwt.verify(token, config.SECRET_JWT)

      if (decoded && typeof decoded === 'object') {
        const ID_USUARIO = decoded.ID_USUARIO
        const usuario = await Usuario.findById(ID_USUARIO)

        if (usuario && req.__data) {
          req.__data.usuario = usuario
          return next()
        }
      }
      return res.status(400).json({ data: 'El token de acceso está corrupto' })
    }
    return res.status(400).json({ data: 'No se entregó el token de acceso.' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}
