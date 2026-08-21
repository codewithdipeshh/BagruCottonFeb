export type SareeCategory = {
  slug: string;
  name: string;
  filterId: string; 
};

export const sareeCategories: SareeCategory[] = [
  { 
    slug: 'mulmul-cotton', 
    name: 'Mulmul Cotton Sarees', 
    filterId: 'mulmul_cotton_sarees' 
  },
  {
    slug: 'cotton-handblock',
    name: 'Cotton HandBlock Sarees',
    filterId: 'cotton_handblock_sarees',
  },
  { 
    slug: 'cotton-linen', 
    name: 'Cotton Linen Saree', 
    filterId: 'cotton_linen_saree' 
  },
  { 
    slug: 'maheshwari-silk', 
    name: 'Maheshwari Silk Saree', 
    filterId: 'maheshwari_silk_saree' 
  },
  { 
    slug: 'kota-doria-silk', 
    name: 'Kota Doria Silk', 
    filterId: 'kota_doria_silk' 
  },
  { 
    slug: 'chanderi-silk', 
    name: 'Chanderi Silk Saree', 
    filterId: 'chanderi_silk_saree' 
  },
];

export function getCategoryBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return sareeCategories.find(
    (c) => c.slug === decodeURIComponent(slug).toLowerCase().trim()
  );
}