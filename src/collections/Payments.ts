import { CollectionConfig } from 'payload/types'

export const Payments: CollectionConfig = {
  slug: 'Pagos',
  admin: {
    useAsTitle: 'Tus pagos',
    description: 'Aqui puedes quien ha pagado y quien no en Hadala'
  },
  access: {
    read: ({ req }) => req.user.role === 'admin',
    create: ({ req }) => req.user.role === 'admin',
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin'
  },
  fields: [
    {
      name: 'productoPagado',
      label: 'Producto Pagado',
      type: 'checkbox',
      access: {
        read: ({ req }) => req.user.role === 'admin',
        create: () => false,
        update: ({ req }) => req.user.role === 'admin'
      },
      required: true
    },
    {
      name: 'email',
      type: 'text',
      admin: {
        readOnly: true
      }
    },
    {
      name: 'nombre',
      type: 'text',
      required: true
    },
    {
      name: 'telefono',
      type: 'text',
      required: true
    },
    {
      name: 'direccion',
      type: 'text',
      required: true
    },
    {
      name: 'producto',
      type: 'text',
      required: true
    },
    {
      name: 'dinero',
      type: 'number',
      required: true
    },
    {
      name: 'orderId',
      type: 'text',
      required: true,
      defaultValue: () => Math.random().toString(36).substring(2, 10)
    }
  ]
}
