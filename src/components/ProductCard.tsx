import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleWishlist, isInWishlist } = useCart();
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
        <div className="relative aspect-square overflow-hidden bg-secondary mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-gold text-accent-foreground px-3 py-1 text-xs font-body font-semibold tracking-wider uppercase">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute top-3 right-12 bg-destructive text-destructive-foreground px-3 py-1 text-xs font-body font-semibold tracking-wider uppercase">
              Sale
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full transition-colors hover:bg-background"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-gold text-gold' : 'text-foreground'}`} />
          </button>
        </div>
        <h3 className="font-heading text-base font-medium mb-1">{product.name}</h3>
        <div className="flex items-center gap-2 font-body text-sm">
          <span className="font-semibold">{product.price} KWD</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through">{product.originalPrice} KWD</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
