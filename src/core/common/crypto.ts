import CryptoJS from 'crypto-js'
import { env } from '../environment/environment'

interface CryptoFactoryInterface {
  comparePassword: (password: string, dPassword: string) => boolean
  decryptedPassword: (password: string) => string
  encryptedPassword: (password: string) => string
}

const SECRET: string = env.PASS_SECRET!

const CryptoFactory = (): CryptoFactoryInterface => ({
  comparePassword: (password, dPassword) =>
    CryptoJS.AES.decrypt(dPassword, SECRET).toString(CryptoJS.enc.Utf8) === password,

  decryptedPassword: (password) =>
    CryptoJS.AES.decrypt(password, SECRET).toString(CryptoJS.enc.Utf8),

  encryptedPassword: (password) => CryptoJS.AES.encrypt(password, SECRET).toString(),
})

export default CryptoFactory
