// usePhone.ts
import { useState } from 'react'

const usePhone = () => {
  const [phone, setPhone] = useState('')
  const [isValidPhone, setIsValidPhone] = useState(false)

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = event.target.value
    setPhone(phoneValue)
    setIsValidPhone(
      /^\d{9}$/.test(phoneValue.trim()) && phoneValue.trim().startsWith('09')
    )
  }

  return [phone, isValidPhone, handlePhoneChange] as const
}

export default usePhone
