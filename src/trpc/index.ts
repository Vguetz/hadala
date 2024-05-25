import { z } from 'zod'
import { authRouter } from './auth-router'
import { publicProcedure, router } from './trpc'
import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload'

export const appRouter = router({
  auth: authRouter,

  saveClientInfo: publicProcedure
    .input(
      z.object({
        transferId: z.string(),
        email: z.string().email(),
        cartTotal: z.number().min(0).max(100000),
        items: z.array(z.string()),
        name: z.string(),
        phone: z.string(),
        direccion: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient()

      try {
        const result = await payload.create({
          collection: 'Transferencias_Hadala',
          data: {
            transferId: input.transferId,
            email: input.email,
            cartTotal: input.cartTotal,
            items: input.items.map((item) => ({ item })),
            phone: input.phone,
            direccion: input.direccion,
            name: input.name
          }
        })
        return result
      } catch (error) {
        console.error('Error saving client info:', error)
        throw new Error('An error occurred while saving client info')
      }
    }),

  getSearchBarProducts: publicProcedure
    .input(
      z.object({
        query: z.string(),
        limit: z.number().min(1).max(100).optional()
      })
    )
    .query(async ({ input }) => {
      const { query, limit } = input

      const payload = await getPayloadClient()

      type Product = {
        id: string
        name: string
        images: { image: string }[]
      }

      // Llama a payload.find() con el tipo especificado
      const { docs: products } = await payload.find({
        collection: 'products',
        where: {
          name: {
            contains: query
          }
        },
        limit: limit || 5
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
      const { sort, limit, category, subcategory } = query

      const payload = await getPayloadClient()

      const whereClause: Record<string, any> = {
        approvedForSale: {
          equals: 'approved'
        }
      }

      if (category) {
        whereClause.category = {
          equals: category
        }
      }

      if (subcategory) {
        whereClause.subcategory = {
          equals: subcategory
        }
      }

      const page = cursor || 1

      const {
        docs: items,
        hasNextPage,
        nextPage
      } = await payload.find({
        collection: 'products',
        where: whereClause,
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
