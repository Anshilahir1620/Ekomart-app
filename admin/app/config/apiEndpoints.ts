export const API_ENDPOINTS = {
  ROLES: 'roles',
  BANNERS: 'banner',
  PRODUCT_CATEGORY: 'productcategory',
  SUBCATEGORY: 'productsSubCategory',
  PRODUCT_TYPE: 'Producttype',
  DIETARY: 'dietary',
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];       