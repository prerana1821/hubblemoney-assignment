import { Highlight } from "./app";
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
  category: "groceries" | "fashion" | "beauty" | "travel";
  status: "active" | "inactive" | "verified";
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
  brandName: string;
  brandLogoPath: string;
  brandStatus: string;
  brandCategory: string;
  highlights: string[];
  expirationDate: string;
  discountPercentage: string;
}
