import { CATEGORIES } from "@/app/utils/constants";
import { useRef, useState } from "react";
import { IoRemoveCircleOutline, IoSearchOutline } from "react-icons/io5";

interface MultiSelectorChipProps {
  query: string;
  selected: string[];
  setQuery: (query: string) => void;
  setSelected: (selected: string) => void;
  removeTag: (tag: string) => void;
}

const MultiSelectorChip: React.FC<MultiSelectorChipProps> = ({
  query,
  setQuery,
  selected,
  setSelected,
  removeTag,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTags = CATEGORIES.filter(
    (item) =>
      item?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) &&
      !selected.includes(item)
  );

  const isDisable: boolean =
    !query?.trim() ||
    selected.filter(
      (item) =>
        item?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
    )?.length > 0;

  return (
    <div className='grid place-items-center'>
      <div className='relative  w-full  text-sm'>
        <label
          htmlFor={"brandCategory"}
          className='mb-2 block text-sm font-medium'
        >
          Choose brand category:
        </label>
        <div className='relative rounded-md'>
          <div className='relative'>
            <input
              ref={inputRef}
              type='text'
              id='brandCategory'
              value={query}
              onChange={(e) => setQuery(e.target.value.trimStart())}
              placeholder='Search or Select Categories'
              className='peer text-sm flex-1 caret-rose-600 block w-full  border rounded-md border-gray-300 py-2 pl-10  outline-2 placeholder:text-gray-500'
              onFocus={() => setMenuOpen(true)}
              onBlur={() => setMenuOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isDisable) {
                  setSelected(query);
                  setQuery("");
                  setMenuOpen(true);
                }
              }}
            />
            <IoSearchOutline className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
          </div>
        </div>
        {selected?.length ? (
          <div className='bg-[#eef1f8] rounded-md relative text-xs flex flex-wrap gap-1 p-2 mt-2'>
            {selected.map((tag) => {
              return (
                <div
                  key={tag}
                  className='rounded-full w-fit py-1.5 px-3 border border-gray-400 bg-gray-50 text-gray-500
                  flex items-center gap-2'
                >
                  {tag}
                  <div
                    className='cursor-pointer'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => removeTag(tag)}
                  >
                    <IoRemoveCircleOutline />
                  </div>
                </div>
              );
            })}
            <div className='w-full text-right'>
              <span
                className='text-gray-400 cursor-pointer'
                onClick={() => {
                  setSelected("clear-all");
                  inputRef.current?.focus();
                }}
              >
                Clear all
              </span>
            </div>
          </div>
        ) : null}

        {menuOpen ? (
          <div className='origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10'>
            <ul className='w-full'>
              {filteredTags?.length ? (
                filteredTags.map((tag, i) => (
                  <li
                    key={tag}
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setMenuOpen(false);
                      setSelected(tag);
                      setQuery("");
                      inputRef.current?.blur();
                    }}
                  >
                    {tag}
                  </li>
                ))
              ) : (
                <li className='block px-4 py-2 text-sm text-gray-700'>
                  No options available
                </li>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MultiSelectorChip;
