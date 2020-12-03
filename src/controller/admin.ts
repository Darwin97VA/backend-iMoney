import config from '../_config'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { RequestDataAdmin, TokenAdmin } from './interfaces'
import Admin from '../models/Admin'
import { IAdmin, TipoAdmin } from '../interfaces/Admin'

export const getAdmin = async (
  req: RequestDataAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req
    if (token) {
      const decoded: TokenAdmin | string = jwt.verify(token, config.SECRET_JWT)

      if (decoded && typeof decoded === 'object') {
        const ID_ADMIN = decoded.ID_ADMIN
        const admin = await Admin.findById(ID_ADMIN)

        if (admin) {
          if (!req.__data) {
            req.__data = {}
          }
          req.__data.admin = admin
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

interface RequestRegistro extends Request, RequestDataAdmin {
  body: IAdmin
}
export const registerAdmin = async (req: RequestRegistro, res: Response) => {
  try {
    const { __data, body } = req

    if (__data?.admin?.tipo === TipoAdmin.Propietario) {
      const admin = new Admin(body)
      await admin.save()

      return res.json({ data: 'Listo, por favor cambie su contraseña.' })
    }
    return res
      .status(400)
      .json({ error: 'Sólo el Admin Propietario puede añadir más admins.' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    if (req.body.correo && req.body.contraseña) {
      const admin = await Admin.findOne({ correo: req.body.correo })

      if (admin) {
        const verificaPassword = await admin.comparePassword(
          req.body.contraseña
        )

        if (verificaPassword) {
          const ID_ADMIN = admin._id
          const dataToken: TokenAdmin = { ID_ADMIN }

          const token = jwt.sign(dataToken, config.SECRET_JWT)
          const data = {}

          return data
            ? res.json({ data: { token, _id: ID_ADMIN, data } })
            : res.json({
                data: { token, _id: ID_ADMIN },
                error: 'Hubo un problema recopilando la data inicial.',
              })
        }
      }
    }
    return res.status(400).json({ error: 'Credencial inválidas' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}

export const updateOthersAdmins = async (
  req: RequestDataAdmin,
  res: Response
) => {
  try {
    const {
      __data,
      body /* La información del admin, incluido su _id, ya actualizado */,
    } = req

    if (__data?.admin) {
      const adminEjecutor = await Admin.findById(__data.admin._id)

      if (
        adminEjecutor?.tipo === TipoAdmin.Propietario || // Lo hace el propietario
        adminEjecutor?._id === body._id // Lo hace el mismo admin
      ) {
        const admin = await Admin.findByIdAndUpdate(body._id, body)

        return admin
          ? res.json({ data: 'Admin actualizado.' })
          : res
              .status(400)
              .json({ error: 'No se encontró el administrador a actualizar' })
      } else {
        return res.json({ data: 'Sólo el propietario puede hacer ese cambio.' })
      }
    }
    return res
      .status(400)
      .json({ error: 'No tiene permisos para este procedimiento.' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}
