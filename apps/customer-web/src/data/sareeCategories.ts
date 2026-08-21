export type SareeCategory = {
  slug: string;
  name: string;
  filterId: string; 
};

export const sareeCategories: SareeCategory[] = [
  { 
    slug: 'cotton-mulmul', 
    name: 'Mulmul Cotton Sarees', 
    filterId: 'mulmul_cotton' 
  },
  {
    slug: 'handblock',
    name: 'Cotton HandBlock Sarees',
    filterId: 'cotton_handblock',
  },
  { 
    slug: 'linen-cotton', 
    name: 'Cotton Linen Saree', 
    filterId: 'cotton_linen' 
  },
  { 
    slug: 'maheshwari-silk', 
    name: 'Maheshwari Silk Saree', 
    filterId: 'maheshwari_silk' 
  },
  { 
    slug: 'kota-doria', 
    name: 'Kota Doria Silk', 
    filterId: 'kota_doria' 
  },
  { 
    slug: 'chanderi-bagru', 
    name: 'Chanderi Silk Saree', 
    filterId: 'chanderi_silk' 
  },
  {
    slug: 'khadi-cotton',
    name: 'Khadi Cotton Saree',
    filterId: 'khadi_cotton'
  },
  {
    slug: 'temple-border',
    name: 'Temple Border Saree',
    filterId: 'temple_border'
  },
];

export function getCategoryBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return sareeCategories.find(
    (c) => c.slug === decodeURIComponent(slug).toLowerCase().trim()
  );
}