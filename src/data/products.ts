export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'men' | 'women' | 'sports' | 'casual' | 'formal';
  image: string;
  images: string[];
  sizes: number[];
  colors: string[];
  description: string;
  rating: number;
  reviews: number;
  isTrending?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Oxford Premium',
    price: 45,
    originalPrice: 55,
    category: 'formal',
    image: '/assets/product-mens-formal.jpg',
    images: ['/assets/product-mens-formal.jpg'],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ['Black', 'Brown'],
    description: 'Handcrafted premium leather Oxford shoes with a timeless silhouette. Perfect for formal occasions and business meetings.',
    rating: 4.8,
    reviews: 124,
    isTrending: true,
  },
  {
    id: '2',
    name: 'Elegance Ballet Flat',
    price: 35,
    category: 'women',
    image: '/assets/product-womens.jpg',
    images: ['/assets/product-womens.jpg'],
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ['Blush', 'Black', 'Nude'],
    description: 'Sophisticated ballet flats crafted from the finest leather. Elegant comfort for every occasion.',
    rating: 4.9,
    reviews: 89,
    isTrending: true,
  },
  {
    id: '3',
    name: 'AeroRun Performance',
    price: 55,
    originalPrice: 65,
    category: 'sports',
    image: '/assets/product-sports.jpg',
    images: ['/assets/product-sports.jpg'],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    colors: ['White', 'Black', 'Grey'],
    description: 'Ultra-lightweight performance running shoes with advanced cushioning technology. Built for speed and comfort.',
    rating: 4.7,
    reviews: 203,
    isTrending: true,
    isNew: true,
  },
  {
    id: '4',
    name: 'Milano Leather Loafer',
    price: 42,
    category: 'casual',
    image: '/assets/product-casual.jpg',
    images: ['/assets/product-casual.jpg'],
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ['Tan', 'Dark Brown', 'Black'],
    description: 'Premium Italian-inspired leather loafers. The perfect blend of casual sophistication and all-day comfort.',
    rating: 4.6,
    reviews: 156,
    isTrending: true,
  },
  {
    id: '5',
    name: 'Executive Derby',
    price: 48,
    category: 'men',
    image: '/assets/product-mens-formal.jpg',
    images: ['/assets/product-mens-formal.jpg'],
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ['Black', 'Burgundy'],
    description: 'Distinguished Derby shoes with a sleek profile. Crafted for the modern gentleman who demands excellence.',
    rating: 4.8,
    reviews: 97,
  },
  {
    id: '6',
    name: 'CloudStep Sneaker',
    price: 38,
    category: 'casual',
    image: '/assets/product-sports.jpg',
    images: ['/assets/product-sports.jpg'],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: ['White', 'Cream', 'Navy'],
    description: 'Minimalist sneakers with cloud-like cushioning. Versatile enough for any casual outfit.',
    rating: 4.5,
    reviews: 312,
    isNew: true,
  },
  {
    id: '7',
    name: 'Athena Stiletto',
    price: 52,
    originalPrice: 65,
    category: 'women',
    image: '/assets/product-womens.jpg',
    images: ['/assets/product-womens.jpg'],
    sizes: [36, 37, 38, 39, 40],
    colors: ['Black', 'Red', 'Nude'],
    description: 'Statement stiletto heels that command attention. Luxurious design meets unparalleled craftsmanship.',
    rating: 4.7,
    reviews: 78,
    isTrending: true,
  },
  {
    id: '8',
    name: 'TrailBlazer Hiking Boot',
    price: 62,
    category: 'sports',
    image: '/assets/product-casual.jpg',
    images: ['/assets/product-casual.jpg'],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ['Brown', 'Black', 'Olive'],
    description: 'Rugged hiking boots built for adventure. Waterproof leather upper with advanced grip sole.',
    rating: 4.6,
    reviews: 145,
  },
];

export const categories = [
  { id: 'men', name: "Men's Shoes", count: 45 },
  { id: 'women', name: "Women's Shoes", count: 38 },
  { id: 'sports', name: 'Sports Shoes', count: 32 },
  { id: 'casual', name: 'Casual Shoes', count: 28 },
  { id: 'formal', name: 'Formal Shoes', count: 22 },
] as const;
