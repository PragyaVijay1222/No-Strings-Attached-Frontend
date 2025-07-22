import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";

export const Contents = ({ filterCategory, sortOrder, filters }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const categoryMap = {
        women: "female-fit",
        men: "male-fit",
        accessories: "accessories",
      };

      const endpoint = `http://localhost:8080/api/products/${categoryMap[filterCategory] || ""}`;
      try {
        setLoading(true);
        const res = await fetch(endpoint);
        const data = await res.json();
        let filteredData = data;

        if (filters?.priceRange) {
          const min = parseFloat(filters.priceRange.min) || 0;
          const max = parseFloat(filters.priceRange.max) || Infinity;
          filteredData = filteredData.filter(product => product.cost >= min && product.cost <= max);
        }

        if (filters?.size) {
          filteredData = filteredData.filter(product => product.size === filters.size);
        }

        if (filters?.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          filteredData = filteredData.filter(product =>
            product.name?.toLowerCase().includes(query)
          );
        }

        if (sortOrder === "asc") {
          filteredData = filteredData.sort((a, b) => a.cost - b.cost);
        } else if (sortOrder === "desc") {
          filteredData = filteredData.sort((a, b) => b.cost - a.cost);
        }

        setProducts(filteredData);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filterCategory, sortOrder, filters]);

  if (loading) return <p className="ml-[11%] text-gray-500">Loading products...</p>;

  if (products.length === 0) {
    return <p className="ml-[11%] text-gray-500">No products found for selected filters.</p>;
  }

  return (
    <div className="flex flex-wrap ml-[11%] gap-y-24">
      {products.map((product, index) => (
        <div key={product._id || index} className="basis-1/3">
          <ProductCard data={product} />
        </div>
      ))}
    </div>
  );
};
