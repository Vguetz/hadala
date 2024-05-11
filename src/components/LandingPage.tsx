import Link from 'next/link'
import ImageSlider from './ImageSlider'

export const LandingPage = () => {
  const imageArray = ['/hadalaprueba.jpeg', '/hadalaprueba.jpeg']

  return (
    <div>
      <div className='text-center w-full block p-4 justify-center align-middle'>
        <div className='rounded-sm bg-red-200/30 my-4 p-2 overflow-hidden'>
          <p className='uppercase font-normal text-muted-foreground animate-marquee'>
            ¡oferta inaugración! 10% de descuento en tus compras con
            transferencia bancaria
          </p>
        </div>
        <ImageSlider urls={imageArray} />
      </div>
    </div>
  )
}
