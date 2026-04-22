// FloatingChatWidget.jsx
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ui/ChatInput';


const FloatingChatWidget = ({ darkMode }) => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy RyuBot, tu asistente virtual para la salud mental. ¿En qué puedo ayudarte hoy?", isBot: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Simulación de respuesta del chatbot
  const generateBotResponse = (userMessage) => {
    // Respuestas predefinidas basadas en palabras clave
    const responses = {
      'hola': '¡Hola! ¿Cómo estás hoy? ¿En qué puedo ayudarte?',
      'ayuda': 'Estoy aquí para asistirte con temas relacionados a la salud mental. Puedo ofrecerte técnicas para manejar el estrés, ansiedad o simplemente conversar. ¿Qué te gustaría tratar hoy?',
      'ansiedad': 'La ansiedad es una respuesta natural del cuerpo, pero puede volverse problemática. Puedo sugerirte ejercicios de respiración o técnicas de mindfulness que podrían ayudarte.',
      'estrés': 'El estrés puede afectar significativamente tu bienestar. Te recomendaría practicar ejercicios de relajación progresiva y establecer límites saludables en tus actividades diarias.',
      'depresión': 'Lamento que estés pasando por momentos difíciles. Es importante que sepas que no estás solo/a. ¿Te gustaría que te comparta algunas estrategias que podrían ayudarte a sentirte mejor?',
      'dormir': 'Problemas para dormir pueden afectar tu salud mental. Te sugiero establecer una rutina antes de acostarte, evitar pantallas y practicar meditación. ¿Quieres más consejos específicos?',
      'gracias': 'De nada, estoy aquí para ayudarte. No dudes en volver cuando lo necesites.',
      'adiós': 'Ha sido un placer poder ayudarte. Recuerda que estoy disponible 24/7 si necesitas hablar. ¡Que tengas un excelente día!'
    };

    // Buscar coincidencias en el mensaje del usuario
    const lowercaseMessage = userMessage.toLowerCase();
    let botResponse = 'No estoy seguro de cómo responder a eso. ¿Puedes reformular tu pregunta o hablarme de cómo te sientes hoy?';

    // Revisar si alguna palabra clave está en el mensaje
    for (const [keyword, response] of Object.entries(responses)) {
      if (lowercaseMessage.includes(keyword)) {
        botResponse = response;
        break;
      }
    }

    return botResponse;
  };

  const handleSendMessage = (text) => {
    // Agregar mensaje del usuario al chat
    setMessages(prev => [...prev, { text, isBot: false }]);

    // Simular "escribiendo..."
    setIsTyping(true);

    // Simular respuesta después de un breve retraso
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = generateBotResponse(text);
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1500);
  };

  return (
    <>
      {/* Botón de chat flotante */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
          aria-label="Abrir chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Ventana de chat flotante */}
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

          {/* Contenido del chat */}
          <div className="flex-1 overflow-hidden">
            <ChatWindow messages={messages} isTyping={isTyping} />
          </div>

          {/* Input del chat */}
          <div className={`p-3 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatWidget;