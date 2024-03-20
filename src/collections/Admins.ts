import { CollectionConfig } from 'payload/types'

export const Admins: CollectionConfig = {
  slug: 'admins',
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}''>Verifica tu cuenta</a>`
      }
    }
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin',
    create: ({ req }) => req.user?.role === 'admin'
  },
  fields: [
    {
      name: 'role',
      defaultValue: 'admin',
      required: true,
      type: 'select',
      options: [
        {
          label: 'Administrador',
          value: 'admin'
        },
        {
          label: 'Usuario',
          value: 'user'
        }
      ]
    }
  ]
}
