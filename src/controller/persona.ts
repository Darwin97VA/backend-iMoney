import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import Persona from '../models/Persona'
import registerConfirmation from '../emails/registerConfirmation'
import { IPersona } from '../interfaces/Persona'
import { Asignamiento, NivelAsignacion } from '../interfaces/Utils'
import { PATH_INICIAL_CORREO } from '../routes/Persona'
import { TokenData, RequestDataPersona } from './interfaces'
import { IEmpresa } from '../interfaces/Empresa'
import { getSujetosDeAsignaciones } from './dataParaLogin'

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

          const TODA_LA_DATA = await getSujetosDeAsignaciones(persona)

          if (TODA_LA_DATA) {
            const { Personas, Empresas } = TODA_LA_DATA
            console.log(Personas, Empresas)

            const token = jwt.sign(dataToken, config.SECRET_JWT)
            return res.json({
              data: { token, _id: ID_PERSONA, persona, Personas, Empresas },
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

interface RequestRegistro extends Request {
  body: IPersona
}
export const registro = async (req: RequestRegistro, res: Response) => {
  try {
    const { get, baseUrl } = req
    const { identidad } = req.body

    const existePersona = await Persona.findOne({
      'identidad.documentoIdentidad': identidad.documentoIdentidad,
    })

    if (!existePersona?.correo) {
      const persona = new Persona(req.body)
      const token = jwt.sign(persona.toJSON(), config.SECRET_JWT, {
        expiresIn: 60 * 5 /* 5 minutos */,
      })

      const urlBase = `http://${req.get(
        'host'
      )}${baseUrl}${PATH_INICIAL_CORREO}/`
      const URL = urlBase + token

      await registerConfirmation(persona.correo, { URL })

      return res.json({
        data: 'Correo de confirmación enviado! Será valido por 5 minutos',
      })
    }

    return res.status(402).json({ data: 'Persona ya registrada' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}

export const getPersona = async (
  req: RequestDataPersona,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req
    if (token) {
      const decoded: TokenData | string = jwt.verify(token, config.SECRET_JWT)

      if (decoded && typeof decoded === 'object') {
        const ID_PERSONA = decoded.ID_PERSONA
        const persona = await Persona.findById(ID_PERSONA)

        if (persona) {
          if (!req.__data) {
            req.__data = {}
          }
          req.__data.persona = persona
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

export const confirmMail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params
    const _persona = jwt.verify(token, config.SECRET_JWT) as IPersona

    if (_persona) {
      let persona: IPersona
      const existePersona = await Persona.findOne({
        'identidad.documentoIdentidad': _persona.identidad.documentoIdentidad,
      })

      if (existePersona) {
        persona = new Persona({
          ...existePersona,
          correo: _persona.correo,
          contraseña: _persona.contraseña,
          identidad: _persona.identidad,
        })
      } else {
        persona = new Persona(_persona)
      }

      await persona.save()

      if (!persona.usuarios) {
        persona.usuarios = {
          propietario: [],
          administrador: [],
          estandar: [],
          visitante: [],
        }
      }

      const yaEsPropietario = persona.usuarios?.propietario.find(
        (_id) => _id == persona._id
      )
      if (!yaEsPropietario) {
        persona.usuarios.propietario.push(persona._id)
      }

      const yaEstaAutoasignado = persona.asignamientos.find(
        (asignamiento: Asignamiento) => asignamiento._id === persona._id
      )
      if (!yaEstaAutoasignado) {
        persona.asignamientos.push({
          tipo: 'Persona',
          _id: persona._id,
        })
      }

      await persona.save()

      return res.json({ data: '¡Registro exitoso!\nYa puede iniciar sesión' })
    }
    return res
      .status(400)
      .json({ error: 'El token entregado no devolvió ningún usuario' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}

export const crearPersona = async (req: RequestRegistro, res: Response) => {
  try {
    if (
      !req.body.correo &&
      !req.body.contraseña &&
      !req.body?.identidad?.documentoIdentidad
    ) {
      const persona = new Persona(req.body)
      await persona.save()
      return res.json({ data: 'Listo' })
    } else {
      return res
        .status(400)
        .json({ error: 'La persona ya existe y está registrada' })
    }
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}

// propietario: IdPersona[]
// administrador: IdPersona[]
// estandar: IdPersona[]
// visitante: IdPersona[]

export const asignarEnEmpresa = async (
  persona: IPersona,
  empresa: IEmpresa,
  nivel: NivelAsignacion
) => {
  try {
    const {
      propietario = [],
      administrador = [],
      estandar = [],
      visitante = [],
    } = empresa.usuarios

    propietario.filter((_id) => _id !== persona._id)
    administrador.filter((_id) => _id !== persona._id)
    estandar.filter((_id) => _id !== persona._id)
    visitante.filter((_id) => _id !== persona._id)

    empresa.usuarios = {
      propietario,
      administrador,
      estandar,
      visitante,
    }

    if (!empresa.usuarios[nivel]) {
      empresa.usuarios[nivel] = []
    }
    const isAdded = empresa.usuarios[nivel].find((_id) => _id == persona._id)
    if (!isAdded) {
      empresa.usuarios[nivel].push(persona._id)
    }

    const asignamientos = persona.asignamientos.filter(
      (asignamiento) => asignamiento._id !== empresa._id
    )

    persona.asignamientos = asignamientos

    persona.asignamientos.push({ tipo: 'Empresa', _id: empresa._id })

    await empresa.save()
    await persona.save()

    return true
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getPersonaById = async (_id: string) => Persona.findById(_id)

export const asignarEnEmpresaConIdPersona = async (
  _id: string,
  empresa: IEmpresa,
  nivel: NivelAsignacion
) => {
  try {
    const persona = await getPersonaById(_id)
    if (persona) {
      return await asignarEnEmpresa(persona, empresa, nivel)
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Registrar una persona
 *
 * Asignar una persona durante el registro de una empresa
 * Asignar una persona durante la edición de usuarios de una empresa
 *
 *
 */

/*
if(existePersona) {
  empresa.usuarios
  const yaEsPropietario = await Empresa.findOne({
    'usuarios.propietario': persona._id,
  })
  const yaEsAdministrador = await Empresa.findOne({
    'usuarios.administrador': persona._id,
  })
  const yaEsEstandar = await Empresa.findOne({
    'usuarios.estandar': persona._id,
  })
  const yaEsVisitante = await Empresa.findOne({
    'usuarios.visitante': persona._id,
  })
  if (yaAsignado) {
    const { tipo } = asignamiento
  }
} else {
  await persona.save()
}
*/
