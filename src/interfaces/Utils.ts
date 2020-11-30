import { IdPersona } from './Persona'

// Lo siguiente está pensado para ser asignado
// a una propiedad "usuarios". Ejm:
// interface X {
//    usuarios: Usuarios
// }
export interface Usuarios {
  propietario: IdPersona[]
  administrador: IdPersona[]
  estandar: IdPersona[]
  visitante: IdPersona[]
}

export enum TipoCuenta {
  Ahorro = 'Ahorro',
  Corriente = 'Corriente',
}

export enum TipoMoneda {
  Sol = 'Sol',
  Dolar = 'Dolar',
}

export enum Banco {
  Bcp = 'BCP',
  Interbank = 'Interbank',
  Continental = 'BBVA',
}

export enum Nacionalidad {
  Perú = 'Perú',
  Colombia = 'Colombia',
}

export enum TipoDocumentoIdentidad {
  Dni = 'Dni',
  CarnetExtrajeria = 'Carnet de Extranjeria',
}
