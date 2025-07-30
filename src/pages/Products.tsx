
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import ProductsSearch from '../components/ProductsSearch';
import ProductsByCategory from '../components/ProductsByCategory';
import FilteredProducts from '../components/FilteredProducts';
import InlineCartCheckout from '../components/InlineCartCheckout';
import CartSummaryFooter from '../components/CartSummaryFooter';
import { categories } from '../data/products';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCartFooter, setShowCartFooter] = useState(true);
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const checkoutRef = useRef(null);

  // Check for category parameter in URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const productId = searchParams.get('product');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    // Scroll to specific product if product ID is provided
    if (productId) {
      setTimeout(() => {
        const productElement = document.getElementById(`product-${productId}`);
        if (productElement) {
          productElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          // Add highlight effect
          productElement.classList.add('ring-4', 'ring-yellow-400', 'ring-opacity-75');
          setTimeout(() => {
            productElement.classList.remove('ring-4', 'ring-yellow-400', 'ring-opacity-75');
          }, 3000);
        }
      }, 500);
    }
  }, [searchParams]);

  // Get all products
  const allProducts = categories.flatMap(category => category.products);

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
      type: 'product'
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
      <div className="absolute top-8 left-8 text-4xl opacity-20 animate-pulse">🌙</div>
      <div className="absolute top-16 right-12 text-3xl opacity-15 animate-bounce">✨</div>
      <div className="absolute bottom-20 left-16 text-2xl opacity-10">🎆</div>
      <div className="absolute bottom-32 right-20 text-3xl opacity-15">🌟</div>
      
      {/* Ketupat pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-16 gap-6 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-slate-400 transform rotate-45 w-4 h-4"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🎆🌙</div>
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-6 drop-shadow-sm">
            {t('products.title')}
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            {t('products.description')}
          </p>
        </div>

        {/* Search and Filter */}
        <ProductsSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          allProductsCount={allProducts.length}
        />

        {/* Products Grid */}
        {selectedCategory === 'All' ? (
          <ProductsByCategory
            categories={categories}
            searchTerm={searchTerm}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <FilteredProducts
            filteredProducts={filteredProducts}
            selectedCategory={selectedCategory}
            onAddToCart={handleAddToCart}
          />
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">{t('products.noResults')}</p>
          </div>
        )}

        {/* Inline Cart Checkout - OnPay Style */}
        <div ref={checkoutRef} className="mt-16" data-checkout-section>
          <InlineCartCheckout />
        </div>

        {/* Add extra padding at bottom */}
        <div className="h-16"></div>

        {/* Cart Summary Footer - Shows until checkout section is visible */}
        {showCartFooter && <CartSummaryFooter />}
      </div>
    </div>
  );
};

export default Products;
