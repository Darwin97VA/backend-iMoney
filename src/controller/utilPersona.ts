import Persona from '../models/Persona'

export const getPersonaById = async (_id: string) => Persona.findById(_id)
