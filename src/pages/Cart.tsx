
import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingCart, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { toast } = useToast();
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    const MINIMUM_ORDER = 150;
    const totalPrice = getTotalPrice();
    
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some fireworks to your cart first!",
        variant: "destructive"
      });
      return;
    }

    if (totalPrice < MINIMUM_ORDER) {
      toast({
        title: "Minimum order not met",
        description: `Minimum order RM ${MINIMUM_ORDER.toFixed(2)} diperlukan. Anda perlu tambah RM ${(MINIMUM_ORDER - totalPrice).toFixed(2)} lagi.`,
        variant: "destructive"
      });
      return;
    }

    if (!checkoutData.name || !checkoutData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in your name and phone number",
        variant: "destructive"
      });
      return;
    }

    // Simulate checkout process
    toast({
      title: "Order placed!",
      description: "We'll contact you shortly to confirm your order."
    });
    
    clearCart();
    setCheckoutData({ name: '', phone: '', email: '', address: '' });
  };

  const handleWhatsAppOrder = () => {
    const MINIMUM_ORDER = 150;
    const totalPrice = getTotalPrice();
    
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some fireworks to your cart first!",
        variant: "destructive"
      });
      return;
    }

    if (totalPrice < MINIMUM_ORDER) {
      toast({
        title: "Minimum order not met",
        description: `Minimum order RM ${MINIMUM_ORDER.toFixed(2)} diperlukan. Anda perlu tambah RM ${(MINIMUM_ORDER - totalPrice).toFixed(2)} lagi.`,
        variant: "destructive"
      });
      return;
    }

    const orderDetails = items.map(item => 
      `${item.name} (${item.type}) x${item.quantity} = RM ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const message = `Hi! I'd like to place an order:\n\n${orderDetails}\n\nTotal: RM ${getTotalPrice().toFixed(2)}\n\nCustomer Details:\nName: ${checkoutData.name || 'Not provided'}\nPhone: ${checkoutData.phone || 'Not provided'}\nEmail: ${checkoutData.email || 'Not provided'}\nAddress: ${checkoutData.address || 'Not provided'}`;
    
    const whatsappNumber = "+60137340415";
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-black mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Browse our amazing collection of fireworks and start building your perfect celebration!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <a href="/products">Browse Fireworks</a>
              </Button>
              <Button asChild variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                <a href="/packages">View Packages</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border-4 border-yellow-400 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">
                  Cart Items ({getTotalItems()})
                </h2>
                <Button
                  onClick={clearCart}
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
                >
                  Clear Cart
                </Button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 pb-4">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border-2 border-gray-200">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Product Info and Controls */}
                      <div className="flex-1 space-y-3">
                        {/* Product Details */}
                        <div>
                          <h3 className="font-bold text-black text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                          <p className="text-lg font-bold text-black">RM {item.price}</p>
                        </div>

                        {/* Quantity Controls and Subtotal */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0 bg-teal-400 text-white border-teal-400 hover:bg-teal-500"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0 bg-teal-400 text-white border-teal-400 hover:bg-teal-500"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Remove Button */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                            className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Subtotal - moved below quantity controls */}
                        <div className="text-right">
                          <p className="font-bold text-black text-lg">
                            RM {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Section */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black rounded-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-black mb-6">Checkout</h2>

              {/* Order Summary */}
              <div className="mb-6">
                <div className="flex justify-between items-center py-2">
                  <span>Subtotal:</span>
                  <span className="font-semibold">RM {getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-200">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-lg font-bold">RM {getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4 mb-6">
                <Input
                  placeholder="Full Name *"
                  value={checkoutData.name}
                  onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                  className="border-2 border-gray-300 focus:border-black"
                />
                <Input
                  placeholder="Phone Number *"
                  value={checkoutData.phone}
                  onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                  className="border-2 border-gray-300 focus:border-black"
                />
                <Input
                  placeholder="Email Address"
                  value={checkoutData.email}
                  onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                  className="border-2 border-gray-300 focus:border-black"
                />
                <Input
                  placeholder="Delivery Address"
                  value={checkoutData.address}
                  onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                  className="border-2 border-gray-300 focus:border-black"
                />
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  Place Order
                </Button>
                
                <Button
                  onClick={handleWhatsAppOrder}
                  variant="outline"
                  className="w-full border-slate-500 text-slate-600 hover:bg-slate-500 hover:text-white"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Order via WhatsApp
                </Button>
              </div>

              <p className="text-xs text-slate-600 mt-4 text-center">
                * Wajib diisi. Kami akan hubungi untuk confirm order & arrange delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
