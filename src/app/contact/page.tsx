import ImageSlider from '@/components/ImageSlider'
import { LandingPage } from '@/components/LandingPage'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  const imageArray = ['/hada3.jpg', '/hada2.jpg', '/hada1.jpg']
  return (
    <div>
      <h1 className='text-6xl font-light text-center my-2'>Contacto</h1>
      <div className='text-center'>
        <p className='text-lg font-light'>
          ¿Tienes alguna duda o comentario? ¡Escríbenos!
        </p>
        <p className='text-lg font-light'>
          Estamos para ayudarte en lo que necesites.
        </p>
        <p>Telefono: 094 418 546</p>
      </div>
      <div className='max-w-2xl flex items-center justify-center mx-auto '>
        <ImageSlider urls={imageArray} />
      </div>
    </div>
  )
}

export default Page
