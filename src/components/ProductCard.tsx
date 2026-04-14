import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleWishlist, isInWishlist } = useCart();
  const { t } = useLanguage();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-card rounded-lg mb-4 border border-border">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
          <div className="absolute inset-0 bg-neon/0 group-hover:bg-neon/5 transition-colors duration-300" />
          {product.isNew && (
            <span className="absolute top-3 start-3 bg-neon text-accent-foreground px-3 py-1 text-xs font-body font-bold tracking-wider uppercase rounded-sm">
              {t('card.new')}
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute top-3 start-3 bg-hot text-accent-foreground px-3 py-1 text-xs font-body font-bold tracking-wider uppercase rounded-sm"
              style={product.isNew ? { insetInlineStart: '4.5rem' } : {}}
            >
              {t('card.sale')}
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className="absolute top-3 end-3 w-9 h-9 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full transition-all hover:bg-background hover:scale-110 border border-border"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-neon text-neon' : 'text-foreground'}`} />
          </button>
          <span className="absolute bottom-3 start-3 bg-background/90 backdrop-blur-sm px-2 py-1 text-xs font-body font-semibold tracking-wider uppercase rounded-sm text-foreground border border-border">
            {product.brand}
          </span>
        </div>
        <h3 className="font-heading text-base font-medium uppercase tracking-wide mb-1 text-foreground">{product.name}</h3>
        <p className="font-body text-xs text-muted-foreground mb-1">{product.brand}</p>
        <div className="flex items-center gap-2 font-body text-sm">
          <span className="font-bold text-neon">{product.price} BDT</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-xs">{product.originalPrice} BDT</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
