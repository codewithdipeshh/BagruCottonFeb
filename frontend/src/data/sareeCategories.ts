export type SareeCategory = {
  slug: string;
  name: string;
  filterId: string;
};

export const sareeCategories: SareeCategory[] = [
  { slug: 'cotton-mulmul', name: 'Cotton Mulmul Sarees', filterId: 'cotton' },
  {
    slug: 'handblock',
    name: 'Handblock Printed Cotton Sarees',
    filterId: 'handblock',
  },
  { slug: 'linen-cotton', name: 'Linen Cotton Sarees', filterId: 'linen' },
  { slug: 'kota-doria', name: 'Kota Doria Sarees', filterId: 'kota' },
  { slug: 'chanderi-bagru', name: 'Chanderi Bagru Sarees', filterId: 'chanderi' },
  { slug: 'maheshwari-silk', name: 'Maheshwari Silk Sarees', filterId: 'maheshwari' },
];

export function getCategoryBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return sareeCategories.find(
    (c) => c.slug === decodeURIComponent(slug).toLowerCase()
  );
}
