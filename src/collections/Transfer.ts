import { CollectionConfig } from 'payload/types'

export const Transfer: CollectionConfig = {
  slug: 'Transferencias',
  admin: {
    useAsTitle: 'Transfer',
    description: 'Transferencias de dinero en Hadala'
  },
  access: {
    read: ({ req }) => req.user.role === 'admin',
    create: ({ req }) => req.user.role === 'admin',
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin'
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true
    },
    {
      name: 'phone',
      label: 'Teléfono',
      type: 'text',
      required: true
    },
    {
      name: 'address',
      label: 'Dirección',
      type: 'text',
      required: true
    },
    {
      name: 'items',
      label: 'Items',
      type: 'array',
      required: true,
      labels: {
        singular: 'Item',
        plural: 'Items'
      },
      fields: [
        {
          name: 'name',
          label: 'Nombre',
          type: 'text',
          required: true
        },
        {
          name: 'price',
          label: 'Precio',
          type: 'number',
          min: 0,
          max: 100000,
          required: true
        }
      ]
    },
    {
      name: 'monto',
      label: 'Monto en pesos uruguayos',
      type: 'number',
      min: 0,
      max: 100000,
      required: true
    },
    {
      name: 'transferId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false
      },
      type: 'text',
      admin: {
        hidden: true
      }
    }
  ]
}
