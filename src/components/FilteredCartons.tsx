import CartonProductCard from './CartonProductCard';
import { useLanguage } from '../context/LanguageContext';
import { CartonProduct } from '../data/cartonProducts';

interface FilteredCartonsProps {
  filteredProducts: CartonProduct[];
  selectedCategory: string;
  onAddToCart: (product: CartonProduct) => void;
}

const FilteredCartons = ({ filteredProducts, selectedCategory, onAddToCart }: FilteredCartonsProps) => {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-10 bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent">
        {selectedCategory} ({filteredProducts.length} produk)
      </h2>
      <div className="space-y-4">
        {filteredProducts.map((product, index) => (
          <CartonProductCard
            key={product.id}
            product={product}
            onAddToCart={() => onAddToCart(product)}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default FilteredCartons;