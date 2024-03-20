import { useState, useEffect } from 'react'

const useEmail = () => {
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    const savedEmail = localStorage.getItem('email')
    if (savedEmail) {
      setEmail(savedEmail)
    }
  }, [])

  const setEmailAndSave = (newEmail: string) => {
    setEmail(newEmail)
    localStorage.setItem('email', newEmail)
  }

  return [email, setEmailAndSave] as const
}

export default useEmail
