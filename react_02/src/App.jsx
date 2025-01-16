import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ContactForm from './components/ContactForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Hero />
    <ContactForm/>
    </>
  )
}

export default App
