
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const packages = [
  {
    id: 'wedding-package',
    name: 'Wedding Package',
    price: 899,
    image: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=600',
    description: 'Perfect for your special day with romantic aerial displays and elegant fountain fireworks.',
    fireworks: [
      'Heart-shaped aerial fireworks × 6',
      'Golden fountain displays × 4',
      'Wedding sparklers × 20',
      'Romantic color wheels × 2',
      'Grand finale aerial × 1'
    ]
  },
  {
    id: 'hari-raya-package',
    name: 'Hari Berlesen Package',
    price: 649,
    image: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=600',
    description: 'Celebrate Hari Berlesen with traditional colors and festive displays for the whole family.',
    fireworks: [
      'Green & gold aerial displays × 8',
      'Family-safe fountain × 6',
      'Colorful wheels × 4',
      'Kids sparklers × 30',
      'Traditional firecrackers × 10'
    ]
  },
  {
    id: 'birthday-package',
    name: 'Birthday Package',
    price: 399,
    image: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=600',
    description: 'Make birthdays extra special with colorful and fun fireworks safe for all ages.',
    fireworks: [
      'Birthday cake fountains × 4',
      'Rainbow aerial displays × 6',
      'Number sparklers × 1 set',
      'Fun wheels × 3',
      'Safe indoor sparklers × 20'
    ]
  },
  {
    id: 'new-year-package',
    name: 'New Year Package',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=600',
    description: 'Ring in the new year with spectacular displays and countdown fireworks.',
    fireworks: [
      'Countdown timer display × 1',
      'Midnight aerial show × 12',
      'Golden shower fountains × 8',
      'Celebration wheels × 6',
      'Grand finale package × 1'
    ]
  },
  {
    id: 'festival-package',
    name: 'Festival Package',
    price: 799,
    image: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=600',
    description: 'Perfect for cultural festivals, community events, and large celebrations.',
    fireworks: [
      'Multi-color aerial displays × 10',
      'Community fountain shows × 6',
      'Festival wheels × 4',
      'Group sparklers × 50',
      'Cultural firecrackers × 15'
    ]
  }
];

const Packages = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (pkg: typeof packages[0]) => {
    addToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      image: pkg.image,
      type: 'package'
    });
  };

  const handleWhatsAppOrder = (pkg: typeof packages[0]) => {
    const message = `Hi! I'm interested in the ${pkg.name} (RM ${pkg.price}). Can you help me with the order?`;
    const whatsappNumber = "+60137340415";
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 py-8 relative overflow-hidden">
      {/* Berlesen decorative elements */}
      <div className="absolute top-8 left-8 text-4xl opacity-20 animate-pulse">🎁</div>
      <div className="absolute top-16 right-12 text-3xl opacity-15 animate-bounce">🌙</div>
      <div className="absolute bottom-20 left-16 text-2xl opacity-10">✨</div>
      <div className="absolute bottom-32 right-20 text-3xl opacity-15">🎉</div>
      
      {/* Package pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-10 gap-8 h-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="border-2 border-slate-400 rounded-lg w-8 h-8"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🎁🌙</div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            Pakej Berlesen Istimewa
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Pakej mercun siap sedia untuk sambutan Berlesen & majlis khas. Setiap pakej dipilih khas untuk atmosphere yang sempurna! 🎆
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-gradient-to-br from-white to-yellow-50 border-2 border-slate-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400">
              {/* Package Image */}
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Package Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-slate-800">
                    {pkg.name}
                  </h3>
                  <span className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-slate-700 bg-clip-text text-transparent">
                    RM {pkg.price}
                  </span>
                </div>

                <p className="text-slate-700 mb-6">
                  {pkg.description}
                </p>

                {/* Included Fireworks */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">
                    Apa Yang Termasuk:
                  </h4>
                  <ul className="space-y-2">
                    {pkg.fireworks.map((item, index) => (
                      <li key={index} className="flex items-start text-slate-700">
                        <span className="text-yellow-600 mr-2">✨</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => handleAddToCart(pkg)}
                    className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 text-yellow-100 hover:from-slate-700 hover:to-slate-800 shadow-lg"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Masuk Troli
                  </Button>
                  
                  <Button
                    onClick={() => handleWhatsAppOrder(pkg)}
                    variant="outline"
                    className="flex-1 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-slate-800 shadow-lg"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Order WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Package CTA */}
        <div className="mt-16 bg-gradient-to-br from-slate-700 to-yellow-600 text-white rounded-xl p-8 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 text-2xl opacity-30">🌙</div>
          <div className="absolute top-4 right-4 text-2xl opacity-30">✨</div>
          <div className="absolute bottom-4 left-6 text-xl opacity-20">🎆</div>
          <div className="absolute bottom-4 right-6 text-xl opacity-20">🎉</div>
          
          <div className="relative">
            <div className="text-4xl mb-4">🎁</div>
            <h2 className="text-3xl font-bold mb-4">Nak Pakej Khas?</h2>
            <p className="text-xl text-yellow-100 mb-6 max-w-2xl mx-auto">
              Tak jumpa yang sesuai? Kami boleh buat pakej mercun custom untuk majlis & budget awak! 🌟
            </p>
            <Button
              onClick={() => {
                const message = "Hi! Nak tanya pasal pakej mercun custom untuk majlis saya.";
                const whatsappNumber = "+60137340415";
                const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
              }}
              className="bg-yellow-500 text-slate-800 hover:bg-yellow-400 shadow-xl"
              size="lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Untuk Pakej Custom
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
