import { CollectionConfig } from 'payload/types'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'Tus ordenes',
    description: 'Aqui puedes ver tus ordenes en Hadala'
  },
  access: {
    read: ({ req }) => req.user.role === 'admin',
    create: ({ req }) => req.user.role === 'admin',
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin'
  },
  fields: [
    {
      name: '_productoPagado',
      type: 'checkbox',
      access: {
        read: ({ req }) => req.user.role === 'admin',
        create: () => false,
        update: () => false
      },
      admin: {
        hidden: true
      },
      required: true
    },
    {
      name: 'user',
      type: 'relationship',
      admin: {
        hidden: true
      },
      relationTo: 'users',
      required: true
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      hasMany: true
    }
  ]
}
