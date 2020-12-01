import { IEmpresa } from 'interfaces/Empresa'
import { Identidad, IPersona } from 'interfaces/Persona'
import { Asignamiento } from 'interfaces/Utils'
import { getEmpresaById } from './empresa'
import { getPersonaById } from './persona'

const getPersonaById_SinPass = async (_id: string) => {
  const persona = await getPersonaById(_id)

  if (persona && typeof persona === 'object') {
    const _persona = {
      _id: persona._id,
      identidad: persona.identidad,
      asignamientos: persona.asignamientos,
      usuarios: persona.usuarios,
    }

    return _persona
  }
  return null
}

export const getPersonas = async (sujeto: IEmpresa | IPersona) => {
  try {
    if (sujeto.usuarios) {
      const propietarios = await Promise.all(
        sujeto.usuarios.propietario.map(getPersonaById_SinPass)
      )
      const administradores = await Promise.all(
        sujeto.usuarios.administrador.map(getPersonaById_SinPass)
      )
      const estandares = await Promise.all(
        sujeto.usuarios.estandar.map(getPersonaById_SinPass)
      )
      const visitantes = await Promise.all(
        sujeto.usuarios.visitante.map(getPersonaById_SinPass)
      )

      return [...propietarios, ...administradores, ...estandares, ...visitantes]
    }
    console.log('No existe "usuarios" del sujeto: ', sujeto)
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

type PersonaDataPublica = {
  _id: any
  identidad: Identidad
  asignamientos: Asignamiento[]
} | null

export const getSujetosDeAsignaciones = async (personas: IPersona) => {
  try {
    const _empresasId = personas.asignamientos
      .filter((asig) => asig.tipo === 'Empresa')
      .map((asig) => asig._id)
    const _personasId = personas.asignamientos
      .filter((asig) => asig.tipo === 'Persona')
      .map((asig) => asig._id)

    let empresasEnDondeEstoy =
      (await Promise.all(_empresasId.map(getEmpresaById)))?.filter(
        (e) => !!e
      ) || []
    let personasEnDondeEstoy =
      (await Promise.all(_personasId.map(getEmpresaById)))?.filter(
        (e) => !!e
      ) || []

    const peronas1 = (
      await Promise.all(
        empresasEnDondeEstoy.map((e) => {
          if (e) {
            return getPersonas(e)
          } else {
            return null
          }
        })
      )
    ).filter((p) => !!p)

    const peronas2 = (
      await Promise.all(
        personasEnDondeEstoy.map((e) => {
          if (e) {
            return getPersonas(e)
          } else {
            return null
          }
        })
      )
    ).filter((p) => !!p)

    const TodasPersonas: PersonaDataPublica[] = [
      ...peronas1,
      ...peronas2,
    ].flat()
    const PersonasNoDuplicadas: PersonaDataPublica[] = []

    TodasPersonas.forEach((_persona) => {
      const añadida = PersonasNoDuplicadas.find((_p) => {
        if (_persona && _p) {
          return _p._id === _persona._id
        }
        return false
      })
      if (!añadida) {
        PersonasNoDuplicadas.push(_persona)
      }
    })

    const EmpresasNoDuplicadas: IEmpresa[] = []

    empresasEnDondeEstoy.forEach((_em) => {
      if (_em) {
        const añadida = EmpresasNoDuplicadas.find((_e) => {
          if (_e) {
            return _e._id === _em._id
          }
          return false
        })
        if (!añadida) {
          EmpresasNoDuplicadas.push(_em)
        }
      }
    })

    return { Personas: PersonasNoDuplicadas, Empresas: EmpresasNoDuplicadas }
  } catch (error) {
    console.error(error)
    return null
  }
}
