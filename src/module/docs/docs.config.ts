import { SwaggerDefinition } from 'swagger-jsdoc'
import { UserDocs } from '../user/user.docs'
import { AuthDocs } from '../auth/auth.docs'
export const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'Church Management',
    version: '1.0.0',
    description: 'API endpoints',
  },
}

export const config: SwaggerDefinition = {
  ...swagger,
  paths: { ...UserDocs.paths, ...AuthDocs.paths },
}
