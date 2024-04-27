import Link from 'next/link'
import ImageSlider from './ImageSlider'

export const LandingPage = () => {
  const imageArray = ['/hadalaprueba.jpeg', '/hadalaprueba.jpeg']
  return (
    <div>
      <div className='text-center w-full block p-4 justify-center align-middle'>
        <ImageSlider urls={imageArray} />
      </div>
    </div>
  )
}
