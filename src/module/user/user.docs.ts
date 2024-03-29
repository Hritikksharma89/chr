export const UserDocs = {
  paths: {
    '/users': {
      get: {
        summary: 'Get all users',
        parameters: [
          {
            name: 'name',
            in: 'query',
            description: 'Filter users by name',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'email',
            in: 'query',
            description: 'Filter users by email',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'role',
            in: 'query',
            description: 'Filter users by role',
            schema: {
              type: 'string',
              enum: ['USER', 'ADMIN'], // Add more roles if needed
            },
          },
          {
            name: 'dateOfBirth',
            in: 'query',
            description: 'Filter users by date of birth',
            schema: {
              type: 'string',
              format: 'date-time',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A list of users',
            content: {
              'application/json': {
                example: [
                  {
                    id: '1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    isEmailVerified: true,
                    phoneNumber: 1234567890,
                    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    role: 'USER',
                    dateOfBirth: '1990-01-01T00:00:00Z',
                    preferredLanguage: 'en',
                    events: [],
                    churches: [],
                    profileImageUrl: 'http://example.com/profile.jpg',
                  },
                ],
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
      post: {
        summary: 'Create a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User created successfully',
            content: {
              'application/json': {
                example: {
                  id: '2',
                  name: 'Jane Smith',
                  email: 'jane@example.com',
                  isEmailVerified: false,
                  phoneNumber: null,
                  biography: null,
                  role: 'USER',
                  dateOfBirth: '1995-02-15T00:00:00Z',
                  preferredLanguage: 'en',
                  events: [],
                  churches: [],
                  profileImageUrl: null,
                },
              },
            },
          },
          '400': {
            description: 'Error creating user',
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Get user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the user',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Successfully retrieved user by ID',
          },
          '404': {
            description: 'User not found',
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
      put: {
        summary: 'Update user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the user',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User updated successfully',
          },
          '400': {
            description: 'Bad request',
          },
          '404': {
            description: 'User not found',
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
      delete: {
        summary: 'Delete user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the user',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'User deleted successfully',
          },
          '404': {
            description: 'User not found',
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
}
