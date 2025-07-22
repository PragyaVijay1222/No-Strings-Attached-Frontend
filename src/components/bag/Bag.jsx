import { useEffect, useState } from "react";
import { getUserId } from "../../utils/auth";
import { NavigationBar } from "../common/NavigationBar";
import { Footer } from "../common/Footer";
import { ProductCard } from "../common/ProductCard";
import { HeaderBag } from "./HeaderBag";
import { Filter } from "../common/Filter";
import { useNavigate } from "react-router-dom";

export const Bag = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [filters, setFilters] = useState({});
  const userId = getUserId();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const resetFilters = () => {
    setFilters({});
    setSortOrder("");
  };

  const handleRemove = (productId) => {
    setOriginalProducts((prev) => prev.filter((p) => p._id !== productId));
    setDisplayedProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  useEffect(() => {
    const fetchBagItems = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/${userId}`, {
          credentials: "include",
        });
        const userData = await res.json();

        const productPromises = userData.bag.map((id) =>
          fetch(`${BASE_URL}/api/products/${id}`).then((res) => res.json())
        );

        const productData = await Promise.all(productPromises);
        setOriginalProducts(productData);
        setDisplayedProducts(productData);
      } catch (err) {
        console.error("Failed to fetch bag items:", err);
      }
    };

    if (userId) fetchBagItems();
  }, [userId]);

  useEffect(() => {
    let filtered = [...originalProducts];

    if (filters?.priceRange) {
      const min = parseFloat(filters.priceRange.min) || 0;
      const max = parseFloat(filters.priceRange.max) || Infinity;
      filtered = filtered.filter((p) => p.cost >= min && p.cost <= max);
    }

    if (filters?.size) {
      filtered = filtered.filter((p) => p.size === filters.size);
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.cost - b.cost);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.cost - a.cost);
    }

    setDisplayedProducts(filtered);
  }, [sortOrder, filters, originalProducts]);

  useEffect(() => {
    const handleGlobalSearch = (e) => {
      const query = e.detail.query?.toLowerCase();
      setFilters((prev) => ({ ...prev, searchQuery: query }));
    };
    window.addEventListener("global-search", handleGlobalSearch);
    return () => window.removeEventListener("global-search", handleGlobalSearch);
  }, []);

  return (
    <>
      <div id="main" className="flex flex-row">
        <div id="navigation" className="fixed z-[60]">
          <NavigationBar />
        </div>

        <div id="body" className="flex flex-col ml-26 mr-1">
          <div id="header" className="mt-1">
            <HeaderBag />
          </div>

          <div id="filter" className="mt-20 sticky top-0 z-[50] bg-white flex flex-row justify-between">
            {displayedProducts.length > 0 && (
            <div className="text-center ml-50">
              <button
              onClick={() => navigate("/checkout/summary")}className="px-6 py-2 bg-[#736246] text-white rounded-lg hover:bg-[#5a4d37] transition">
                Checkout
              </button>
            </div>
          )}
            <Filter
              onSortChange={setSortOrder}
              onFilterChange={setFilters}
              onReset={resetFilters}
            />
          </div>

          <div className="flex flex-wrap ml-[11%] gap-y-24 mt-20">
            {displayedProducts.length === 0 ? (
              <p className="text-lg">Your bag is empty or no items match the filters.</p>
            ) : (
              displayedProducts.map((product, index) => (
                <div key={product._id || index} className="basis-1/3">
                  <ProductCard data={product} onRemove={() => handleRemove(product._id)} />
                </div>
              ))
            )}
          </div>
          <div id="footer" className="mt-20">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
