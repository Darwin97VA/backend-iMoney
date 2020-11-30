import { Request } from 'express'
import { IEmpresa } from 'interfaces/Empresa'
import { IPersonaDocument } from '../models/Persona'

export type TokenData = {
  ID_PERSONA?: string // _id de Usuario
}

export interface RequestDataPersona extends Request {
  __data?: {
    persona?: IPersonaDocument
    asignamiento?: IPersonaDocument | IEmpresa
  }
}
