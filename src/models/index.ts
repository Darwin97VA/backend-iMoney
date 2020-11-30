import mongoose from 'mongoose'
import config from '../config'

const { DB_HOST, DB_PORT, DB_NOMBRE } = config

const URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NOMBRE}`

export default () =>
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
