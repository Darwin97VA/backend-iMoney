import { NextFunction, Response } from 'express'
import Perfil from '../models/Perfil'
import { IRequestUser } from './interfaces'

export const getPerfil = async (
  req: IRequestUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { perfil /* _id de Perfil */ } = req.body

    if (req.__data) {
      const { usuario } = req.__data
      if (usuario) {
        const idPerfil = usuario.perfiles.find((_id: string) => _id == perfil)

        if (idPerfil) {
          const _perfil = await Perfil.findById(idPerfil)
          if (_perfil && req.__data) {
            req.__data.perfil = _perfil
            next()
          }
        }
        return res.status(400).json({ error: 'No existe el perfil' })
      }
      return res.status(400).json({ error: 'No existe el usuario' })
    }
    return res.status(400).json({ error: 'No está logeado' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}
