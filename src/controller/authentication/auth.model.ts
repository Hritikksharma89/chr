import mongoose from 'mongoose';

import { IAuth } from './auth.interface';
import { authSchema } from './auth.schema';

export const Auth = mongoose.models.auth || mongoose.model<IAuth>('auth', authSchema);
