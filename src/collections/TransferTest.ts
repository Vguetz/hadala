import { CollectionConfig } from 'payload/types'

export const TransferTest: CollectionConfig = {
  slug: 'TransferenciasTest',
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
      name: 'transferId',
      label: 'Transfer ID',
      access: {
        update: ({ req }) => req.user.role === 'superadmin'
      },
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
      name: 'cartTotal',
      access: {
        update: ({ req }) => req.user.role === 'superadmin'
      },
      label: 'Total del carrito',
      type: 'number',
      required: true
    },
    {
      name: 'isTransfered',
      label: 'Transferido',
      type: 'checkbox',
      defaultValue: false,
      required: false
    }
  ]
}
