'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useEffect, useState } from 'react'

interface TransferData {
  email: string
  phone: string
  name: string
  address: string
  cartTotal: string
  items: {
    name: string
    price: string
  }[]
  transferId: string
}

export const TransferRedirect = () => {
  const [transferData, setTransferData] = useState<TransferData | null>(null)

  useEffect(() => {
    // Obtener los datos guardados en localStorage
    const propsString = localStorage.getItem('props')
    if (propsString) {
      const props: TransferData = JSON.parse(propsString)
      setTransferData(props)
    }
  }, [])

  return (
    <>
      <MaxWidthWrapper>
        <div className='border-green-600 border-2  items-center p-2 my-4 mx-auto max-w-lg text-center'>
          <h1 className='text-2xl font-bold p-6 '>
            Gracias. Tu pedido ha sido recibido.
          </h1>
        </div>
        <div className='flex'>
          <p className='text-muted-foreground mx-1'>Numero del pedido: </p>
          <p className='text-zinc-700 mx-1'>{transferData?.transferId}</p>
        </div>
        <div>
          <h1 className='text-2xl font-semibold text-center'>
            Datos para Transferencia:
          </h1>
          <div className='my-2 border-2 mx-2 border-zinc-400/50 p-4 font-semibold text-xl '>
            <h2 className='text-lg'>Hadala: </h2>
            <p>
              <span className='text-muted-foreground'>Banco: </span> BROU
            </p>
            <p>
              <span className='text-muted-foreground'>
                Nombre de la cuenta:
              </span>{' '}
              Dayhana Rivas
            </p>
            <p>
              <span className='text-muted-foreground'>Número de cuenta:</span>{' '}
              11045552600001
            </p>
            <p>
              <span className='text-muted-foreground'>
                Código de la cuenta:
              </span>{' '}
              Cája de ahorro en pesos
            </p>
          </div>
        </div>

        <div className='my-2 border-2 border-zinc-400/50 p-4 font-light text-xl '>
          <h1>Datos de tu pedido:</h1>
          <p>Nombre: {transferData?.name}</p>
          <p>Email: {transferData?.email}</p>
          <p>Telefono: {transferData?.phone}</p>
          <p>Dirección: {transferData?.address}</p>
          <p>Total: {transferData?.cartTotal}</p>
        </div>

        <h2 className='text-2xl font-semibold text-center'>Tu pedido:</h2>
        <div className='my-2 border-2 border-zinc-400/50 p-4 font-bold text-xl text-muted-foreground/70 '>
          {transferData?.items.map((item, index) => (
            <div key={index}>
              <p>
                Producto: {item.name} - ${item.price}
                {index !== transferData.items.length - 1}
              </p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default TransferRedirect
