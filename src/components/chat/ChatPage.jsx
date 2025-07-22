import { Footer } from "../common/Footer";
import { HeaderChat } from "./HeaderChat";
import { NavigationBar } from "../common/NavigationBar";
import { Chat } from "./Chat";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const ChatPage = () => {
  const { productId, userId, sellerId } = useParams();
  const [product, setProduct] = useState(null);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${BASE_URL}/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    }

    fetchProduct();
  }, [productId, BASE_URL]);

  return (
    <div className="flex flex-row">
      <div id="navigation" className="fixed"><NavigationBar /></div>
      <div id="body" className="flex flex-col ml-26 mr-1">
        <div id="header" className="mt-1"><HeaderChat /></div>
        <div className="mt-20 flex flex-row">
          {product && (
            <div className="flex items-center gap-5 mb-5 pb-4 ml-26">
              <div>
                <h2 className="vertical-text text-5xl font-semibold text-[#3b3635]">{product.name}</h2>
              </div>
              <img
                src={product.image || "/Background/ExampleCard.jpg"}
                alt={product.name}
                className="w-80 h-100 object-cover rounded ml-7"
              />
            </div>
          )}         
        <Chat productId={productId} userId={userId} sellerId={sellerId} />
        </div>
        <div id="footer" className="mt-20"><Footer /></div>
      </div>
    </div>
  );
};