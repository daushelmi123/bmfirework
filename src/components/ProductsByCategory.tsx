
import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { Product, Category } from '../data/products';

interface ProductsByCategoryProps {
  categories: Category[];
  searchTerm: string;
  onAddToCart: (product: Product) => void;
}

const ProductsByCategory = ({ categories, searchTerm, onAddToCart }: ProductsByCategoryProps) => {
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
    <>
      {categories.map((category) => (
        <div key={category.name} className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent">
              {getCategoryTranslation(category.name)}
            </h2>
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
              {category.products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).length} produk
            </span>
          </div>
          <div className="space-y-4">
            {category.products
              .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((product, index) => (
                <ProductCard
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

export default ProductsByCategory;
