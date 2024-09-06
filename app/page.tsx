'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Menu, Facebook, Instagram, Mail, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const SocialIcon = ({ Icon, href }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-primary transition-colors duration-300"
      whileHover={{ scale: 1.2, rotate: 360 }}
      whileTap={{ scale: 0.8 }}
    >
      <Icon size={24} />
    </motion.a>
  )

  if (!mounted) return null

  return (
    <div className="overflow-hidden">
      {/* Navigation Menu */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a onClick={() => scrollToSection('inicio')} className="text-2xl font-bold text-white cursor-pointer">Bibliocasita</a>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
          <ul className={`md:flex md:space-x-6 items-center ${menuOpen ? 'block absolute top-full left-0 right-0 bg-black bg-opacity-90 shadow-md p-4' : 'hidden'} md:relative md:bg-transparent md:shadow-none`}>
            <li><a onClick={() => scrollToSection('inicio')} className="text-white hover:text-primary cursor-pointer block py-2 md:py-0">Inicio</a></li>
            <li><a onClick={() => scrollToSection('informacion')} className="text-white hover:text-primary cursor-pointer block py-2 md:py-0">Información</a></li>
            <li><a onClick={() => scrollToSection('impacto')} className="text-white hover:text-primary cursor-pointer block py-2 md:py-0">Impacto</a></li>
            <li><a onClick={() => scrollToSection('mision')} className="text-white hover:text-primary cursor-pointer block py-2 md:py-0">Misión</a></li>
            <li><a onClick={() => scrollToSection('contacto')} className="text-white hover:text-primary cursor-pointer block py-2 md:py-0">Contacto</a></li>
            <li className="flex space-x-4 mt-4 md:mt-0">
              <SocialIcon Icon={Facebook} href="https://www.facebook.com/bibliocasita" />
              <SocialIcon Icon={Instagram} href="https://www.instagram.com/bibliocasita" />
              <SocialIcon Icon={Phone} href="https://wa.me/1234567890" />
              <SocialIcon Icon={Mail} href="mailto:info@bibliocasita.com" />
            </li>
          </ul>
        </div>
      </motion.nav>

      {/* Header Section */}
      <header id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Descripcion%203-EZeAX10eZlHInQ3N9bunwC8wOgIYwY.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: y1
          }}
        />
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold mb-4"
          >
            Fundación Bibliocasita
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl"
          >
            Promoviendo la lectura en comunidades
          </motion.p>
        </div>
      </header>

      {/* Information Section */}
      <section id="informacion" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Foto%203ra-BV3QdI0dIqqrebYRwc5p6YY4OGGipT.jpg" alt="Fácil acceso a los libros" width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Fácil acceso a los libros de forma gratuita</h3>
                <p>Proyecto familiar con enfoque social sin fines lucrativos con la finalidad de promover la lectura en las comunidades donde las oportunidades y acceso a los libros es una limitante para las nuevas generaciones.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/foto%203a-N5Fmx4QopeaMlpRIxFAo12aQeokWMi.jpg" alt="Valores" width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Valores</h3>
                <ul className="list-disc list-inside">
                  <li>Compromiso Social</li>
                  <li>Igualdad de oportunidades</li>
                  <li>Fomento equitativo de la lectura en comunidad</li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Descripcion%203-EZeAX10eZlHInQ3N9bunwC8wOgIYwY.jpg" alt="Proyecto no lucrativo" width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Proyecto no lucrativo</h3>
                <p>Somos un proyecto no lucrativo que busca el desarrollo comunitario a través de la lectura y que con el apoyo familiar creamos el espacio para disponer de los libros a todo público en un buzón.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Custom Carousel Section */}
      <section id="impacto" className="py-20 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Nuestro Impacto</h2>
          <div className="relative overflow-hidden" ref={carouselRef}>
            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              <div className="w-full flex-shrink-0">
                <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Foto%203ra-BV3QdI0dIqqrebYRwc5p6YY4OGGipT.jpg" alt="Impacto 1" width={800} height={400} className="w-full h-96 object-cover rounded-lg" />
                <p className="mt-4 text-center text-lg">Facilitando el acceso a la lectura</p>
              </div>
              <div className="w-full flex-shrink-0">
                <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/foto%203a-N5Fmx4QopeaMlpRIxFAo12aQeokWMi.jpg" alt="Impacto 2" width={800} height={400} className="w-full h-96 object-cover rounded-lg" />
                <p className="mt-4 text-center text-lg">Promoviendo la igualdad de oportunidades</p>
              </div>
              <div className="w-full flex-shrink-0">
                <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Descripcion%203-EZeAX10eZlHInQ3N9bunwC8wOgIYwY.jpg" alt="Impacto 3" width={800} height={400} className="w-full h-96 object-cover rounded-lg" />
                <p className="mt-4 text-center text-lg">Fomentando el desarrollo comunitario</p>
              </div>
            </div>
            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Mission, Vision, and Objective Section */}
      <section id="mision" className="py-20 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">Nuestra Misión</h2>
              <p className="text-gray-700">Contribuir al desarrollo comunitario en espacios que permitan tener el acceso libre a los libros en su formato físico.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">Nuestra Visión</h2>
              <p className="text-gray-700">Ser pioneros en promover la lectura en las comunidades y del país a través de la participación ciudadana en las diferentes actividades que incentiven el gusto por la lectura.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">Nuestro Objetivo</h2>
              <p className="text-gray-700">Crear una sociedad lectora con criterio, empática, con valores y futuros líderes con convicción de servicio a su comunidad.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collaborators Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Colaboradores</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              { name: "La Biblioteca de María", logo: "/placeholder.svg?height=100&width=100" },
              { name: "Licenciada Perla Fortune", logo: "/placeholder.svg?height=100&width=100" },
              { name: "Licenciado Bagur Castillo", logo: "/placeholder.svg?height=100&width=100" },
              { name: "Ingeniera Patricia de León", logo: "/placeholder.svg?height=100&width=100" },
              { name: "V-WAD COMPANY", logo: "/placeholder.svg?height=100&width=100", emphasis: true },
            ].map((collaborator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col items-center ${collaborator.emphasis ? 'w-full' : 'w-1/2 md:w-1/3 lg:w-1/5'}`}
              >
                <Image src={collaborator.logo} alt={collaborator.name} width={100} height={100} className="mb-4" />
                <p className={`text-center ${collaborator.emphasis ? 'text-xl font-bold' : ''}`}>{collaborator.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlighted Information Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">¿Por qué es importante?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Crisis social y valores</h3>
                <p className="text-lg">El deseo nace ante la crisis social que se vive por la poca práctica de valores, especialmente en la lectura. La lectura es una de las maneras donde las personas experimentan distintas emociones, volviendo más empática a la sociedad.</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Acceso rápido a la literatura</h3>
                <p className="text-lg">Nuestro compromiso surge debido a las grandes limitantes que se tienen en las áreas rurales. A diferencia de las Bibliotecas Municipales, Bibliocasita ofrece un acceso rápido al material literario.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-4 text-center">Contáctanos</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" required></textarea>
              </div>
              <Button type="submit" className="w-full">Enviar</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BIBLIOCASITA TOTO</h3>
              <p className="mb-4 text-sm">La información en esta página web se proporciona con el fin de brindar información precisa y actualizada, aunque no se garantiza la exactitud o integridad de la misma. No nos hacemos responsables por los daños y perjuicios derivados del mal uso de la página o sus contenidos.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">V-WAD COMPANY</h3>
              <p className="mb-4 text-sm">Importante: El uso de la página es con fines informativos. Se prohíbe el uso malicioso de la página.</p>
              <p className="mb-2 text-sm">SERVICIOS: Web-móvil, Software IOS, WINDOWS, Hosting, Dominio</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p className="mb-4 text-sm">Contacto con el desarrollador: Agradecemos que adjunto al mensaje nos envíes un método de contacto para poder contactarte.</p>
              <div className="flex space-x-4 mb-4">
                <SocialIcon Icon={Facebook} href="https://www.facebook.com/vwadcompany" />
                <SocialIcon Icon={Instagram} href="https://www.instagram.com/vwadcompany" />
                <SocialIcon Icon={Phone} href="https://wa.me/42800891" />
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} V-WAD COMPANY. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
