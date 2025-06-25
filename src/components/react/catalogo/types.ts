export interface ProductInfo {
  review: string;
  included: string | null;
  specs: string;
}


export interface fixedPromo {
  fixedPrice: number
}

export interface promotion {
  type: {
    id: number;
    name: 'fijo';
    description: string;
  } | null;
  data: {
    id: number;
    catalog_id: number;
    type_id: number;
    data: fixedPromo;
    active: boolean;
  } | null;
}

export interface ProductData {
  code: string;
  name: string;
  productCode: string | null;
  price: string;
  promotion: promotion;
  color: string;
  show: boolean;
  productPerBox: number;
  volt: string | null;
  registered: boolean;
  originalName: string;
  info: ProductInfo;
  photo: string | undefined;
}

export interface GroupedByCategory {
  [key: string]: {
    products: ProductData[];
    categoryName: string;
    categoryDescription: string;
    categoryShortDescription: string;
  };
}
