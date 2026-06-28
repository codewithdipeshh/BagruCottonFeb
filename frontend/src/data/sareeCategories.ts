export type SareeCategory = {
  slug: string;
  name: string;
  filterId: string; 
};

export const sareeCategories: SareeCategory[] = [
  { 
    slug: 'mulmul-cotton', 
    name: 'Mulmul Cotton Sarees', 
    filterId: 'mulmul_cotton' 
  },
  {
    slug: 'cotton-handblock',
    name: 'Cotton HandBlock Sarees',
    filterId: 'cotton_handblock',
  },
  { 
    slug: 'cotton-linen', 
    name: 'Cotton Linen Saree', 
    filterId: 'cotton_linen' 
  },
  { 
    slug: 'maheshwari-silk', 
    name: 'Maheshwari Silk Saree', 
    filterId: 'maheshwari_silk' 
  },
  { 
    slug: 'kota-doria-silk', 
    name: 'Kota Doria Silk', 
    filterId: 'kota_doria' 
  },
  { 
    slug: 'chanderi-silk', 
    name: 'Chanderi Silk Saree', 
    filterId: 'chanderi_silk' 
  },
];

export function getCategoryBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return sareeCategories.find(
    (c) => c.slug === decodeURIComponent(slug).toLowerCase().trim()
  );
}