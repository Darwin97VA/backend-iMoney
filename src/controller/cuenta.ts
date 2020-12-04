import { Request, Response } from 'express'
import Empresa from '../models/Empresa'
import Persona, { IPersonaDocument } from '../models/Persona'
import { ICuenta, IdCuenta } from '../interfaces/Cuenta'
import { Asignamiento } from '../interfaces/Utils'
import { RequestDataPersona } from './interfaces'
import Cuenta from '../models/Cuenta'
import { IdMensaje } from '../interfaces/Mensaje'

interface CrearCuentaRequest extends Request, RequestDataPersona {
  body: {
    asignamiento: Asignamiento
    cuenta: ICuenta
  }
}
export const crearCuenta = async (req: CrearCuentaRequest, res: Response) => {
  try {
    const { asignamiento, cuenta } = req.body
    if (asignamiento && cuenta && req.__data) {
      const _cuenta = new Cuenta(cuenta)
      const cuentaCreada = await _cuenta.save()

      if (asignamiento.tipo === 'Persona') {
        const persona = await Persona.findById(asignamiento._id)
        if (persona?.cuentas) {
          persona.cuentas.push(cuentaCreada._id)
          await persona?.save()
        }
      } else {
        const empresa = await Empresa.findById(asignamiento._id)
        if (empresa?.cuentas) {
          empresa?.cuentas.push(cuentaCreada._id)
        }
        await empresa?.save()
      }
      return res.json({ data: cuentaCreada })
    }
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}

export const getCuentaById = (_id: string) => Cuenta.findById(_id)
