
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const WhatsAppButton = () => {
  const { t } = useLanguage();
  const whatsappNumber = "+60137340415";
  const message = "Hi! I'm interested in your fireworks. Can you help me?";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-24 right-6 bg-slate-500 hover:bg-slate-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center space-x-2 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:block text-sm font-medium group-hover:block">
        {t('whatsapp.text')}
      </span>
    </button>
  );
};

export default WhatsAppButton;
