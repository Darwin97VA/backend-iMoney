import express, { Router, Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import bearerToken from 'express-bearer-token'
import { resolve } from 'path'
import routes from './routes'

const router = Router()

router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(bearerToken())
router.use(express.static(path.resolve(__dirname, '..', 'public')))

router.use('/api', routes)

router.get('/', (_req: Request, res: Response) => {
  const html = resolve(__dirname, '..', 'public', 'index.html')
  res.sendFile(html)
})

router.get('*', (_req: Request, res: Response) => {
  const html = resolve(__dirname, '..', 'public', 'index.html')
  res.sendFile(html)
})

export default router
