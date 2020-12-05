import { Request, Response, Router } from 'express'
import { getMensajesByIdPersonaAndPerfil } from '../../controller/mensajes'
import { RequestDataPersona } from '../../controller/interfaces'
import { getSujetoByAsignamiento } from '../../controller/dataParaLogin'

const router = Router()

const controller = async (req: RequestDataPersona, res: Response) => {
  try {
    const { body, __data } = req
    const { asignamiento } = body

    if (__data?.persona?._id && asignamiento) {
      const perfil = getSujetoByAsignamiento(asignamiento)
      const mensajes = await getMensajesByIdPersonaAndPerfil(
        __data.persona._id,
        perfil
      )
      return res.json({ data: mensajes })
    }
    return res.status(404).json({ error: 'Falta datos' })
  } catch (error) {
    console.error(error)
    return res.status(404).json({ error })
  }
}

router.post('/', controller)

export default router
