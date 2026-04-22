// LandingPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Bot, Shield, Users, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ui/ThemeToggle';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ui/ChatInput';

const LandingPage = () => {
  const { darkMode } = useTheme();
  const [showChat, setShowChat] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy RyuBot, tu asistente virtual para la salud mental. ¿En qué puedo ayudarte hoy?", isBot: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Efecto para animación de entrada
  useEffect(() => {
    setIsVisible(true);
  }, []);
  // Función para enviar mensajes a Rasa
  const sendMessageToRasa = async (message) => {
    try {
      setIsTyping(true);

      const RASA_URL = process.env.NODE_ENV === 'production'
        ? 'http://rasa-backend:5005/webhooks/rest/webhook'
        : 'http://localhost:5005/webhooks/rest/webhook';

      const response = await fetch(RASA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: 'user', // En un sistema real, usarías un ID de usuario único
          message: message,
        }),
      });

      const rasaResponse = await response.json();
      setIsTyping(false);

      // Procesar las respuestas de Rasa (pueden ser múltiples mensajes)
      if (rasaResponse && rasaResponse.length > 0) {
        rasaResponse.forEach(resp => {
          if (resp.text) {
            setMessages(prevMessages => [
              ...prevMessages,
              { text: resp.text, isBot: true }
            ]);
          }
        });
      } else {
        // Si no hay respuesta válida
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "Lo siento, parece que no puedo responder en este momento.", isBot: true }
        ]);
      }
    } catch (error) {
      console.error('Error al comunicarse con Rasa:', error);
      setIsTyping(false);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Lo siento, ha ocurrido un error de conexión.", isBot: true }
      ]);
    }
  };

  const handleSendMessage = (text) => {
    // Agregar mensaje del usuario al chat
    setMessages(prev => [...prev, { text, isBot: false }]);

    // Enviar mensaje a Rasa
    sendMessageToRasa(text);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`px-6 py-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white">
              <span className="font-bold">Ryu</span>
            </div>
            <span className="text-xl font-bold">RyuBot</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#features" className="hover:text-blue-600 transition-colors">Características</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">Cómo funciona</a>
            <a href="#mental-health-feedback" className="hover:text-blue-600 transition-colors">Formulario</a>
            <ThemeToggle />
            {process.env.NODE_ENV === 'development' && (
                <Link to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors">
                 Login
               </Link>
             )}
            <Link
              to="/chat"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors"
            >
              Iniciar Chat
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div
          className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tu Asistente Virtual Inteligente para la salud mental</h1>
            <p className="text-xl mb-8 opacity-80">
              Respuestas instantáneas, soporte 24/7 y una experiencia conversacional intuitiva para resolver todas tus dudas.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/chat"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors flex items-center justify-center"
              >
                Comenzar ahora <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#how-it-works"
                className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} px-6 py-3 rounded-lg shadow-md transition-colors flex items-center justify-center`}
              >
                Cómo funciona
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className={`rounded-xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} transform transition-transform hover:scale-105`}>
              <div className={`h-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center px-4`}>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-blue-100'} mr-3`}>
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} max-w-xs`}>
                      <p>¡Hola! Soy tu asistente virtual para la salud mental. ¿En qué puedo ayudarte hoy?</p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end">
                    <div className={`px-4 py-3 rounded-lg bg-blue-600 text-white max-w-xs`}>
                      <p>Quiero saber más sobre los servicios que ofrecen.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-blue-100'} mr-3`}>
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} max-w-xs`}>
                      <p>¡Claro! Ofrecemos asistencia personalizada en el ambito de la salud mental, si estas padeciendo de estres, ansiedad no dudes en consultar podemos ayudarte </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-16 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Características Principales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot className="h-8 w-8 text-blue-600" />,
                title: "IA Avanzada",
                description: "Utilizamos tecnología de punta para proporcionar respuestas precisas y personalizadas a tus consultas."
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-600" />,
                title: "Seguridad Garantizada",
                description: "Tus conversaciones están protegidas con encriptación de extremo a extremo para garantizar tu privacidad."
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-600" />,
                title: "Disponible 24/7",
                description: "Obtén asistencia a cualquier hora del día, todos los días de la semana sin tiempos de espera."
              },
              {
                icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
                title: "Respuestas Instantáneas",
                description: "Recibe respuestas inmediatas a tus preguntas sin importar la complejidad del tema."
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Personalización",
                description: "Adaptamos nuestras respuestas a tus necesidades específicas para una experiencia a medida."
              },
              {
                icon: <ArrowRight className="h-8 w-8 text-blue-600" />,
                title: "Integración Sencilla",
                description: "Fácil de integrar en tu sitio web, aplicación o sistema existente con nuestra API."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-md transition-transform hover:scale-105 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Cómo Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Inicia una Conversación",
                description: "Haz clic en el botón de chat o ve a la página de chat para comenzar a interactuar con nuestro asistente virtual."
              },
              {
                step: "02",
                title: "Haz tu Pregunta",
                description: "Escribe tu consulta de forma natural. Nuestro chatbot entiende el lenguaje humano y contexto."
              },
              {
                step: "03",
                title: "Recibe Asistencia",
                description: "Obtén respuestas precisas y personalizadas instantáneamente para resolver tus dudas o problemas."
              }
            ].map((step, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-lg transition-all duration-300 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                } shadow-md hover:shadow-lg`}
              >
                <span className="absolute -top-5 -left-5 text-6xl font-bold opacity-10">{step.step}</span>
                <h3 className="text-xl font-semibold mb-3 relative z-10">{step.title}</h3>
                <p className="opacity-80 relative z-10">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

 <section id="mental-health-features" className={`py-16 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Asistente de Salud Mental</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageCircle className="h-8 w-8 text-green-600" />,
                title: "Apoyo Emocional",
                description: "Ofrecemos técnicas de autorregulación emocional basadas en terapia cognitivo-conductual para momentos difíciles."
              },
              {
                icon: <Bot className="h-8 w-8 text-green-600" />,
                title: "Conocimiento Especializado",
                description: "Desarrollado con información actualizada sobre salud mental, trastornos comunes y estrategias de afrontamiento."
              },
              {
                icon: <Clock className="h-8 w-8 text-green-600" />,
                title: "Ejercicios de Relajación",
                description: "Guía paso a paso con técnicas de respiración, relajación muscular progresiva y meditación mindfulness."
              },
              {
                icon: <ArrowRight className="h-8 w-8 text-green-600" />,
                title: "Seguimiento Personalizado",
                description: "Monitoreo de tu progreso con registro de estados de ánimo y recomendaciones personalizadas."
              },
              {
                icon: <Shield className="h-8 w-8 text-green-600" />,
                title: "Confidencialidad Total",
                description: "Entorno seguro y privado para expresar tus pensamientos sin temor a juicios o divulgación."
              },
              {
                icon: <Users className="h-8 w-8 text-green-600" />,
                title: "Conexión Profesional",
                description: "Derivación inmediata a terapeutas certificados cuando se detectan situaciones que requieren atención especializada."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-md transition-transform hover:scale-105 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl shadow-lg">
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Proceso de Relajación Guiada</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Evaluación",
                  description: "Identificación de tu nivel de estrés y necesidades específicas"
                },
                {
                  step: "2",
                  title: "Respiración",
                  description: "Técnicas de respiración diafragmática para reducir la activación nerviosa"
                },
                {
                  step: "3",
                  title: "Visualización",
                  description: "Guía de imaginería mental para alcanzar un estado de calma profunda"
                },
                {
                  step: "4",
                  title: "Integración",
                  description: "Estrategias para mantener la calma en situaciones cotidianas"
                }
              ].map((step, index) => (
                <div key={index} className={`flex flex-col items-center p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className={`rounded-full ${darkMode ? 'bg-green-900' : 'bg-green-100'} p-3 mb-3`}>
                    <span className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{step.step}</span>
                  </div>
                  <h4 className="font-medium mb-2">{step.title}</h4>
                  <p className="text-sm text-center opacity-80">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* Sección de Retroalimentación de Salud Mental */}
