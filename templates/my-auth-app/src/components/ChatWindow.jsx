import { useEffect, useRef, useState } from 'react';
import ChatBubble from './ui/ChatBubble';

const ChatWindow = ({ messages, isTyping }) => {
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          message={msg.text}
          isBot={msg.isBot}
        />
      ))}

      {isTyping && (
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-xl max-w-[85%] mb-3 shadow-sm border border-gray-100 dark:border-gray-700 mr-auto flex items-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">RyuBot está escribiendo...</span>
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatWindow;