import { getPayloadClient } from '../../../get-payload'

export async function search(query: string): Promise<string[]> {
  try {
    const response = await fetch(`/api/search?query=${query}`)

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error('Error al obtener los datos')
    }

    const payload = await getPayloadClient()

    // Aquí deberías buscar en la colección de productos del payload
    const data = await response.json() // Declare and assign the resolved value from the fetch response
    const { docs: products } = await payload.find({
      collection: 'products',
      where: {
        name: {
          contains: query
        }
      }
    })

    const [product] = products

    return [product.name]
  } catch (error) {
    console.error('Error:', error)
    return [] // Opcionalmente puedes lanzar el error para manejarlo en otro lugar
  }
}
