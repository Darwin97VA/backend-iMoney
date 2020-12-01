import mongoose from 'mongoose'
import config from '../config'

const {
  DB_PROTOCOL,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_SETTINGS,
} = config

const URL = `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}${DB_SETTINGS}`

export default () =>
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
