import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Globe, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.fireworks'), href: '/products' },
    { name: 'Cartons', href: '/cartons' },
    { name: t('nav.packages'), href: '/packages' },
    { name: t('nav.permitGuide'), href: '/permit-guide' },
    { name: t('nav.safetyGuide'), href: '/safety-guide' },
    { name: t('nav.testimonials'), href: '/testimonials' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ms' : 'en');
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 border-b-2 border-yellow-400 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <span className="text-3xl">🌙</span>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent leading-tight whitespace-nowrap">
                MercunBerlesen
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Main Items */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/') ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 shadow-lg' : 'text-yellow-200 hover:bg-slate-700 hover:text-yellow-100'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/products"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/products') ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 shadow-lg' : 'text-yellow-200 hover:bg-slate-700 hover:text-yellow-100'
              }`}
            >
              {t('nav.fireworks')}
            </Link>
            <Link
              to="/cartons"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/cartons') ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 shadow-lg' : 'text-yellow-200 hover:bg-slate-700 hover:text-yellow-100'
              }`}
            >
              Cartons
            </Link>
            <Link
              to="/permit-guide"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/permit-guide') ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 shadow-lg' : 'text-yellow-200 hover:bg-slate-700 hover:text-yellow-100'
              }`}
            >
              {t('nav.permitGuide')}
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/contact') ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 shadow-lg' : 'text-yellow-200 hover:bg-slate-700 hover:text-yellow-100'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* More Menu Dropdown - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="border-2 border-yellow-400 text-yellow-300 bg-slate-700 hover:bg-yellow-400 hover:text-slate-900 font-medium px-3 text-sm h-10 shadow-lg"
                  >
                    <Menu className="h-4 w-4 mr-2" />
                    More
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-slate-800 border-2 border-yellow-400">
                  {navigation.filter(item => !['/products', '/', '/permit-guide', '/cartons', '/contact'].includes(item.href)).map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        to={item.href}
                        className={`w-full cursor-pointer text-yellow-200 hover:bg-slate-700 hover:text-yellow-100 px-3 py-2 rounded transition-all duration-200 ${
                          isActive(item.href) ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 font-medium' : ''
                        }`}
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button
                size="sm"
                onClick={toggleLanguage}
                className="border-2 border-yellow-400 text-yellow-300 bg-slate-700 hover:bg-yellow-400 hover:text-slate-900 font-medium px-3 text-sm h-10 shadow-lg"
              >
                <Globe className="h-4 w-4 mr-2" />
                {language === 'en' ? 'BM' : 'EN'}
              </Button>
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 sm:p-3 text-yellow-300 hover:bg-yellow-400 hover:text-slate-900 rounded-lg transition-all duration-200 border-2 border-yellow-400 bg-gradient-to-br from-slate-800 to-slate-700 min-w-[48px] h-12 flex items-center justify-center shadow-lg"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-bold border-2 border-white">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="border-2 border-yellow-400 text-yellow-300 bg-slate-700 hover:bg-yellow-400 hover:text-slate-900 font-medium px-2 text-xs h-10 shadow-lg"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden border-t-2 border-yellow-400 bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="px-2 pt-4 pb-6 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 shadow-lg'
                      : 'text-yellow-200 hover:bg-slate-700 hover:text-yellow-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Language Toggle in Mobile Menu */}
              <div className="pt-2 border-t border-yellow-400">
                <Button
                  onClick={() => {
                    toggleLanguage();
                    setIsOpen(false);
                  }}
                  className="w-full border-2 border-yellow-400 text-yellow-300 bg-slate-700 hover:bg-yellow-400 hover:text-slate-900 font-medium py-3 shadow-lg"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Switch to Bahasa Malaysia' : 'Switch to English'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;