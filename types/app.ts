import { BRAND_STATUS, CATEGORIES, COLUMN_NAMES } from "@/app/utils/constants";
import { SupabaseClient } from "@supabase/supabase-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, FormEvent, SetStateAction } from "react";
export interface UserDetails {
  id: string;
  full_name?: string;
  avatar_url?: string;
}

export interface BrandNames {
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
  currentPage: number;
  brandName: string;
  brandStatus: string;
  expirationDate: string;
  discountPercentage: string;
  brandCategory: BrandCategory;
  selectedColumns: (typeof COLUMN_NAMES)[number][];
  tableRows: string;
}

export interface ServerSideFilters
  extends Omit<FilterFormData, "brandCategory"> {
  brandCategory: string[] | string;
  currentPage: number;
}

export interface TableData {
  brandId: string;
  brandName: string;
  brandLogoPath: string;
  brandStatus: string;
  voucherId?: string;
  brandCategory: string;
  highlights: string[];
  expirationDate: string;
  discountPercentage: string;
}

export type BrandDataFromDB = Omit<BrandData, "logo"> & {
  logo_path: string;
  id: string;
};

export type VoucherDataFromDB = Omit<
  VoucherManagementData,
  "bannerImage" | "brandName"
> & {
  id: string;
  banner_path: string;
  brand: { id: string; name: string; category: (typeof CATEGORIES)[number] };
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

export interface VoucherFormState {
  brandName: { value: string; error: string | null };
  bannerImage: ImageFileData & {
    error: string | null;
  };
  discountPercentage: { value: number; error: string | null };
  expirationDate: { value: string; error: string | null };
  highlightsDescription: { value: string; error: string | null };
  FAQs: { question: string; answer: string; error: string | null }[];
  highlights: { title: string; text: string; error: string | null }[];
}

export type FormType = "brand" | "voucher";

export interface FormValidationData {
  name: { value: string; error: string | null };
  description?: { value: string; error: string | null };
  category?: { value: string; error: string | null };
  status?: { value: string; error: string | null };
  brandName?: { value: string; error: string | null };
  discountPercentage?: { value: number; error: string | null };
  expirationDate?: { value: string; error: string | null };
  highlightsDescription?: { value: string; error: string | null };
}

export interface ColumnItem {
  label: string;
  value: string;
}

export type StorageType = "brands" | "vouchers";

export type FormState = BrandFormState | VoucherFormState;

export enum FileType {
  BrandLogo = "brandLogo",
  VoucherBanner = "voucherBanner",
}

export interface HandleFormSubmitParams {
  event: FormEvent;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  formData: BrandFormState;
  setFormData: Dispatch<SetStateAction<BrandFormState>>;
  supabaseClient: SupabaseClient<any, "public", any>;
  router: AppRouterInstance;
  brand: BrandDataFromDB | undefined;
}

export interface VoucherFormSubmitParams
  extends Omit<HandleFormSubmitParams, "brand" | "formData" | "setFormData"> {
  formData: VoucherFormState;
  setFormData: Dispatch<SetStateAction<VoucherFormState>>;
  voucher?: VoucherDataFromDB;
  brandNames: BrandNames[];
}
