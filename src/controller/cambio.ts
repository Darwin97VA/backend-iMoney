import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { RequestDataPersona } from './interfaces'
import { IOperacionCambio, EstadoCambio } from '../interfaces/Servicio/Cambio'
import Cambio from '../models/Servicio/Cambio'
import { Asignamiento } from '../interfaces/Utils'
import OperacionCambio from '../models/Operacion/Cambio'

interface BodyExecCambio extends IOperacionCambio {
  asignamiento: Asignamiento
}
interface ExecCambio extends RequestDataPersona {
  body: BodyExecCambio
}
export const execCambio = async (req: ExecCambio, res: Response) => {
  try {
    const persona = req.__data?.persona
    const operacion = req.body
    const momento = new Date()
    operacion.idOperacion = momento.getTime()

    const cambioData = await Cambio.findOne({ moneda: operacion.data.moneda })

    if (cambioData && persona) {
      operacion.data = cambioData
      operacion.operacion = {
        ...operacion.operacion,
        persona: persona._id,
        momento,
      }
      const mensaje = operacion.historia[0].mensajeDePersona

      if (mensaje) {
        operacion.historia = [
          {
            estado: EstadoCambio.Iniciado,
            momento,
            mensajeDePersona: {
              ...mensaje,
              momento,
            },
          },
        ]
      } else {
        operacion.historia = []
      }
      const nuevaOperacion = new OperacionCambio(operacion)
      await nuevaOperacion.save()

      return res.json({ data: operacion })
    }

    return res
      .status(400)
      .json({ error: 'No tiene permisos para este procedimiento.' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error })
  }
}

export const getCambioById = async (req: Request, res: Response) => {
  try {
    const cambio = await Cambio.findById(req.body.cambioId)
    return res.json({ data: cambio })
  } catch (error) {
    console.error(error)
    return res.status(404).json({ error })
  }
}

export const getCambios = async (req: Request, res: Response) => {
  try {
    const Cambios = req.body.Cambios
    let data
    if (Array.isArray(Cambios)) {
      if (Cambios.length) {
        data = await Cambio.find({
          _id: { $in: Cambios.map(mongoose.Types.ObjectId) },
        })
      }
    } else {
      data = await Cambio.find({})
    }
    return res.json({ data })
  } catch (error) {
    console.error(error)
    return res.status(404).json({ error })
  }
}
