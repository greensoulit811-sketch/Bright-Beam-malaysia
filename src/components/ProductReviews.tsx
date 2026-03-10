import { Star } from 'lucide-react';
import { useProductReviews } from '@/hooks/useReviews';

const ProductReviews = ({ productId }: { productId: string }) => {
  const { data: reviews = [] } = useProductReviews(productId);

  if (reviews.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-border">
      <h2 className="heading-display text-2xl md:text-4xl font-bold mb-8 text-foreground">Customer Reviews</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map(review => (
          <div key={review.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              {review.reviewer_image ? (
                <img src={review.reviewer_image} alt="" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-heading text-sm font-bold text-primary">
                  {review.reviewer_name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-body text-sm font-bold text-foreground">{review.reviewer_name}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-border'}`} />
                  ))}
                </div>
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{review.review_text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductReviews;
