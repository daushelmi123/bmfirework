
import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { Product } from '../data/products';

interface FilteredProductsProps {
  filteredProducts: Product[];
  selectedCategory: string;
  onAddToCart: (product: Product) => void;
}

const FilteredProducts = ({ filteredProducts, selectedCategory, onAddToCart }: FilteredProductsProps) => {
  const { t } = useLanguage();

  const getCategoryTranslation = (categoryName: string) => {
    switch (categoryName) {
      case 'MERDEKA FIREWORKS':
        return t('products.category.premium');
      case "SPARKLE & SHINE - KIDS' FAVORITE FIREWORKS!":
        return t('products.category.sparkle');
      case "KIDS' FIRECRACKERS":
        return t('products.category.kidsFirecrackers');
      case 'POP-POP':
        return t('products.category.poppop');
      case 'FOUNTAIN BLAST':
        return t('products.category.fountainBlast');
      case 'ONE SHOT, BIG BLAST!':
        return t('products.category.oneshot');
      case 'ROCKET SKY SHOW':
        return t('products.category.rocket');
      case 'RED DRAGON FIRECRACKERS':
        return t('products.category.reddragon');
      default:
        return categoryName;
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-10 bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent">
        {getCategoryTranslation(selectedCategory)} ({filteredProducts.length} {t('common.products')})
      </h2>
      <div className="space-y-4">
        {filteredProducts.map((product, index) => (
          <ProductCard
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

export default FilteredProducts;
