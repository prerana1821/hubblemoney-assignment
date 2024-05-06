import CheckboxList from "../shared/checkbox-list";
import LabeledInput from "../shared/labeled-input";
import LabeledSelect from "../shared/labeled-select";
import MultiSelectorChip from "../shared/multi-selector";

const TableFilters = () => {
  return (
    <div>
      <LabeledInput
        id='brandName'
        type='text'
        label={"Search by brand name"}
        name='brandName'
        value={formData.name}
        onChange={(e) => handleBrandChange(e)}
        required={true}
        placeholder='Brand Name'
        className='mt-1 block w-full rounded-md border-gray-300'
      />
      <MultiSelectorChip query='d' selected={[]} setQuery={} setSelected={} />
      <LabeledSelect
        id='status'
        label='Choose brand status:'
        name='status'
        value={formData.category}
        onChange={handleBrandChange}
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
        onChange={handleVoucherChange}
        className='mt-1 block w-full rounded-md border-gray-300'
      />
      <LabeledInput
        id='discountPercentage'
        type='number'
        label={"Minimun Discount %"}
        name='discountPercentage'
        value={formData.discountPercentage}
        onChange={handleVoucherChange}
        placeholder='Discount Percentage'
        className='mt-1 block w-full rounded-md border-gray-300'
      />
      <CheckboxList
        items={[
          { label: "Vue JS", value: "vue" },
          { label: "React", value: "react" },
          { label: "Angular", value: "angular" },
          { label: "Laravel", value: "laravel" },
        ]}
        checkedItems={checkedItems}
        onCheckboxChange={handleCheckboxChange}
      />
      <LabeledSelect
        id='tableRows'
        label=' Rows per page'
        name='tableRows'
        value={formData.category}
        onChange={handleBrandChange}
      >
        <option value='' disabled>
          Select table rows
        </option>
        <option value='10'>10</option>
        <option value='20'>20</option>
        <option value='30'>30</option>
        <option value='40'>40</option>
        <option value='50'>50</option>
      </LabeledSelect>
    </div>
  );
};

export default TableFilters;
