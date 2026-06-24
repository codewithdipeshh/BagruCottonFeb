import type { ProductId, SareeProduct } from '../types/product';

const img = (base: string, variant: number) =>
  `${base}${base.includes('?') ? '&' : '?'}v=${variant}`;

const P = {
  mulmul1:
    'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1200',
  mulmul2:
    'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1200',
  mulmul3:
    'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=1200',
  mulmul4:
    'https://images.pexels.com/photos/1096146/pexels-photo-1096146.jpeg?auto=compress&cs=tinysrgb&w=1200',
  handblock1:
    'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200',
  handblock2:
    'https://images.unsplash.com/photo-1618244972963-dbad68f7d884?q=80&w=1200&auto=format&fit=crop',
  handblock3:
    'https://images.unsplash.com/photo-1583391265517-35bbadd01209?q=80&w=1200&auto=format&fit=crop',
  handblock4:
    'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?q=80&w=1200&auto=format&fit=crop',
  kota1:
    'https://images.pexels.com/photos/7679459/pexels-photo-7679459.jpeg?auto=compress&cs=tinysrgb&w=1200',
  kota2:
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
  kota3:
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
  kota4:
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
  silk1:
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200',
  silk2:
    'https://images.unsplash.com/photo-1610030470215-6677f5f4ef48?auto=format&fit=crop&w=1200&q=80',
  silk3:
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop',
  silk4:
    'https://images.unsplash.com/photo-1603251579431-8041402bdeda?q=80&w=1200&auto=format&fit=crop',
  linen1:
    'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=1200',
  linen2:
    'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1200',
  linen3:
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80',
  linen4:
    'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200',
  chanderi1:
    'https://images.pexels.com/photos/1096146/pexels-photo-1096146.jpeg?auto=compress&cs=tinysrgb&w=1200',
  chanderi2:
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop',
  chanderi3:
    'https://images.unsplash.com/photo-1610189020382-668f692b5b2f?q=80&w=1200&auto=format&fit=crop',
  chanderi4:
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1200&auto=format&fit=crop',
};

