// src/components/QuickReplies.jsx
import Button from './ui/Button';
import QuickReplies from '../components/ui/QuickReplies';

const QuickReplies = ({ onSelectReply }) => {
  const quickReplies = [
    { id: 1, text: "¿Qué puedes hacer?" },
    { id: 2, text: "Necesito ayuda" },
    { id: 3, text: "Cuenta un chiste" }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {quickReplies.map(reply => (
        <button
          key={reply.id}
          onClick={() => onSelectReply(reply.text)}
          className="py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {reply.text}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;