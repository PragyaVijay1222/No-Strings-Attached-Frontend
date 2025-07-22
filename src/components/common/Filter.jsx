import { useState, useRef, useEffect } from "react";

export const Filter = ({ onSortChange, onFilterChange, onReset }) => {
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [size, setSize] = useState("");

  const sortRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setShowSort(false);
      }
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterApply = () => {
    onFilterChange({ priceRange, size });
    setShowFilter(false);
  };

  const handleReset = () => {
    setPriceRange({ min: "", max: "" });
    setSize("");
    onSortChange("");
    onReset();
    setShowFilter(false);
  };

  return (
    <div className="h-20 justify-end flex flex-row mr-[14%] text-[12px] relative z-10">
      <div id="sort" className="p-6 relative" ref={sortRef}>
        <img
          src="/NavigationIcons/sort.svg"
          alt="Sort"
          onClick={() => setShowSort(!showSort)}
          className="cursor-pointer hover:scale-110 transition"
        />
        <p className="text-center">Sort</p>

        {showSort && (
          <div className="absolute right-0 mt-2 bg-white rounded w-40 text-xs p-2 space-y-1">
            <div
              className="cursor-pointer border border-[#b398a5] hover:bg-[#b398a5] hover:text-white p-1 rounded"
              onClick={() => {
                onSortChange("asc");
                setShowSort(false);
              }}
            >
              Price: Low to High
            </div>
            <div
              className="cursor-pointer border border-[#b398a5] hover:bg-[#b398a5] hover:text-white p-1 rounded mt-2"
              onClick={() => {
                onSortChange("desc");
                setShowSort(false);
              }}
            >
              Price: High to Low
            </div>
          </div>
        )}
      </div>

      <div id="filter" className="p-6 relative" ref={filterRef}>
        <img
          src="/NavigationIcons/filter.svg"
          alt="Filter"
          onClick={() => setShowFilter(!showFilter)}
          className="cursor-pointer hover:scale-110 transition"
        />
        <p className="text-center">Filter</p>

        {showFilter && (
          <div className="absolute right-0 mt-2 bg-white rounded w-64 text-xs p-3 space-y-3">
            <div>
              <label className="font-medium text-[11px]">Price Range:</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="number"
                  placeholder="Min"
                  className="foucs:border focus:border-[#b398a5] p-1 w-20 rounded"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="foucs:border focus:border-[#b398a5] p-1 w-20 rounded"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="font-medium text-[11px]">Size:</label>
              <select
                className="border border-[#b398a5] hover:bg-[#b398a5] hover:text-white p-1 rounded w-full mt-1"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">All Sizes</option>
                <option value="xxs">XXS</option>
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
                <option value="xxxl">XXXL</option>
              </select>
            </div>

            <div className="flex gap-2 justify-between pt-1">
              <button
                onClick={handleFilterApply}
                className="px-2 py-1 bg-[#8f6865] text-white rounded hover:bg-gray-800"
              >
                Apply
              </button>
              <button
                onClick={handleReset}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

