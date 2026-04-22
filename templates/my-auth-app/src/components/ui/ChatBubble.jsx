// src/components/ChatBubble.jsx
import { useEffect, useRef } from 'react';

const ChatBubble = ({ message, isBot }) => {
  const bubbleRef = useRef(null);

  useEffect(() => {
    // Simple animation on mount
    const bubble = bubbleRef.current;
    bubble.style.opacity = '0';
    bubble.style.transform = 'translateY(10px)';

    setTimeout(() => {
      bubble.style.transition = 'opacity 300ms ease, transform 300ms ease';
      bubble.style.opacity = '1';
      bubble.style.transform = 'translateY(0)';
    }, 50);
  }, []);

  return (
    <div
      ref={bubbleRef}
      className={`px-4 py-3 rounded-xl max-w-[85%] mb-3 ${
        isBot
          ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700 mr-auto'
          : 'bg-blue-600 text-white ml-auto'
      }`}
    >
      {message}
    </div>
  );
};

export default ChatBubble;