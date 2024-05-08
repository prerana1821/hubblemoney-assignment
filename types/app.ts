import { BRAND_STATUS, CATEGORIES } from "@/app/utils/constants";
export interface UserDetails {
  id: string;
  full_name?: string;
  avatar_url?: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface BrandData {
  logo: ImageFileData;
  name: string;
  description: string;
  category: (typeof CATEGORIES)[number];
  status: (typeof BRAND_STATUS)[number];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Highlight {
  title: string;
  text: string;
}

export interface VoucherManagementData {
  brandName: string;
  bannerImage: ImageFileData;
  discountPercentage: number;
  expirationDate: string;
  FAQs: FAQ[];
  highlightsDescription: string;
  highlights: Highlight[];
}

export interface ImageFileData {
  name: string;
  photo: string;
  type: string;
  size: number;
  file: File | null;
  path?: string;
}

export interface BrandCategory {
  query: string;
  selected: string[];
}

export interface FilterFormData {
  brandName: string;
  brandStatus: string;
  expirationDate: string;
  discountPercentage: string;
  brandCategory: BrandCategory;
  selectedColumns: string[];
  tableRows: string;
}

export interface ServerSideFilters
  extends Omit<FilterFormData, "brandCategory"> {
  brandCategory: string[];
  currentPage: number;
}

export interface TableData {
  brandId: string;
  brandName: string;
  brandLogoPath: string;
  brandStatus: string;
  brandCategory: string;
  highlights: string[];
  expirationDate: string;
  discountPercentage: string;
}

export interface MetadataItem {
  brandId: string;
  brandName: string;
  brandLogoPath: string;
  brandStatus: string;
  brandCategory: string;
  highlights: string[];
  expirationDate: string[];
  discountPercentage: number[];
}

export type BrandDataFromDB = Omit<BrandData, "logo"> & {
  logo_path: string;
  id: string;
};

export interface BrandFormState {
  logo: ImageFileData & {
    error: string | null;
  };
  name: {
    value: string;
    error: string | null;
  };
  description: {
    value: string;
    error: string | null;
  };
  category: {
    value: (typeof CATEGORIES)[number];
    error: string | null;
  };
  status: {
    value: (typeof BRAND_STATUS)[number];
    error: string | null;
  };
}
