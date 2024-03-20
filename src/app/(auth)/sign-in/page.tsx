'use client'
import { Icons } from '@/components/Icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator
} from '@/lib/validators/account-credentials-validator'
import { trpc } from '@/trpc/client'
import { ZodError } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { error } from 'console'

const Page = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [eyeIconOff, setEyeIconOff] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const isSeller = searchParams.get('as') === 'seller'
  const origin = searchParams.get('origin')

  const continueAsSeller = () => {
    router.push('?as=seller')
  }
  const continueAsBuyer = () => {
    router.replace('/sign-in', undefined)
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator)
  })

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success('Bienvenido')
      router.refresh()

      if (origin) {
        router.push(`/${origin}`)
        router.refresh()
        return
      }
      if (isSeller) {
        router.push(`/sell`)
        return
      }
      router.push(`/`)
      router.refresh()
    },

    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        toast.error('Credenciales incorrectas')
      }
    }
  })

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password })
  }
  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Link href='/'>
              <Icons.logo className='h-[15rem] transition-all ease-out 0.3 hover:scale-110 inline-block' />
            </Link>
            <h1 className='text-2xl font-bold'>Inicia sesión</h1>
            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'font-semibold, gap-1.5'
              })}
              href='/sign-up'
            >
              No tienes una cuenta? Registrate
              <ArrowRight className='h-4 w-4 hover:translate-x-[1px] transition-all ease-in 0.3' />
              {/* todo: on hover link, move arrow */}
            </Link>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.email
                    })}
                    placeholder='ejemplo@correo.com'
                  />
                  {errors?.email && (
                    <p className='text-red-500 text-sm font-semibold'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='contraseña'>Contraseña</Label>
                  <div className='relative'>
                    <Input
                      {...register('password')}
                      className={cn({
                        'focus-visible:ring-red-500': errors.password
                      })}
                      placeholder='Contraseña'
                      type={showPassword ? 'text' : 'password'}
                    />
                    <div
                      className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeIcon className='h-6 w-6 text-gray-400 transition-all ease-in 0.3 hover:text-gray-500' />
                      ) : (
                        <EyeOffIcon className='h-6 w-6 text-gray-400 transition-all ease-in 0.3 hover:text-gray-500' />
                      )}
                    </div>
                  </div>
                  {errors?.password && (
                    <p className='text-red-500 text-sm font-semibold'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button className='font-semibold'>
                  {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                </Button>
              </div>
            </form>
            <div className='relative'>
              <div
                aria-hidden='true'
                className='absolute inset-0 flex items-center'
              >
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  O
                </span>
              </div>
            </div>
            {isSeller ? (
              <Button onClick={continueAsBuyer}>Continua como comprador</Button>
            ) : (
              <Button onClick={continueAsSeller}>
                Continua como administrador{' '}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
