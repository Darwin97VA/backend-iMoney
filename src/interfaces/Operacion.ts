import { MongooseDocument } from 'mongoose'

export type IdOperacion = MongooseDocument['_id']
export interface IOperacion {
  _id: IdOperacion
}
