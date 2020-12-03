// import { getPersona } from '../../controller/persona'
import express, { Router } from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
import { create } from '../../controller/archivo'

const router = Router()

export const path_files = path.resolve(__dirname, '..', '..', '..', 'archivos')

router.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
)

router.use(express.static(path_files))
router.post('/:persona/:tipoDonde/:idDonde', /* getPersona(), */ create)

export default router
