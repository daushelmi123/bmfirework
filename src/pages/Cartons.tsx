
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import CartonsSearch from '../components/CartonsSearch';
import CartonsByCategory from '../components/CartonsByCategory';
import FilteredCartons from '../components/FilteredCartons';
import InlineCartCheckoutCarton from '../components/InlineCartCheckoutCarton';
import CartSummaryFooter from '../components/CartSummaryFooter';
import { cartonCategories } from '../data/cartonProducts';

const Cartons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCartFooter, setShowCartFooter] = useState(true);
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const checkoutRef = useRef(null);

  // Get all carton products
  const allProducts = cartonCategories.flatMap(category => category.products);

  // Filter products based on search and category
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: 'carton'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (checkoutRef.current) {
        const checkoutTop = checkoutRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Hide cart footer when checkout section is in view (top of checkout is within viewport)
        setShowCartFooter(checkoutTop > windowHeight * 0.5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 py-8 relative overflow-hidden">
      {/* Berlesen decorative elements */}
      <div className="absolute top-12 left-12 text-4xl opacity-20 animate-pulse">📦</div>
      <div className="absolute top-20 right-16 text-3xl opacity-15 animate-bounce">🌙</div>
      <div className="absolute bottom-24 left-20 text-2xl opacity-10">✨</div>
      <div className="absolute bottom-40 right-24 text-3xl opacity-15">🎆</div>
      
      {/* Wholesale pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-8 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border-2 border-slate-400 transform rotate-12 w-6 h-6"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">📦🌙</div>
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-6 drop-shadow-sm">
            Produk Carton Berlesen
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Koleksi borong mercun Berlesen terbaik - beli carton jimat lebih! 🎉
          </p>
        </div>

        {/* Search and Filter */}
        <CartonsSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          allProductsCount={allProducts.length}
        />

        {/* Products Grid */}
        {selectedCategory === 'All' ? (
          <CartonsByCategory
            categories={cartonCategories}
            searchTerm={searchTerm}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <FilteredCartons
            filteredProducts={filteredProducts}
            selectedCategory={selectedCategory}
            onAddToCart={handleAddToCart}
          />
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Tiada produk carton dijumpai</p>
          </div>
        )}

        {/* Inline Cart Checkout - OnPay Style for Cartons */}
        <div ref={checkoutRef} className="mt-16" data-checkout-section>
          <InlineCartCheckoutCarton />
        </div>

        {/* Add extra padding at bottom */}
        <div className="h-16"></div>

        {/* Cart Summary Footer - Shows until checkout section is visible */}
        {showCartFooter && <CartSummaryFooter />}
      </div>
    </div>
  );
};

export default Cartons;
