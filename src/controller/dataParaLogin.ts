import { IdArchivo } from 'interfaces/Archivo'
import { IdCuenta } from '../interfaces/Cuenta'
import { IEmpresa } from '../interfaces/Empresa'
import { IdMensaje } from '../interfaces/Mensaje'
import { Identidad, IdPersona, IPersona } from '../interfaces/Persona'
import { IdOperacionCambio } from '../interfaces/Servicio/Cambio'
import { Asignamiento, Usuarios } from '../interfaces/Utils'
import { getArchivosByIdPersonaAndPerfil } from './archivo'
import { getCuentaById } from './cuenta'
import { getEmpresaById } from './empresa'
import { getMensajesByIdPersonaAndPerfil } from './mensajes'
import { getPersonaById } from './persona'

const getPersonaById_SinPass = async (_id: string) => {
  const persona = await getPersonaById(_id)

  if (persona && typeof persona === 'object') {
    const _persona: PersonaDataPublica = {
      _id: persona._id,
      identidad: persona.identidad,
      asignamientos: persona.asignamientos,
      usuarios: persona.usuarios,
      mensajes: persona.mensajes,
      archivos: persona.archivos,
    }

    return _persona
  }
  return null
}

export const getPersonasFrom_PerfilUsuarios = async (
  sujeto: IEmpresa | IPersona
) => {
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

export type PersonaDataPublica = {
  _id: any
  identidad: Identidad
  asignamientos: Asignamiento[]
  usuarios?: Usuarios
  archivos: IdArchivo[]
  mensajes: IdMensaje[]
  operaciones?: {
    cambios: IdOperacionCambio[]
    // inversiones?: IdInversion[]
    // credito?: IdCredito[]
  }
  cuentas?: IdCuenta[]
} | null

// type PersonaDataPublica = {
//   _id: any
//   identidad: Identidad
//   asignamientos: Asignamiento[]
// } | null

export const getSujetosDeAsignaciones = async (persona: IPersona) => {
  try {
    const _empresasId = persona.asignamientos
      .filter((asig) => asig.tipo === 'Empresa')
      .map((asig) => asig._id)
    const _personasId = persona.asignamientos
      .filter((asig) => asig.tipo === 'Persona')
      .map((asig) => asig._id)

    let empresasEnDondeEstoy =
      (await Promise.all(_empresasId.map(getEmpresaById)))?.filter(
        (e) => !!e
      ) || []
    let personasEnDondeEstoy =
      (await Promise.all(_personasId.map(getPersonaById)))?.filter(
        (e) => !!e
      ) || []

    const peronas1 = (
      await Promise.all(
        empresasEnDondeEstoy.map((e) => {
          if (e) {
            return getPersonasFrom_PerfilUsuarios(e)
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
            return getPersonasFrom_PerfilUsuarios(e)
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
          return String(_p._id) == String(_persona._id)
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
        const añadida = EmpresasNoDuplicadas.find(
          (_e) => _e && String(_e._id) == String(_em._id)
        )

        if (!añadida) {
          EmpresasNoDuplicadas.push(_em)
        }
      }
    })
    console.log('EmpresasNoDuplicadas', EmpresasNoDuplicadas)
    return { Personas: PersonasNoDuplicadas, Empresas: EmpresasNoDuplicadas }
  } catch (error) {
    console.error(error)
    return null
  }
}

// Al obtener toda la data para un usuario
// 1) Se le dará todas las cuentas de los perfiles al que le pertenece
// 2) Se le dará todas las operaciones de los perfiles al que le pertenece
// 3) Se le dará todos los mensajes, QUE ESTE HA ENVIADO, de los perfiles al que le pertenece
// 4) El filtro del item anterior (3) no se aplicará a los propietarios (3er sprint)

export const getAllDataForPersona = async (persona: IPersona) => {
  const perfiles = await getSujetosDeAsignaciones(persona)
  if (perfiles) {
    const { Personas, Empresas } = perfiles

    const Mensajes1 = await Promise.all(
      Personas.map((_persona) => {
        if (_persona) {
          return getMensajesByIdPersonaAndPerfil(persona._id, _persona)
        }
      })
    )

    const Mensajes2 = await Promise.all(
      Empresas.map((_emp) => {
        if (_emp) {
          return getMensajesByIdPersonaAndPerfil(persona._id, _emp)
        }
      })
    )
    const Mensajes = getDataNoRepit_Id([...Mensajes1, ...Mensajes2])

    const Archivos1 = await Promise.all(
      Personas.map((_persona) => {
        if (_persona) {
          return getArchivosByIdPersonaAndPerfil(persona._id, _persona)
        }
      })
    )
    const Archivos2 = await Promise.all(
      Empresas.map((_emp) => {
        if (_emp) {
          return getArchivosByIdPersonaAndPerfil(persona._id, _emp)
        }
      })
    )
    const Archivos = [...Archivos1, ...Archivos2]

    const Cuentas1 = Personas.map((_persona) => _persona?.cuentas || []).flat()
    const Cuentas2 = Empresas.map((_emp) => _emp?.cuentas || []).flat()
    const Cuentas = [...Cuentas1, ...Cuentas2]

    const Operaciones1 = Personas.map(
      (_persona) => _persona?.operaciones || []
    ).flat()
    const Operaciones2 = Empresas.map((_emp) => _emp?.operaciones || []).flat()
    const Operaciones = [...Operaciones1, ...Operaciones2]

    return { Operaciones, Cuentas, Mensajes, Personas, Empresas, Archivos }
  }
}

const getDataNoRepit_Id = (data: { _id: string }[]) => {
  const dataNoRepetida: { _id: string }[] = []
  data.forEach((d) => {
    const added = dataNoRepetida.find((dn) => String(dn._id) == String(d._id))
    if (!added) {
      dataNoRepetida.push(d)
    }
  })
  return dataNoRepetida
}
