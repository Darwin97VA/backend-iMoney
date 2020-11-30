import { Request } from 'express'
import { IPerfil } from '../models/Perfil'
import { IPersona } from '../models/Persona'
import { IUsuario } from '../models/Usuario'

export type TokenData = {
  ID_USUARIO?: string // _id de Usuario
}

export interface IRequestUser extends Request {
  __data?: {
    usuario?: IUsuario
    persona?: IPersona
    perfil?: IPerfil
  }
}
