import { Request, Response } from 'express'
import { IEmpresa, IEmpresaRequest } from '../interfaces/Empresa'
import { Identidad } from '../interfaces/Persona'
import { Usuarios, UsuariosDetalle, NivelAsignacion } from '../interfaces/Utils'
import Persona from '../models/Persona'
import Empresa from '../models/Empresa'
import { RequestDataPersona } from './interfaces'
import { asignarEnEmpresaConIdPersona } from './persona'

const getIdsPersonas = async (identidades: Identidad[]): Promise<string[]> => {
  const ids = []
  for await (let identidad of identidades) {
    const { documentoIdentidad } = identidad
    let persona
    const existePersona = await Persona.findOne({
      'identidad.documentoIdentidad': documentoIdentidad,
    })

    if (!existePersona) {
      const _persona = new Persona({ identidad })
      persona = await _persona.save()
    } else {
      persona = existePersona
    }

    ids.push(persona?._id)
  }
  return ids
}

const siNoExistenUsuariosCrearlos = async (
  usuarios: UsuariosDetalle
): Promise<Usuarios> => {
  const {
    propietario = [],
    administrador = [],
    estandar = [],
    visitante = [],
  } = usuarios

  const idsPropietario = await getIdsPersonas(propietario)
  const idsAdministrador = await getIdsPersonas(administrador)
  const idsEstandar = await getIdsPersonas(estandar)
  const idsVisitante = await getIdsPersonas(visitante)

  return {
    propietario: idsPropietario,
    administrador: idsAdministrador,
    estandar: idsEstandar,
    visitante: idsVisitante,
  }
}

const sincronizarAsignacionEnPersona = async (
  empresa: IEmpresa,
  usuarios: Usuarios
) => {
  try {
    const { propietario, administrador, estandar, visitante } = usuarios

    for await (let idPersona of propietario) {
      const result = await asignarEnEmpresaConIdPersona(
        idPersona,
        empresa,
        NivelAsignacion.propietario
      )
      if (!result) return result
    }
    for await (let idPersona of administrador) {
      const result = await asignarEnEmpresaConIdPersona(
        idPersona,
        empresa,
        NivelAsignacion.administrador
      )
      if (!result) return result
    }
    for await (let idPersona of estandar) {
      const result = await asignarEnEmpresaConIdPersona(
        idPersona,
        empresa,
        NivelAsignacion.estandar
      )
      if (!result) return result
    }
    for await (let idPersona of visitante) {
      const result = await asignarEnEmpresaConIdPersona(
        idPersona,
        empresa,
        NivelAsignacion.visitante
      )
      if (!result) return result
    }

    return true
  } catch (error) {
    console.error(error)
    return null
  }
}

interface RequestRegistro extends Request, RequestDataPersona {
  body: IEmpresaRequest
}
export const registrarEmpresa = async (req: RequestRegistro, res: Response) => {
  try {
    if (req.__data) {
      const { persona } = req.__data

      if (persona) {
        const { ruc } = req.body

        const existeEmpresa = await Empresa.findOne({ ruc })

        if (existeEmpresa) {
          return res
            .status(400)
            .json({ error: 'La empresa ya está registrada' })
        } else {
          const __usuarios: UsuariosDetalle = {
            ...req.body.usuarios,
            propietario: req.body.representanteLegal.map((RL) => RL.identidad),
          }
          const usuarios = await siNoExistenUsuariosCrearlos(__usuarios)
          const _empresa = new Empresa({
            ...req.body,
            representanteLegal: req.body.representanteLegal.map((RL, index) => {
              console.log('idPropietario', usuarios.propietario[index])
              return {
                _id: usuarios.propietario[index],
                ...RL,
              }
            }),
            usuarios,
          })
          console.log(usuarios)

          const empresa = await _empresa.save()
          const sincronizacion = await sincronizarAsignacionEnPersona(
            empresa,
            usuarios
          )

          if (sincronizacion) {
            return res.json({ data: 'Registro completado.' })
          } else {
            return res.json({
              data: 'Registro completado',
              error: 'Hubo un error en la sincronización',
            })
          }
        }
      }
    }
    return res.status(400).json({ error: 'La persona registrante no existe.' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}

export const getEmpresaById = (_id: string) => Empresa.findById(_id)
