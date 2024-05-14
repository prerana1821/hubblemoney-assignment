"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CheckboxList from "@/app/components/shared/checkbox-list";
import LabeledInput from "@/app/components/shared/labeled-input";
import LabeledSelect from "@/app/components/shared/labeled-select";
import MultiSelectorChip from "@/app/components/shared/multi-selector";
import useDebounce from "@/hooks/useDebounce";
import {
  BRAND_STATUS,
  ROW_OPTIONS,
  TABLE_COLUMNS,
} from "@/app/utils/constants";
import {
  clearInputValue,
  filterFormInitialState,
  handleCheckboxChange,
  handleInputChange,
  handleQueryChange,
  handleRemoveTagChange,
  handleSelectedChange,
  handleQueryParam,
} from "@/app/utils/filters-form-handling";
import { GrStatusGood } from "react-icons/gr";
import { CiCalendarDate, CiDiscount1 } from "react-icons/ci";
import { MdOutlinePersonOutline } from "react-icons/md";
import { BsListColumnsReverse } from "react-icons/bs";
import { FilterFormData } from "@/types/app";
import queryString from "query-string";

const TableFilters = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FilterFormData>(
    filterFormInitialState
  );

  const debouncedValue = useDebounce({
    value: formData.brandName,
    delay: 300,
  });

  useEffect(() => {
    const { currentPage, ...formDataWithoutPage } = formData;
    const brandName = formData.brandName.length === 0 ? "" : debouncedValue;
    const brandCategory = formData.brandCategory.selected;
    const queryParams = queryString.stringify(
      {
        ...formDataWithoutPage,
        brandName,
        brandCategory,
        brandStatus: formData.brandStatus,
        page: currentPage,
      },
      {
        skipEmptyString: true,
      }
    );

    replace(`${pathname}${queryParams ? "?" + queryParams : ""}`);
  }, [debouncedValue, formData, pathname, replace, formData.brandName]);

  useEffect(() => {
    searchParams.forEach((value, key) =>
      handleQueryParam(key, value, searchParams, setFormData)
    );
  }, [searchParams]);

  return (
    <>
      <MultiSelectorChip
        query={formData.brandCategory.query}
        selected={formData.brandCategory?.selected}
        setQuery={(newQuery) => handleQueryChange(newQuery, setFormData)}
        setSelected={(newSelected) =>
          handleSelectedChange(newSelected, setFormData)
        }
        removeTag={(tagToRemove) =>
          handleRemoveTagChange(tagToRemove, setFormData)
        }
      />
      <div className='flex flex-row justify-between align-middle mt-4'>
        <LabeledInput
          id='brandName'
          type='text'
          label={"Search by brand name"}
          name='brandName'
          value={formData.brandName}
          onChange={(e) => handleInputChange(e, setFormData)}
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
          onChange={(e) => handleInputChange(e, setFormData)}
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
        </LabeledSelect>
        <LabeledInput
          id='expirationDate'
          type='datetime-local'
          label={"Minimum Voucher Expiry:"}
          clearInputValue={(name) => clearInputValue(name, setFormData)}
          name='expirationDate'
          value={formData.expirationDate}
          onChange={(e) => handleInputChange(e, setFormData)}
          className='block w-full rounded-md border-gray-300'
          icon={CiCalendarDate}
        />
        <LabeledInput
          id='discountPercentage'
          type='number'
          label={"Minimum Discount %"}
          name='discountPercentage'
          value={formData.discountPercentage}
          onChange={(e) => handleInputChange(e, setFormData)}
          placeholder='Discount Percentage'
          icon={CiDiscount1}
          className='block w-full rounded-md border-gray-300'
        />
        <CheckboxList
          items={TABLE_COLUMNS}
          checkedItems={formData.selectedColumns}
          onCheckboxChange={(value) => handleCheckboxChange(value, setFormData)}
        />
        <LabeledSelect
          id='tableRows'
          label='Rows per page'
          name='tableRows'
          value={formData.tableRows}
          onChange={(e) => handleInputChange(e, setFormData)}
          icon={BsListColumnsReverse}
        >
          {ROW_OPTIONS.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </LabeledSelect>
      </div>
    </>
  );
};

export default TableFilters;
