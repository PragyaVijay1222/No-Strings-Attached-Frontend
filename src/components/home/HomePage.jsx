import { useEffect, useState } from "react";
import { Footer } from "../common/Footer";
import { HeaderHome } from "./HeaderHome";
import { NavigationBar } from "../common/NavigationBar";
import { ProductCard } from "../common/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const categories = ["male-fit", "female-fit", "accessories"];
      let merged = [];

      for (let category of categories) {
        try {
          const res = await fetch(`http://localhost:8080/api/products/${category}`);
          const data = await res.json();
          merged = [...merged, ...data];
        } catch (error) {
          console.error(`Error fetching ${category}:`, error);
        }
      }

      setAllProducts(merged);
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      const updateProducts = () => {
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        setVisibleProducts(shuffled.slice(0, 12));
        setRefreshKey(prev => prev + 1);
      };
      updateProducts();
      const interval = setInterval(updateProducts, 10000);
      return () => clearInterval(interval);
    }
  }, [allProducts]);

  const fadeSlide = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="fixed"><NavigationBar /></div>
        <div className="flex flex-col ml-26 mr-2 w-full">
          <div className="mt-1"><HeaderHome /></div>

          <div className="ml-[13%] mt-30 text-2xl">
            <h2>Discover Curated Picks And Collection</h2>
          </div>

          <div className="mt-30 ml-35 px-10">
            <AnimatePresence mode="wait">
              <motion.div key={refreshKey} className="grid grid-cols-3 gap-y-24 gap-x-6" variants={fadeSlide} initial="initial" animate="animate" exit="exit">
                {visibleProducts.map((product, index) => (
                  <div key={product._id || index} className="transition-transform duration-500 hover:scale-105">
                    <ProductCard data={product} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-20"><Footer /></div>
        </div>
      </div>
    </>
  );
};
