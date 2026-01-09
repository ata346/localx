import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    window.open('https://wa.me/919876543210?text=Hi! I need help with LOCAL X', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-success text-success-foreground rounded-full shadow-elevated flex items-center justify-center hover:scale-110 transition-transform duration-200"
      aria-label="WhatsApp Support"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default WhatsAppButton;
