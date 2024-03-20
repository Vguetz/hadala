import { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}''>Verifica tu cuenta</a>`
      }
    }
  },
  access: {
    read: () => true,
    create: () => true
  },
  fields: [
    {
      name: 'role',
      defaultValue: 'user',
      required: true,
      //TODO: admin user required
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
