import CartonProductCard from './CartonProductCard';
import { useLanguage } from '../context/LanguageContext';
import { CartonProduct, CartonCategory } from '../data/cartonProducts';

interface CartonsByCategoryProps {
  categories: CartonCategory[];
  searchTerm: string;
  onAddToCart: (product: CartonProduct) => void;
}

const CartonsByCategory = ({ categories, searchTerm, onAddToCart }: CartonsByCategoryProps) => {
  const { t } = useLanguage();

  return (
    <>
      {categories.map((category) => (
        <div key={category.name} className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent">
              {category.name}
            </h2>
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
              {category.products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).length} produk
            </span>
          </div>
          <div className="space-y-4">
            {category.products
              .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((product, index) => (
                <CartonProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => onAddToCart(product)}
                  index={index + 1}
                />
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default CartonsByCategory;