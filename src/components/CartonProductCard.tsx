
import { Play } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

interface CartonProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  video: string;
  category: string;
}

interface CartonProductCardProps {
  product: CartonProduct;
  onAddToCart: () => void;
  index?: number;
}

const CartonProductCard = ({ product, onAddToCart, index }: CartonProductCardProps) => {
  const { t } = useLanguage();
  const { items, updateQuantity } = useCart();
  
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleIncrement = () => {
    if (quantity === 0) {
      // Add new item to cart
      onAddToCart();
    } else {
      // Update existing quantity
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <>
      {/* Mobile Horizontal Layout */}
      <div className="bg-white rounded-2xl shadow-lg border-4 border-yellow-400 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-yellow-500 relative">
        <div className="flex items-start p-4">
          {/* Left side - Image and Video */}
          <div className="flex flex-col items-center mr-4">
            {/* Product Image with frame - clickable for zoom */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border-2 border-gray-200 shadow-sm cursor-pointer hover:border-gray-300 transition-colors mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover no-select no-drag no-context"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-2xl w-full">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold text-left">
                    {product.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto rounded-lg no-select no-drag no-context"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
              </DialogContent>
            </Dialog>

            {/* Video Button - below image */}
            {product.video && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-xs bg-yellow-100 text-slate-700 px-2 py-1 rounded-full font-medium hover:bg-yellow-200 transition-colors flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    Video
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-4xl w-full max-h-[90vh] mx-2">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-bold text-left">
                      {product.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video w-full">
                    <iframe
                      src={product.video.replace('watch?v=', 'embed/')}
                      title={product.name}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
              {product.name}
            </h3>
            
            {/* Carton Quantity Info */}
            <p className="text-sm text-gray-600 mb-2">
              Kuantiti: {product.quantity} pcs
            </p>
            
            {/* Price and Quantity Controls */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">
                RM {product.price.toFixed(2)}
              </span>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecrement}
                  disabled={quantity === 0}
                  aria-label="Kurangkan kuantiti"
                  className="w-8 h-8 bg-slate-600 text-yellow-100 rounded-lg flex items-center justify-center font-bold text-sm disabled:opacity-40 hover:bg-slate-700 transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-bold min-w-[2rem] text-center text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  aria-label="Tambah kuantiti"
                  className="w-8 h-8 bg-slate-600 text-yellow-100 rounded-lg flex items-center justify-center font-bold text-sm hover:bg-slate-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default CartonProductCard;
