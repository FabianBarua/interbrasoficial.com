export interface ProductInfo {
  review: string;
  included: string | null;
  specs: string;
}

export interface ProductData {
  code: string;
  name: string;
  productCode: string | null;
  price: string;
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
