import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'
import path from 'path'
import { Users } from './collections/Users'

import dotenv from 'dotenv'
import { Productos } from './collections/Products/Products'
import { Media } from './collections/Media'
import { ProductFiles } from './collections/Products/ProductFile'
import { Orders } from './collections/Orders'
import { Admins } from './collections/Admins'
import { Payments } from './collections/Payments'

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [
    Users,
    Productos,
    Media,
    ProductFiles,
    Orders,
    Admins,
    Payments
  ],
  routes: {
    admin: '/sell'
  },
  admin: {
    user: 'admins',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Hadala',
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg'
    }
  },
  rateLimit: {
    max: 2000
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  }
})
