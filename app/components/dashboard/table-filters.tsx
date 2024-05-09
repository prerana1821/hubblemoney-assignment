"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import CheckboxList from "../shared/checkbox-list";
import LabeledInput from "../shared/labeled-input";
import LabeledSelect from "../shared/labeled-select";
import MultiSelectorChip from "../shared/multi-selector";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { ColumnItem, FilterFormData } from "@/types/app";
import useDebounce from "@/hooks/useDebounce";
import { BRAND_STATUS, TABLE_COLUMNS } from "@/app/utils/constants";
import { GrStatusGood } from "react-icons/gr";
import { CiCalendarDate, CiDiscount1 } from "react-icons/ci";
import { MdOutlinePersonOutline, MdOutlineTableRows } from "react-icons/md";
import { BsListColumnsReverse } from "react-icons/bs";

const TableFilters = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FilterFormData>({
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
  });

  console.log({ formData });

  const debouncedValue = useDebounce({
    value: formData.brandName,
    delay: 300,
  });

  useEffect(() => {
    const queryParams = queryString.stringify(
      {
        ...formData,
        brandName: formData.brandName.length === 0 ? "" : debouncedValue,
        brandCategory: formData.brandCategory.selected,
        brandStatus: formData.brandStatus,
        page: 1,
      },
      {
        skipEmptyString: true,
      }
    );

    console.log(queryString.parse(queryParams));

    replace(`${pathname}${queryParams ? "?" + queryParams : ""}`);
  }, [debouncedValue, formData, pathname, replace, formData.brandName]);

  useEffect(() => {
    const brandNameFromParams = searchParams.get("brandName");
    if (brandNameFromParams !== null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        brandName: brandNameFromParams,
      }));
    }

    if (searchParams.get("brandCategory")) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        brandCategory: {
          ...prevFormData.brandCategory,
          selected: searchParams.getAll("brandCategory"),
        },
      }));
    }

    const brandStatusFromParams = searchParams.get("brandStatus");
    if (brandStatusFromParams !== null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        brandStatus: brandStatusFromParams,
      }));
    }

    const expirationDateFromParams = searchParams.get("expirationDate");
    if (expirationDateFromParams !== null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        expirationDate: expirationDateFromParams,
      }));
    }

    const discountPercentageFromParams = searchParams.get("discountPercentage");
    if (discountPercentageFromParams !== null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        discountPercentage: discountPercentageFromParams,
      }));
    }

    const tableRowsFromParams = searchParams.get("tableRows");
    if (tableRowsFromParams !== null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tableRows: tableRowsFromParams,
      }));
    }

    if (searchParams.get("selectedColumns")) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedColumns: searchParams.getAll("selectedColumns"),
      }));
    }
  }, [searchParams]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log({ name, value });

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const clearInputValue = (name: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: "",
    }));
  };

  const handleCheckboxChange = (value: ColumnItem) => {
    setFormData((prevFormData) => {
      const selectedValue = prevFormData.selectedColumns.find(
        (column) => column === value.value
      );

      const updatedSelectedColumns = selectedValue
        ? prevFormData.selectedColumns.filter(
            (column) => column !== value.value
          )
        : [...prevFormData.selectedColumns, value.value];

      return {
        ...prevFormData,
        selectedColumns: updatedSelectedColumns,
      };
    });
  };

  const handleQueryChange = (newQuery: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      brandCategory: {
        ...prevFormData.brandCategory,
        query: newQuery,
      },
    }));
  };

  const handleSelectedChange = (newSelected: string) => {
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

  const handleRemoveTagChange = (tagToRemove: string) => {
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

  return (
    <>
      <MultiSelectorChip
        query={formData.brandCategory.query}
        selected={formData.brandCategory?.selected}
        setQuery={handleQueryChange}
        setSelected={handleSelectedChange}
        removeTag={handleRemoveTagChange}
      />
      <div className='flex flex-row justify-between align-middle mt-4'>
        <LabeledInput
          id='brandName'
          type='text'
          label={"Search by brand name"}
          name='brandName'
          value={formData.brandName}
          onChange={handleInputChange}
          required={true}
          placeholder='Brand Name'
          icon={MdOutlinePersonOutline}
          className='block w-full rounded-md border-gray-300'
        />
        <LabeledSelect
          id='brandStatus'
          label='Choose brand status:'
          name='brandStatus'
          className='block w-full rounded-md border-gray-300'
          value={formData.brandStatus}
          onChange={handleInputChange}
          icon={GrStatusGood}
        >
          <option value='' disabled>
            Select a status
          </option>
          {BRAND_STATUS.map((status) => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
          <option value=''>All statuses</option>
        </LabeledSelect>
        <LabeledInput
          id='expirationDate'
          type='datetime-local'
          label={"Minimum Voucher Expiry:"}
          clearInputValue={clearInputValue}
          name='expirationDate'
          value={formData.expirationDate}
          onChange={handleInputChange}
          className='block w-full rounded-md border-gray-300'
          icon={CiCalendarDate}
        />
        <LabeledInput
          id='discountPercentage'
          type='number'
          label={"Minimum Discount %"}
          name='discountPercentage'
          value={formData.discountPercentage}
          onChange={handleInputChange}
          placeholder='Discount Percentage'
          icon={CiDiscount1}
          className='block w-full rounded-md border-gray-300'
        />
        <CheckboxList
          items={TABLE_COLUMNS}
          checkedItems={formData.selectedColumns}
          onCheckboxChange={handleCheckboxChange}
        />
        <LabeledSelect
          id='tableRows'
          label='Rows per page'
          name='tableRows'
          value={formData.tableRows}
          onChange={handleInputChange}
          icon={BsListColumnsReverse}
        >
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='30'>30</option>
          <option value='40'>40</option>
          <option value='50'>50</option>
        </LabeledSelect>
      </div>
    </>
  );
};

export default TableFilters;
