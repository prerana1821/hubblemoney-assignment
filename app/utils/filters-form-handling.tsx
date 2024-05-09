import { ColumnItem, FilterFormData } from "@/types/app";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TABLE_COLUMNS } from "./constants";

export const filterFormInitialState = {
  currentPage: 1,
  brandName: "",
  brandCategory: {
    query: "",
    selected: [],
  },
  brandStatus: "",
  expirationDate: "",
  discountPercentage: "",
  selectedColumns: TABLE_COLUMNS.map((column) => column.value),
  tableRows: "10",
};

export const handleInputChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setFormData: Dispatch<SetStateAction<FilterFormData>>
) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};

export const clearInputValue = (
  name: string,
  setFormData: Dispatch<SetStateAction<FilterFormData>>
) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: "",
  }));
};

export const handleCheckboxChange = (
  value: ColumnItem,
  setFormData: Dispatch<SetStateAction<FilterFormData>>
) => {
  setFormData((prevFormData) => {
    const selectedValue = prevFormData.selectedColumns.find(
      (column) => column === value.value
    );

    const updatedSelectedColumns = selectedValue
      ? prevFormData.selectedColumns.filter((column) => column !== value.value)
      : [...prevFormData.selectedColumns, value.value];

    return {
      ...prevFormData,
      selectedColumns: updatedSelectedColumns,
    };
  });
};

export const handleQueryChange = (
  newQuery: string,
  setFormData: Dispatch<SetStateAction<FilterFormData>>
) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    brandCategory: {
      ...prevFormData.brandCategory,
      query: newQuery,
    },
  }));
};

export const handleSelectedChange = (
  newSelected: string,
  setFormData: Dispatch<SetStateAction<FilterFormData>>
) => {
  if (newSelected === "clear-all") {
    setFormData((prevFormData) => ({
      ...prevFormData,
      brandCategory: {
        ...prevFormData.brandCategory,
        selected: [],
      },
    }));
  } else {
    setFormData((prevFormData) => ({
      ...prevFormData,
      brandCategory: {
        ...prevFormData.brandCategory,
        selected: [...prevFormData.brandCategory.selected, newSelected],
      },
    }));
  }
};

export const handleRemoveTagChange = (
  tagToRemove: string,
  setFormData: Dispatch<SetStateAction<FilterFormData>>
) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    brandCategory: {
      ...prevFormData.brandCategory,
      selected: prevFormData.brandCategory.selected.filter(
        (tag) => tag !== tagToRemove
      ),
    },
  }));
};

export const handleQueryParam = (
  paramKey: string,
  paramValue: string,
  searchParams: URLSearchParams,
  setFormData: Dispatch<SetStateAction<FilterFormData>>
) => {
  switch (paramKey) {
    case "page":
      if (!isNaN(parseInt(paramValue))) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          currentPage: parseInt(paramValue),
        }));
      }
      break;
    case "brandName":
      setFormData((prevFormData) => ({
        ...prevFormData,
        brandName: paramValue,
      }));
      break;
    case "brandCategory":
      setFormData((prevFormData) => ({
        ...prevFormData,
        brandCategory: {
          ...prevFormData.brandCategory,
          selected: searchParams.getAll(paramKey),
        },
      }));
      break;
    case "brandStatus":
      setFormData((prevFormData) => ({
        ...prevFormData,
        brandStatus: paramValue,
      }));
      break;
    case "expirationDate":
      setFormData((prevFormData) => ({
        ...prevFormData,
        expirationDate: paramValue,
      }));
      break;
    case "discountPercentage":
      setFormData((prevFormData) => ({
        ...prevFormData,
        discountPercentage: paramValue,
      }));
      break;
    case "tableRows":
      setFormData((prevFormData) => ({
        ...prevFormData,
        tableRows: paramValue,
      }));
      break;
    case "selectedColumns":
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedColumns: searchParams.getAll(paramKey),
      }));
      break;
    default:
      break;
  }
};
