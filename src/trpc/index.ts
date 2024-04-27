import { z } from 'zod'
import { authRouter } from './auth-router'
import { publicProcedure, router } from './trpc'
import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload'

export const appRouter = router({
  auth: authRouter,

  getSearchBarProducts: publicProcedure
    .input(
      z.object({
        query: z.string()
      })
    )
    .query(async ({ input }) => {
      const { query } = input

      const payload = await getPayloadClient()

      type Product = {
        id: string
        name: string
        images: { image: string }[] // Esta es una suposición, ajusta según la estructura real de tus datos
      }

      // Llama a payload.find() con el tipo especificado
      const { docs: products } = await payload.find({
        collection: 'products', // Asegúrate de que la colección sea "products"
        where: {
          name: {
            contains: query
          }
        }
      })

      return products
    }),

  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input
      const { sort, limit, ...queryOpts } = query

      const payload = await getPayloadClient()

      const parsedQueryOpts: Record<string, { equals: string }> = {}

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value
        }
      })

      const page = cursor || 1

      const {
        docs: items,
        hasNextPage,
        nextPage
      } = await payload.find({
        collection: 'products',
        where: {
          approvedForSale: {
            equals: 'approved'
          },
          ...parsedQueryOpts
        },
        sort,
        depth: 1,
        limit,
        page
      })

      return {
        items,
        nextPage: hasNextPage ? nextPage : null
      }
    })
})

export type AppRouter = typeof appRouter
