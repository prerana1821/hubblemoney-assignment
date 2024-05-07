"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import CheckboxList from "../shared/checkbox-list";
import LabeledInput from "../shared/labeled-input";
import LabeledSelect from "../shared/labeled-select";
import MultiSelectorChip from "../shared/multi-selector";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { FilterFormData } from "@/types/app";

const columns = [
  { label: "Vue JS", value: "vue" },
  { label: "React", value: "react" },
  { label: "Angular", value: "angular" },
  { label: "Laravel", value: "laravel" },
];

const TableFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [formData, setFormData] = useState<FilterFormData>({
    brandName: "",
    brandCategory: {
      query: "",
      selected: [],
    },
    brandStatus: "",
    expirationDate: "",
    discountPercentage: "",
    selectedColumns: [],
    tableRows: "",
  });

  useEffect(() => {
    // const params = new URLSearchParams(searchParams);
    // params.set("page", "1");
    // Object.entries(formData).forEach(([key, value]) => {
    //   if (value && typeof value === "object" && !Array.isArray(value)) {
    //     const brandCategory = value as BrandCategory;
    //     if (
    //       "query" in brandCategory &&
    //       "selected" in brandCategory &&
    //       brandCategory.selected.length > 0
    //     ) {
    //       brandCategory.selected.forEach((selectedValue) => {
    //         params.append("brandCategory", selectedValue);
    //       });
    //     } else {
    //       console.error(
    //         `Invalid brandCategory object: ${JSON.stringify(brandCategory)}`
    //       );
    //     }
    //   } else if (Array.isArray(value) && value.length > 0) {
    //     if (key === "selectedColumns") {
    //       value.forEach((selectedValue) => {
    //         params.append(key, selectedValue);
    //       });
    //     } else {
    //       console.error(`Invalid selectedColumns`);
    //     }
    //   } else if (value) {
    //     params.set(key, value);
    //   } else {
    //     params.delete(key);
    //   }
    // });

    const queryParams = queryString.stringify(
      {
        ...formData,
        brandCategory: formData.brandCategory.selected,
        page: 1,
      },
      {
        skipEmptyString: true,
      }
    );
    // console.log(queryParams);

    replace(`${pathname}${queryParams ? "?" + queryParams : ""}`);
  }, [formData]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedSelectedColumns = [...formData.selectedColumns];
    const newValue = columns[index].value;
    const selectedIndex = updatedSelectedColumns.indexOf(newValue);

    if (selectedIndex === -1) {
      updatedSelectedColumns.push(newValue);
    } else {
      updatedSelectedColumns.splice(selectedIndex, 1);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedColumns: updatedSelectedColumns,
    }));
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
      {/* <div className='grid grid-cols-2 gap-4 items-start'> */}

      <MultiSelectorChip
        query={formData.brandCategory.query}
        selected={formData.brandCategory?.selected}
        setQuery={handleQueryChange}
        setSelected={handleSelectedChange}
        removeTag={handleRemoveTagChange}
      />
      {/* </div> */}
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
          className='mt-1 block w-full rounded-md border-gray-300'
        />
        <LabeledSelect
          id='status'
          label='Choose brand status:'
          name='status'
          value={formData.brandStatus}
          onChange={handleInputChange}
        >
          <option value='' disabled>
            Select a status
          </option>
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
          <option value='verified'>Verified</option>
        </LabeledSelect>
        <LabeledInput
          id='expirationDate'
          type='datetime-local'
          label={"Minimum Voucher Expiry Date:"}
          name='expirationDate'
          value={formData.expirationDate}
          onChange={handleInputChange}
          className='mt-1 block w-full rounded-md border-gray-300'
        />
        <LabeledInput
          id='discountPercentage'
          type='number'
          label={"Minimum Discount %"}
          name='discountPercentage'
          value={formData.discountPercentage}
          onChange={handleInputChange}
          placeholder='Discount Percentage'
          className='mt-1 block w-full rounded-md border-gray-300'
        />
        <CheckboxList
          items={columns}
          checkedItems={formData.selectedColumns}
          onCheckboxChange={handleCheckboxChange}
        />
        <LabeledSelect
          id='tableRows'
          label='Rows per page'
          name='tableRows'
          value={formData.tableRows}
          onChange={handleInputChange}
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
