import { Request } from 'express'
import { IEmpresa } from 'interfaces/Empresa'
import { IAdminDocument } from 'models/Admin'
import { IPersonaDocument } from '../models/Persona'

export type TokenData = {
  ID_PERSONA?: string // _id de Usuario
  ASIGNAMIENTO?: {
    ID_PERSONA: string
    TIPO: string // Empresa | Persona
  }
}

export interface RequestDataPersona extends Request {
  __data?: {
    persona?: IPersonaDocument
    asignamiento?: IPersonaDocument | IEmpresa
  }
}

export type TokenAdmin = {
  ID_ADMIN?: string
}

export interface RequestDataAdmin extends Request {
  __data?: {
    admin?: IAdminDocument
  }
}