<section id="mental-health-feedback" className={`py-16 px-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8">Tu Bienestar Es Nuestra Prioridad</h2>
    <p className="text-center mb-12 max-w-3xl mx-auto">Comparte tu experiencia y ayúdanos a entender mejor cómo podemos apoyarte. Tus comentarios son valiosos para mejorar nuestro servicio.</p>

    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Columna izquierda: Imagen/Ilustración */}
      <div className={`rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-white'} p-6`}>
        <div className="aspect-w-4 aspect-h-3 mb-6">
          <div className={`w-full h-64 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-blue-100'} flex items-center justify-center`}>
            <div className="text-center">
              <div className="inline-flex mx-auto mb-4">
                <svg className="h-16 w-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <svg className="h-16 w-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Acompañamos tu camino</h3>
              <p className="opacity-80">Un espacio seguro para expresarte y recibir el apoyo que necesitas.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-blue-50'}`}>
              <p className="italic opacity-80">"Este asistente me ha ayudado a encontrar técnicas efectivas para manejar mi ansiedad. Me siento escuchado y comprendido."</p>
              <p className="text-right text-sm font-medium mt-2">— Miguel R.</p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-blue-50'}`}>
              <p className="italic opacity-80">"Al principio era escéptica, pero este espacio me ha brindado herramientas que uso diariamente para mejorar mi bienestar emocional."</p>
              <p className="text-right text-sm font-medium mt-2">— Laura T.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Columna derecha: Formulario de retroalimentación */}
      <div className={`rounded-xl shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} p-8`}>
        <h3 className="text-xl font-semibold mb-6">Comparte tu experiencia</h3>
        <form className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">¿Cómo te sientes hoy?</label>
            <div className="flex justify-between items-center mb-4">
              <button type="button" className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${darkMode ? 'hover:bg-red-800' : 'hover:bg-red-100'}`}>
                <span className="text-2xl" role="img" aria-label="Muy mal">😞</span>
              </button>
              <button type="button" className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${darkMode ? 'hover:bg-orange-800' : 'hover:bg-orange-100'}`}>
                <span className="text-2xl" role="img" aria-label="Mal">😟</span>
              </button>
              <button type="button" className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${darkMode ? 'hover:bg-yellow-800' : 'hover:bg-yellow-100'}`}>
                <span className="text-2xl" role="img" aria-label="Neutral">😐</span>
              </button>
              <button type="button" className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${darkMode ? 'hover:bg-lime-800' : 'hover:bg-lime-100'}`}>
                <span className="text-2xl" role="img" aria-label="Bien">🙂</span>
              </button>
              <button type="button" className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${darkMode ? 'hover:bg-green-800' : 'hover:bg-green-100'}`}>
                <span className="text-2xl" role="img" aria-label="Muy bien">😄</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">¿Qué áreas te gustaría explorar?</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Manejo del estrés", icon: "🧘" },
                { label: "Mejora del sueño", icon: "💤" },
                { label: "Ansiedad", icon: "😰" },
                { label: "Estado de ánimo", icon: "🌈" },
                { label: "Relaciones", icon: "👥" },
                { label: "Autoestima", icon: "💪" }
              ].map((area, index) => (
                <label key={index} className={`flex items-center p-3 rounded-md cursor-pointer border transition-colors ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input
                    type="checkbox"
                    className="mr-2"
                  />
                  <span className="mr-2">{area.icon}</span>
                  <span>{area.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Cuéntanos más sobre lo que te gustaría trabajar</label>
            <textarea
              className={`w-full p-4 rounded-md border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
              rows="4"
              placeholder="Describe lo que estás experimentando y cómo podemos ayudarte mejor..."
            ></textarea>
          </div>

          <div className="flex justify-between items-center pt-4">
            <div className="flex items-center">
              <input type="checkbox" id="privacy-consent" className="mr-2" />
              <label htmlFor="privacy-consent" className="text-sm">Acepto la política de privacidad</label>
            </div>
            <button
              type="submit"
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Enviar
            </button>
          </div>

          <div className="text-center mt-4">
            <a href="#" className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>¿Necesitas ayuda inmediata? Haz clic aquí para recursos de emergencia</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para empezar?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Prueba nuestro chatbot hoy mismo y descubre cómo puede mejorar tu experiencia de atención al cliente.
          </p>
          <Link
            to="/chat"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg shadow-md transition-colors inline-flex items-center text-lg font-medium"
          >
            Comenzar ahora <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`px-6 py-10 ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 bg-blue-600 rounded-md flex items-center justify-center text-white">
                  <span className="font-bold text-xs">Ryu</span>
                </div>
                <span className="text-lg font-bold">RyuBot</span>
              </div>
              <p className="opacity-70 max-w-md">
                Potenciando la comunicación digital con inteligencia artificial avanzada para una experiencia de usuario excepcional.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Producto</h4>
                <ul className="space-y-2 opacity-70">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Características</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Precios</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Integraciones</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">API</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Recursos</h4>
                <ul className="space-y-2 opacity-70">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Documentación</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Tutoriales</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Soporte</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2 opacity-70">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Sobre nosotros</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Contacto</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Política de privacidad</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Términos de servicio</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="opacity-70 mb-4 md:mb-0">© 2025 RyuBot. Todos los derechos reservados.</p>
            <div className="flex space-x-4">
              <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </a>
              <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              </a>
              <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>


    {/* Chat Flotante - Botón */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
          aria-label="Abrir chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Ventana de Chat Flotante */}
      {showChat && (
        <div className={`fixed bottom-6 right-6 w-80 md:w-96 h-96 rounded-lg shadow-2xl overflow-hidden z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} flex flex-col transition-opacity duration-300`}>
          {/* Encabezado del chat */}
          <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-600 text-white'} flex justify-between items-center`}>
            <div className="flex items-center">
              <div className="h-5 w-5 bg-blue-500 rounded-md flex items-center justify-center text-white mr-2">
                <span className="font-bold text-xs">R</span>
              </div>
              <h3 className="font-medium">Chat con RyuBot</h3>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-xs text-white">En línea</span>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-white opacity-70 hover:opacity-100"
                aria-label="Cerrar chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Contenido del chat - Usando el componente ChatWindow existente */}
          <div className="flex-1 overflow-y-auto">
            <ChatWindow messages={messages} isTyping={isTyping} />
          </div>

          {/* Input del chat - Usando el componente ChatInput existente */}
          <div className={`p-3 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      )}
    </div>
  );
};
export default LandingPage;