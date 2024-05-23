import { CollectionConfig } from 'payload/types'

export const TransferTest: CollectionConfig = {
  slug: 'Transferencias_Hadala',
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
      name: 'items',
      label: 'Items',
      type: 'array',
      required: true,
      labels: {
        singular: 'Item',
        plural: 'Items'
      },
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'item',
          label: 'Item',
          type: 'text',
          required: true
        }
      ]
    },
    {
      name: 'name',
      label: 'Nombre',
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
      name: 'direccion',
      label: 'Dirección',
      type: 'text',
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
