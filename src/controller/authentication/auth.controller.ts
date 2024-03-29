import { Request, Response } from 'express'

import tryCatch from '../../core/trycatch'
import { Auth } from './auth.model'
import { User } from '../../schema/schema'

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Validation
    // if (!email) {
    //   return res.status(400).send({ message: 'Email  required' })
    // }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).send({ message: 'Email already taken' })
    }

    const newUser = await User.create({ email })
    console.log(newUser)
    const newAuth = await Auth.create({ email, password, userId: newUser._id })
    console.log(newAuth)
    return res.status(201).send({ newUser, newAuth }) // 201: Resource created
  } catch (error) {
    console.error('Error signing up:', error)
    return res.status(500).send({ message: 'Internal server error' })
  }
}

// const { email, password, name, phone } = req.body
// const isUser = await email
// if (isUser.length !== 0) return res.send({ message: 'Email already taken' })

// const userPayload = { name, email, emailVerified: false, phone, membership: 'Free', role: 'User' }
// const createNewUser = await createUser(userPayload)
// const authPayload = { email, password, userId: createNewUser._id }
// const createNewAuth = await createAuth(authPayload)
// return res.send({ createNewUser, createNewAuth })

// export const login = tryCatch(async (req: Request, res: Response) => {
//   const data = await reqValidate(req, AuthValidation.login)
//   if (!data.status) return res.json(data.message)
//   const { email, password } = req.body
//   const isAuth = await getAuthByEmail(email)
//   if (isAuth.length == 0) return res.send({ message: 'Email is incorrect' })
//   const isValidPass = CryptoFactory().comparePassword(password, isAuth[0].password)
//   if (!isValidPass) return res.send({ message: 'Password is incorrect' })
//   if (!ID(isAuth[0].userId)) return res.send({ message: 'user ID incorrect' })
//   const id = new mongoose.Types.ObjectId(isAuth[0].userId)
//   const user = await getUserById(id)
//   if (!user) return res.send({ message: 'user not found' })
//   const token = await generateAuthTokens(user._id, user.role)
//   const updateAuth = await updateAuthById(isAuth[0]._id, { token })
//   return res.send({ message: 'Login successful', data: updateAuth })
// })

// export const resetAuthPass = tryCatch(async (req: Request, res: Response) => {
//   const data = await reqValidate(req, AuthValidation.resetAuthPass)
//   if (!data.status) return res.json(data.message)
//   const { password, newPassword } = req.body
//   if (!ID(req.params.id)) return res.send({ message: 'user ID not found' })
//   const userId = new mongoose.Types.ObjectId(req.params.id)
//   const auth = await getAuthByUserId(userId)
//   if (!auth) return res.send({ message: 'user not found' })
//   const isValidPass = CryptoFactory().comparePassword(password, auth[0].password)
//   if (!isValidPass) return res.send({ message: 'Password is incorrect' })
//   const updatePass = await updateAuthById(auth[0]._id, {
//     password: CryptoFactory().encryptedPassword(newPassword),
//   })
//   return res.status(200).json({ message: 'Password updated successfully', updatePass })
// })

// export const getAuthAll = tryCatch(async (req: Request, res: Response) => {
//   const data = await reqValidate(req, AuthValidation.getAuthAll)
//   if (!data.status) return res.json(data.message)
//   const { skip, limit, sort } = req.query
//   const auth = await getAllAuth(skip as string, limit as string, sort as string)
//   if (auth.length < 0) return res.status(200).json({ message: 'No auth found', data: auth })
//   return res.status(200).json({ message: 'Auth fetch successfully', data: auth })
// })