export const sareeProducts: SareeProduct[] = [
  {
    id: 1,
    name: 'Royal Cotton Mulmul Saree',
    price: 2499,
    originalPrice: 2999,
    fabric: 'Cotton Mulmul',
    category: 'cotton',
    description:
      'Feather-light mulmul cotton with a fluid drape, hand-finished for everyday elegance and festive grace.',
    images: [P.mulmul1, P.mulmul2, P.mulmul3, P.mulmul4],
    rating: 4.9,
    inStock: true,
  },
  {
    id: 2,
    name: 'Imperial Linen Cotton Saree',
    price: 3299,
    originalPrice: 3999,
    fabric: 'Linen Cotton',
    category: 'linen',
    description:
      'Breathable linen-cotton blend with subtle texture, ideal for summer soirées and daytime celebrations.',
    images: [P.linen1, P.linen2, P.linen3, P.linen4],
    rating: 4.8,
    inStock: true,
  },
  {
    id: 3,
    name: 'Delicate Kota Doria Saree',
    price: 2799,
    originalPrice: 3499,
    fabric: 'Kota Doria',
    category: 'kota',
    description:
      'Signature Kota checks woven with pure cotton and silk threads for an airy, translucent silhouette.',
    images: [P.kota1, P.kota2, P.kota3, P.kota4],
    rating: 4.7,
    inStock: false,
  },
  {
    id: 4,
    name: 'Traditional Handblock Print Saree',
    price: 1999,
    originalPrice: 2499,
    fabric: 'Handblock Print',
    category: 'handblock',
    description:
      'Ancestral wooden blocks and natural dyes create one-of-a-kind motifs on soft, premium cotton.',
    images: [P.handblock1, P.handblock2, P.handblock3, P.handblock4],
    rating: 5,
    inStock: true,
  },
  {
    id: 5,
    name: 'Regal Maheshwari Silk Saree',
    price: 4499,
    originalPrice: 5499,
    fabric: 'Maheshwari Silk',
    category: 'maheshwari',
    description:
      'Lustrous Maheshwari silk with reversible borders — a heirloom piece for weddings and rituals.',
    images: [P.silk1, P.silk2, P.silk3, P.silk4],
    rating: 4.9,
    inStock: true,
  },
  {
    id: 6,
    name: 'Vintage Chanderi Bagru Saree',
    price: 2299,
    originalPrice: 2799,
    fabric: 'Chanderi Bagru',
    category: 'chanderi',
    description:
      'Chanderi sheen meets Bagru block artistry in a drape that balances tradition with contemporary poise.',
    images: [P.chanderi1, P.chanderi2, P.chanderi3, P.chanderi4],
    rating: 4.8,
    inStock: true,
  },
  {
    id: 7,
    name: 'Royal Mulmul Saree',
    price: 2499,
    originalPrice: 3499,
    fabric: 'Cotton Mulmul',
    category: 'Cotton Mulmul',
    description:
      'A flagship mulmul masterpiece — whisper-soft, naturally dyed, and finished by Jaipur master weavers.',
    images: [P.mulmul1, img(P.mulmul2, 2), img(P.mulmul3, 3), img(P.mulmul4, 4)],
    badge: 'Featured',
    inStock: true,
  },
  {
    id: 8,
    name: 'Bagru Handblock Saree',
    price: 3299,
    originalPrice: 4299,
    fabric: 'Handblock Print',
    category: 'Handblock Print',
    description:
      'Mud-resist dabu printing on premium cotton — each motif stamped by hand with vegetable pigments.',
    images: [P.handblock1, img(P.handblock2, 2), img(P.handblock3, 3), img(P.handblock4, 4)],
    badge: 'Featured',
    inStock: true,
  },
  {
    id: 9,
    name: 'Elegant Kota Doria',
    price: 2899,
    originalPrice: 3899,
    fabric: 'Kota Doria',
    category: 'Kota Doria',
    description:
      'Fine Kota weave with delicate checks — lightweight luxury crafted for warm-climate sophistication.',
    images: [P.kota1, img(P.kota2, 2), img(P.kota3, 3), img(P.kota4, 4)],
    badge: 'Featured',
    inStock: true,
  },
  {
    id: 10,
    name: 'Premium Silk Saree',
    price: 4599,
    originalPrice: 5599,
    fabric: 'Maheshwari Silk',
    category: 'Maheshwari Silk',
    description:
      'Rich silk body with gold-toned border detailing — an statement drape for grand occasions.',
    images: [P.silk1, img(P.silk2, 2), img(P.silk3, 3), img(P.silk4, 4)],
    badge: 'Featured',
    inStock: true,
  },
  {
    id: 11,
    name: 'Kota Doriya Saree — Terracotta Mustard',
    price: 1699,
    originalPrice: 3398,
    fabric: 'Kota Doriya',
    category: 'Kota Doriya',
    description:
      'Woven with high-quality pure cotton and silk threads. Features traditional checks characteristic of authentic Kota Doriya weavers.',
    images: [P.kota2, P.kota1, P.kota3, P.kota4],
    discount: 'Save 50%',
    color: 'Terracotta Mustard',
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 12,
    name: 'Kota Doriya Saree — Aubergine Plum',
    price: 1699,
    originalPrice: 3398,
    fabric: 'Kota Doriya',
    category: 'Kota Doriya',
    description:
      'Rich plum hues printed with slow heritage block-printing techniques. Lightweight, breathable, and exceptionally graceful.',
    images: [P.kota3, P.kota2, P.kota4, P.kota1],
    discount: 'Save 50%',
    color: 'Aubergine Plum',
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 13,
    name: 'Kota Doriya Saree — Charcoal Black',
    price: 1699,
    originalPrice: 3398,
    fabric: 'Kota Doriya',
    category: 'Kota Doriya',
    description:
      'Elegant charcoal base with traditional handblock paisley motifs and gold-toned zari piping.',
    images: [P.kota4, P.kota3, P.kota2, P.kota1],
    discount: 'Save 50%',
    color: 'Charcoal Black',
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 14,
    name: 'Summer Special Kota Saree',
    price: 1699,
    originalPrice: 3398,
    fabric: 'Kota Doriya',
    category: 'Summer Special',
    description:
      'Terracotta red earthy tones inspired by Rajasthani clay. Curated for light, breathable high-summer luxury wear.',
    images: [P.linen3, P.kota2, P.kota3, P.kota4],
    discount: 'Save 50%',
    color: 'Earth Red',
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 15,
    name: 'Chanderi Silk Kota Saree',
    price: 2299,
    originalPrice: 4598,
    fabric: 'Chanderi Silk',
    category: 'Chanderi Silk',
    description:
      'A magnificent blend of royal Chanderi silk with Kota checks weave. Recommended for festive gatherings.',
    images: [P.silk2, P.chanderi1, P.chanderi2, P.chanderi3],
    discount: 'Save 50%',
    color: 'Emerald Olive',
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 16,
    name: 'Handblock Mangalgiri Saree',
    price: 1999,
    originalPrice: 3998,
    fabric: 'Mangalgiri Cotton',
    category: 'Mangalgiri',
    description:
      'Genuine handloomed Mangalgiri cotton dyed in organic indigo fermentation vats. Naturally hypoallergenic.',
    images: [P.handblock3, P.handblock1, P.handblock2, P.handblock4],
    discount: 'Save 50%',
    color: 'Natural Indigo',
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 17,
    name: 'Ajrakh Print Cotton Saree',
    price: 2499,
    originalPrice: 4998,
    fabric: 'Ajrakh Cotton',
    category: 'Ajrakh',
    description:
      'A 16-stage hand-printed masterpiece made by artisans of Kachchh. Complex geometric resists with exquisite detail.',
    images: [P.handblock4, P.handblock3, P.handblock2, P.handblock1],
    discount: 'Save 50%',
    color: 'Crimson & Indigo',
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 18,
    name: 'Classic Dabu Kota Saree',
    price: 1699,
    originalPrice: 3398,
    fabric: 'Kota Doriya',
    category: 'Kota Doriya',
    description:
      'Beautiful mud-resist Dabu block print over an ultra-fine Kota weave. Soft, premium natural textures.',
    images: [P.linen3, P.kota4, P.kota3, P.kota2],
    discount: 'Save 50%',
    color: 'Mud-resist Indigo',
    badge: 'Sale',
    inStock: true,
  },
];

export const featuredProductIds: ProductId[] = [7, 8, 9, 10];

export function getProductById(id: ProductId): SareeProduct | undefined {
  return sareeProducts.find(
    (product) => String(product.id) === String(id)
  );
}

export function getFeaturedProducts(): SareeProduct[] {
  return featuredProductIds
    .map((id) => getProductById(id))
    .filter((product): product is SareeProduct => Boolean(product));
}

export function getNewArrivals(): SareeProduct[] {
  return sareeProducts.filter((product) => product.id >= 11);
}

export function getCatalogProducts(): SareeProduct[] {
  return sareeProducts.filter((product) => product.id <= 6);
}
