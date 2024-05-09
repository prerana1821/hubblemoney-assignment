import { BsFillClipboard2DataFill } from "react-icons/bs";
import {
  MdOutlineDoNotDisturbOff,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import { TbCalendarCancel } from "react-icons/tb";

export const CATEGORIES = [
  "Food",
  "One stop shop",
  "Groceries",
  "Travel & transport",
  "Jewellery",
  "Entertainment",
  "Fashion",
  "Gaming",
  "Hotels",
  "Electronics",
] as const;

export const TABLE_COLUMNS = [
  { label: "Name", value: "Brand Name" },
  { label: "Category", value: "Brand Category" },
  { label: "Status", value: "Brand Status" },
  { label: "Highlights", value: "Voucher Highlights" },
  { label: "Expiry Date", value: "Voucher Expiry Date" },
  { label: "Discount %", value: "Voucher Discount" },
];

export const BRAND_STATUS = ["Active", "Inactive"] as const;

export const CARD_ICONS = {
  totalCount: BsFillClipboard2DataFill,
  activeCount: MdOutlineWorkspacePremium,
  expiredCount: TbCalendarCancel,
  inactiveCount: MdOutlineDoNotDisturbOff,
};
