import { useEffect } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({ children }) {
  // "Watcher" effect that waits for the component to mount
  // and then triggers the scroll to the section specified in the URL hash.
  useEffect(() => {
    // 1. Check if there is a hash in the URL (e.g., #features)
    const hash = window.location.hash
    if (hash) {
      // 2. We use a slight timeout to ensure the DOM has fully rendered
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100) // 100ms is usually enough for React to paint

      return () => clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  )
}
