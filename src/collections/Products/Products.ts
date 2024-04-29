import { CollectionConfig } from 'payload/types'

export const Productos: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'Productos'
  },
  access: {},
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false
      }
    },
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true
    },
    {
      name: 'description',
      label: 'Descripción del producto',
      type: 'textarea'
    },
    {
      name: 'price',
      label: 'Precio en pesos uruguayos',
      type: 'number',
      min: 0,
      max: 100000,
      required: true
    },
    {
      name: 'category',
      label: 'Categoría',
      type: 'select',
      options: [
        'Bandoleras',
        'Billeteras',
        'Bolsos',
        'Carteras',
        'Materas',
        'Mochilas',
        'Monederos',
        'Morrales',
        'Riñoneras'
      ],
      required: true,
      hooks: {
        beforeChange: [
          async ({ data }) => {
            if (data?.category === 'Billeteras') {
              data.subcategoria = 'Merlina'
            } else if (data?.category === 'Bolsos') {
              data.subcategoria = 'Benito'
            } else if (data?.category === 'Carteras') {
              data.subcategoria = 'Chicas'
            } else if (data?.category === 'Mochilas') {
              data.subcategoria = 'Canguro'
            } else if (data?.category === 'Riñoneras') {
              data.subcategoria = 'Aine'
            } else {
              data!.subcategoria = 'Selecciona una categoría primero'
            }
          }
        ]
      }
    },
    {
      name: 'subcategoria',
      label: 'Subcategoría',
      type: 'select',
      options: ['Selecciona una categoría primero'],
      required: true
    },
    {
      name: 'product_files',
      label: 'Archivos del producto',
      type: 'relationship',
      relationTo: 'product_files',
      admin: {
        hidden: true
      },
      hasMany: false
    },
    {
      name: 'approvedForSale',
      label: 'Estado del producto',
      type: 'select',
      defaultValue: 'pending',
      access: {
        create: ({ req }) => req.user.role === 'admin',
        read: ({ req }) => req.user.role === 'admin',
        update: ({ req }) => req.user.role === 'admin'
      },
      options: [
        { label: 'Pendiente', value: 'pending' },
        { label: 'Aprobado', value: 'approved' },
        { label: 'Rechazado', value: 'denied' },
        { label: 'Agotado', value: 'sold-out' }
      ]
    },
    {
      name: 'priceId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false
      },
      type: 'text',
      admin: {
        hidden: true
      }
    },
    {
      name: 'mercadoPagoId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false
      },
      type: 'text',
      admin: {
        hidden: true
      }
    },
    {
      name: 'images',
      type: 'array',
      label: 'Imágenes del producto',
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: 'Imagen',
        plural: 'Imágenes'
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true
        }
      ]
    }
  ]
}
