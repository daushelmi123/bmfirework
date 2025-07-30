import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, AlertTriangle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useTheme } from '../context/ThemeContext';

const CartSummaryFooter = () => {
  const { getTotalItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showMinimumDialog, setShowMinimumDialog] = useState(false);
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const MINIMUM_ORDER = 150;
  const isMinimumMet = totalPrice >= MINIMUM_ORDER;
  const remainingAmount = MINIMUM_ORDER - totalPrice;

  if (totalItems === 0) return null;

  const handleCartClick = () => {
    if (!isMinimumMet) {
      // Show popup dialog if minimum not met
      setShowMinimumDialog(true);
      return;
    }
    
    // Scroll to checkout section instead of navigating to cart page
    const checkoutSection = document.querySelector('[data-checkout-section]');
    if (checkoutSection) {
      checkoutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/cart');
    }
  };


  return (
    <>
      <div 
        onClick={handleCartClick}
        className={`fixed bottom-0 left-0 right-0 shadow-2xl border-t-4 z-40 cursor-pointer transition-all duration-200 ${
          isMinimumMet 
            ? `bg-gradient-to-r ${theme.colors.cartColors.above} ${theme.colors.cartColors.text} ${theme.colors.cartColors.border}` 
            : `bg-gradient-to-r ${theme.colors.cartColors.below} text-red-100 border-red-400`
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${
                isMinimumMet 
                  ? 'bg-primary/20 border-primary/30' 
                  : 'bg-red-400/20 border-red-400/30'
              }`} style={isMinimumMet ? { backgroundColor: `hsl(${theme.colors.primary} / 0.2)`, borderColor: `hsl(${theme.colors.primary} / 0.3)` } : {}}>
                <ShoppingCart className={`h-6 w-6 ${isMinimumMet ? '' : 'text-red-400'}`} style={isMinimumMet ? { color: `hsl(${theme.colors.primary})` } : {}} />
              </div>
              <div>
                <div className={`text-lg font-bold ${isMinimumMet ? 'text-yellow-100' : 'text-red-100'}`}>
                  {totalItems} produk dipilih
                </div>
                <div className={`text-sm ${isMinimumMet ? 'text-yellow-200/80' : 'text-red-200/80'}`}>
                  {isMinimumMet 
                    ? '(Min RM 150.00) Proceed' 
                    : `Perlu tambah RM ${remainingAmount.toFixed(2)}`
                  }
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${isMinimumMet ? 'text-yellow-300' : 'text-red-300'}`}>
                RM {totalPrice.toFixed(2)}
              </div>
              {!isMinimumMet && (
                <div className="text-xs text-red-400 mt-1">
                  Min RM {MINIMUM_ORDER.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Minimum Order Warning Dialog */}
      <Dialog open={showMinimumDialog} onOpenChange={setShowMinimumDialog}>
        <DialogContent className="w-[95vw] max-w-sm sm:max-w-md mx-auto bg-white border-4 border-red-400 shadow-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 sm:gap-3 text-red-700 text-lg sm:text-xl font-bold">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
              <span className="leading-tight">Minimum Order Diperlukan</span>
            </DialogTitle>
          </DialogHeader>
          <div className="py-3 sm:py-4 space-y-3 sm:space-y-4">
            <div className="text-center bg-red-50 p-3 sm:p-4 rounded-lg border-2 border-red-200">
              <div className="text-base sm:text-lg font-bold text-red-800 mb-2">
                RM {MINIMUM_ORDER.toFixed(2)} Minimum Order
              </div>
              <div className="text-xs sm:text-sm text-red-600 mb-2 sm:mb-3">
                Current total: RM {totalPrice.toFixed(2)}
              </div>
              <div className="text-lg sm:text-xl font-bold text-red-700 bg-red-200 px-3 sm:px-4 py-2 rounded-lg">
                Perlu tambah: RM {remainingAmount.toFixed(2)}
              </div>
            </div>
            <p className="text-gray-700 text-center text-sm sm:text-base px-2">
              Sila tambah produk untuk mencapai minimum order sebelum checkout.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
            <Button 
              onClick={() => setShowMinimumDialog(false)}
              className="flex-1 bg-slate-600 text-yellow-100 hover:bg-slate-700 text-sm sm:text-base py-2 sm:py-2.5"
            >
              OK, Faham
            </Button>
            <Button 
              onClick={() => {
                setShowMinimumDialog(false);
                navigate('/products');
              }}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 hover:from-yellow-400 hover:to-yellow-500 text-sm sm:text-base py-2 sm:py-2.5"
            >
              Tambah Produk
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartSummaryFooter;