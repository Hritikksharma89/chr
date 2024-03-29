import { z } from 'zod'

const otpFields = {
  otp: z.array(z.string()).optional(),
}

const otpSchema = z.object(otpFields)

const createOtpDto = z.object(otpFields)

const updateOtpDto = z.object({
  ...otpFields,
  otp: z.array(z.string()).optional(),
})

export { otpSchema, createOtpDto, updateOtpDto }
