import { Search, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLanguage } from '../context/LanguageContext';
import { cartonCategories } from '../data/cartonProducts';

interface CartonsSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  allProductsCount: number;
}

const CartonsSearch = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  allProductsCount
}: CartonsSearchProps) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 mb-12">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Cari produk carton..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-yellow-500/20 bg-white"
          />
        </div>

        {/* Category Filter Dropdown */}
        <div className="w-full lg:w-80">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-14 border-2 border-gray-200 bg-white text-gray-900 hover:bg-gray-50 rounded-xl text-lg focus:border-yellow-500 focus:ring-yellow-500/20">
              <SelectValue placeholder="Pilih kategori" />
              <ChevronDown className="h-5 w-5 opacity-50" />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
              <SelectItem 
                value="All" 
                className="hover:bg-yellow-50 focus:bg-yellow-50 text-gray-900 py-3 px-4 text-base"
              >
                Semua Kategori ({allProductsCount})
              </SelectItem>
              {cartonCategories.map((category) => (
                <SelectItem 
                  key={category.name} 
                  value={category.name}
                  className="hover:bg-yellow-50 focus:bg-yellow-50 text-gray-900 py-3 px-4 text-base"
                >
                  {category.name} ({category.products.length})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CartonsSearch;