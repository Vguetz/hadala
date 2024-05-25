import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'UYU'
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  const { currency = 'UYU', notation = 'standard' } = options

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 4
  }).format(numericPrice)
}

export function getLocalStorage(key: string) {
  const value = localStorage.getItem(key)
  return value
}

export function randomizeCategory() {
  const categories = [
    'Bandoleras',
    'Billeteras',
    'Bolsos',
    'Carteras',
    'Materas',
    'Monederos',
    'Riñoneras',
    'Morrales'
  ]
  const randomIndex = Math.floor(Math.random() * categories.length)
  return categories[randomIndex]
}
