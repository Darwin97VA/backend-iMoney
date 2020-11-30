import { Router, json, urlencoded, Request, Response } from 'express'
import cors from 'cors'
import { resolve } from 'path'
import routes from './routes'

const router = Router()

router.use(cors())
router.use(json())
router.use(urlencoded({ extended: true }))

router.use('/api', routes)

router.get('/', (_req: Request, res: Response) => {
  const html = resolve(__dirname, '..', 'public', 'index.html')
  res.sendFile(html)
})

export default router
