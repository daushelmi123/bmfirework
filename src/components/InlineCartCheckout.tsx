import { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';

const InlineCartCheckout = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { toast } = useToast();
  const [checkoutData, setCheckoutData] = useState(() => {
    // Load checkout data from localStorage on initialization
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('fireworksCheckoutData');
      return savedData ? JSON.parse(savedData) : {
        name: '',
        phone: '',
        email: '',
        address: '',
        postcode: '',
        state: '',
        district: ''
      };
    }
    return {
      name: '',
      phone: '',
      email: '',
      address: '',
      postcode: '',
      state: '',
      district: ''
    };
  });

  // Save checkout data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fireworksCheckoutData', JSON.stringify(checkoutData));
    }
  }, [checkoutData]);

  const malaysianStates = [
    'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka', 'Negeri Sembilan',
    'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya', 'Selangor', 'Terengganu'
  ];

  const stateDistricts = {
    'Johor': ['Batu Pahat', 'Johor Bahru', 'Kluang', 'Kota Tinggi', 'Kulai', 'Mersing', 'Muar', 'Pontian', 'Segamat', 'Tangkak'],
    'Kedah': ['Baling', 'Bandar Baharu', 'Kota Setar', 'Kuala Muda', 'Kubang Pasu', 'Kulim', 'Langkawi', 'Padang Terap', 'Pendang', 'Pokok Sena', 'Sik', 'Yan'],
    'Kelantan': ['Bachok', 'Gua Musang', 'Jeli', 'Kota Bharu', 'Kuala Krai', 'Machang', 'Pasir Mas', 'Pasir Puteh', 'Tanah Merah', 'Tumpat'],
    'Kuala Lumpur': ['Bukit Bintang', 'Cheras', 'Kepong', 'Lembah Pantai', 'Seputeh', 'Titiwangsa', 'Wangsa Maju'],
    'Labuan': ['Labuan'],
    'Melaka': ['Alor Gajah', 'Jasin', 'Melaka Tengah'],
    'Negeri Sembilan': ['Jelebu', 'Jempol', 'Kuala Pilah', 'Port Dickson', 'Rembau', 'Seremban', 'Tampin'],
    'Pahang': ['Bentong', 'Bera', 'Cameron Highlands', 'Jerantut', 'Kuantan', 'Lipis', 'Maran', 'Pekan', 'Raub', 'Rompin', 'Temerloh'],
    'Penang': ['Barat Daya', 'Seberang Perai Selatan', 'Seberang Perai Tengah', 'Seberang Perai Utara', 'Timur Laut'],
    'Perak': ['Batang Padang', 'Hilir Perak', 'Hulu Perak', 'Kampar', 'Kinta', 'Kuala Kangsar', 'Larut, Matang dan Selama', 'Manjung', 'Muallim', 'Perak Tengah'],
    'Perlis': ['Perlis'],
    'Putrajaya': ['Putrajaya'],
    'Selangor': ['Gombak', 'Hulu Langat', 'Hulu Selangor', 'Klang', 'Kuala Langat', 'Kuala Selangor', 'Petaling', 'Sabak Bernam', 'Sepang'],
    'Terengganu': ['Besut', 'Dungun', 'Hulu Terengganu', 'Kemaman', 'Kuala Nerus', 'Kuala Terengganu', 'Marang', 'Setiu']
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some fireworks to your cart first!",
        variant: "destructive"
      });
      return;
    }

    if (!checkoutData.name || !checkoutData.phone || !checkoutData.address || !checkoutData.postcode || !checkoutData.state || !checkoutData.district) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields (Name, Phone, Address, Postcode, State, District)",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order placed!",
      description: "We'll contact you shortly to confirm your order."
    });
    
    clearCart();
    setCheckoutData({ name: '', phone: '', email: '', address: '', postcode: '', state: '', district: '' });
    // Clear saved checkout data from localStorage after successful order
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fireworksCheckoutData');
    }
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some fireworks to your cart first!",
        variant: "destructive"
      });
      return;
    }

    if (!checkoutData.name || !checkoutData.phone || !checkoutData.address || !checkoutData.postcode || !checkoutData.state || !checkoutData.district) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields (Name, Phone, Address, Postcode, State, District)",
        variant: "destructive"
      });
      return;
    }

    const orderDetails = items.map(item => 
      `${item.name} (${item.type}) x${item.quantity} = RM ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const message = `Hi! I'd like to place an order:\n\n${orderDetails}\n\nTotal: RM ${getTotalPrice().toFixed(2)}\n\nCustomer Details:\nName: ${checkoutData.name}\nPhone: ${checkoutData.phone}\nEmail: ${checkoutData.email || 'Not provided'}\nAddress: ${checkoutData.address}\nPostcode: ${checkoutData.postcode}\nState: ${checkoutData.state}\nDistrict: ${checkoutData.district}`;
    
    const whatsappNumber = "+60137340415";
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="bg-white border-4 border-yellow-400 rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">🛒 Your Cart</h2>
          <p className="text-gray-600 mb-6">Add some fireworks to see them here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-yellow-400 rounded-2xl p-6 shadow-lg">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">🛒 Complete Your Order</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-black">
              Cart Items ({getTotalItems()})
            </h3>
            <Button
              onClick={clearCart}
              variant="outline"
              size="sm"
              className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
            >
              Clear Cart
            </Button>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-black text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                    <p className="font-bold text-black text-sm">RM {item.price}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="h-7 w-7 p-0 bg-teal-400 text-white border-teal-400 hover:bg-teal-500"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="h-7 w-7 p-0 bg-teal-400 text-white border-teal-400 hover:bg-teal-500"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeFromCart(item.id)}
                    className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white h-7 w-7 p-0 ml-2"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="text-right mt-2">
                  <p className="font-bold text-black text-sm">
                    RM {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Form */}
        <div>
          <div className="bg-gray-50 border-2 border-black rounded-lg p-6">
            <h3 className="text-xl font-bold text-black mb-4">Order Summary</h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-center py-2">
                <span>Subtotal:</span>
                <span className="font-semibold">RM {getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-200">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold text-red-600">RM {getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

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
                placeholder="Address *"
                value={checkoutData.address}
                onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                className="border-2 border-gray-300 focus:border-black"
              />
              <Input
                placeholder="Postcode *"
                value={checkoutData.postcode}
                onChange={(e) => setCheckoutData({ ...checkoutData, postcode: e.target.value })}
                className="border-2 border-gray-300 focus:border-black"
              />
              <Select onValueChange={(value) => setCheckoutData({ ...checkoutData, state: value, district: '' })}>
                <SelectTrigger className="border-2 border-gray-300 focus:border-black">
                  <SelectValue placeholder="Select State *" />
                </SelectTrigger>
                <SelectContent>
                  {malaysianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select 
                onValueChange={(value) => setCheckoutData({ ...checkoutData, district: value })}
                disabled={!checkoutData.state}
                value={checkoutData.district}
              >
                <SelectTrigger className="border-2 border-gray-300 focus:border-black">
                  <SelectValue placeholder={checkoutData.state ? "Select City/District *" : "Please select state first"} />
                </SelectTrigger>
                <SelectContent>
                  {checkoutData.state && stateDistricts[checkoutData.state]?.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleWhatsAppOrder}
                disabled={!checkoutData.name || !checkoutData.phone || !checkoutData.address || !checkoutData.postcode || !checkoutData.state || !checkoutData.district}
                className="w-full bg-slate-500 text-white hover:bg-slate-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Order via WhatsApp
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              * Required fields: Name, Phone, Address, Postcode, State, District. We'll contact you to confirm your order and arrange delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InlineCartCheckout;