'use client'

import { trpc } from '@/trpc/client'
import { Loader2, XCircle } from 'lucide-react'
import Image from 'next/image'
import { Icons } from './Icons'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

interface VerifyEmailProps {
  token: string
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token
  })

  if (isError) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <XCircle className='w-10 h-10 text-red-500' />
        <h3 className='font-semibold text-xl'>Hubo un problema</h3>
        <p className='text-muted-foreground text-sm'>
          Este token no es valido o está expirado. Por favor, intenta de nuevo.
        </p>
      </div>
    )
  }
  if (data?.success) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
          <Icons.verification className='fill' />
        </div>
        <h3 className='font-semibold text-2xl'>Todo listo!</h3>
        <p className='text-xl text-center font-light text-muted-foreground'>
          Tu email ha sido verificado correctamente.
        </p>
        <Link href='/sign-in'>
          <p className={buttonVariants({ className: 'mt-4' })}>Inicia Sesión</p>
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='w-10 h-10 animate-spin text-zinc-300' />
        <h3 className='font-semibold text-xl'>Verificando...</h3>
        <p className='text-muted-foreground text-sm'>
          Esto no debería tomar mucho tiempo.
        </p>
      </div>
    )
  }
}

export default VerifyEmail
