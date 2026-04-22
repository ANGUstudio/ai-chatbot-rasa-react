import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/ui/Card';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ui/ChatInput';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy RyuBot, tu asistente virtual. ¿En qué puedo ayudarte hoy?", isBot: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Función para enviar mensajes a Rasa
  const sendMessageToRasa = async (message) => {
    try {
      setIsTyping(true);

      //const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
      //const response = await fetch('http://rasa-backend:5005/webhooks/rest/webhook', {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col">
        <Card className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
            {/* Botón de regreso integrado */}
            <Link
              to="/"
              className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Regresar al inicio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </Link>

            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <span className="font-bold">R</span>
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-gray-800 dark:text-white">RyuBot</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Asistente Virtual para la salud mental</p>
            </div>
            <div className="ml-auto flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm text-gray-500 dark:text-gray-400">En línea</span>
            </div>
          </div>

          <ChatWindow messages={messages} isTyping={isTyping} />

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Chatbot;