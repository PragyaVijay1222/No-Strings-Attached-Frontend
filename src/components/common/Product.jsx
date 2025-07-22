import { useParams, useNavigate } from "react-router-dom";
import { getUserId } from "../../utils/auth";
import { useEffect, useState } from "react";
import { NavigationBar } from "./NavigationBar";
import { HeaderProducts } from "./HeaderProducts";
import { Footer } from "./Footer";

export const Product = () => {
  const { id } = useParams();
  const userId = getUserId();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    const fetchUserStatus = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/${userId}`, {
          credentials: "include"
        });
        const userData = await res.json();
        const bagIds = userData.bag.map(p => p.toString());
        const favIds = userData.favorites.map(p => p.toString());
        setIsInCart(bagIds.includes(id));
        setIsFavorited(favIds.includes(id));
      } catch (err) {
        console.error("Failed to fetch user status:", err);
      }
    };

    fetchProduct();
    if (userId) fetchUserStatus();
  }, [id, userId]);

  const handleCartToggle = async () => {
    try {
      const endpoint = isInCart
        ? `${BASE_URL}/api/bag/removeFromBag`
        : `${BASE_URL}/api/bag/addToBag`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: id }),
        credentials: "include"
      });

      if (res.ok) {
        setIsInCart(!isInCart);
      } else {
        const result = await res.json();
        console.error("Cart update failed:", result.message);
      }
    } catch (err) {
      console.error("Cart update failed:", err);
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      const endpoint = isFavorited
        ? `${BASE_URL}/api/bag/removeFavorite`
        : `${BASE_URL}/api/bag/addFavorite`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: id }),
        credentials: "include"
      });

      if (res.ok) {
        setIsFavorited(!isFavorited);
      } else {
        const result = await res.json();
        console.error("Favorite update failed:", result.message);
      }
    } catch (err) {
      console.error("Favorite update failed:", err);
    }
  };

  const handleChatClick = () => {
    navigate(`/chat/${product._id}/${userId}/${product.sellerId}`);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div id="main" className="flex flex-row">
      <div id="navigation" className="fixed">
        <NavigationBar />
      </div>
      <div className="flex flex-col ml-26 mr-1">
        <div id="header" className="mt-1">
          <HeaderProducts />
        </div>
        <div id="body" className="flex flex-row mt-17 ml-30 p-20">
          <div id="name" className="pr-15 pl-10 text-[#3b3635]">
            <h1 className="vertical-text text-5xl">{product.name}</h1>
          </div>
          <img
            src={product.image || "/Background/ExampleCard.jpg"}
            alt={product.name}
            className="w-110 h-150 object-cover rounded"
          />
          <div id="desc" className="pl-20 mt-20">
            <p className="mt-4 text-xl mb-5">Description: {product.description}</p>
            <p className="text-md pt-4">Size: {product.size}</p>
            <p className="text-md pt-4">Price: ₹{product.cost}</p>
            <p className="text-md pt-4">Material: {product.material}</p>
            <p className="text-md pt-4">Condition: {product.old}</p>
            <p className="text-md pt-4">Stle Fit: {product.styleFit}</p>
            <div className="dec flex flex-row gap-4 mt-20">
              <button
                onClick={handleCartToggle}
                className={`px-4 py-2 w-50 rounded text-white text-sm ${
                  isInCart ? "bg-[#8f6865]" : "bg-[#b398a5] text-black"
                } hover:opacity-90 hover:cursor-pointer`}
              >
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>
              <button
                onClick={handleFavoriteToggle}
                className={`px-4 py-2 w-50 rounded text-white text-sm ${
                  isFavorited ? "bg-[#9e646b]" : "bg-gray-300 text-black"
                } hover:opacity-90 hover:cursor-pointer`}
              >
                {isFavorited ? "Unfavorite" : "Add to Favorites"}
              </button>
              <button
                onClick={handleChatClick}
                className="px-4 py-2 w-50 rounded bg-[#cfcaba] hover:bg-[#bfb6a6] text-black text-sm hover:cursor-pointer"
              >
                Chat with Seller
              </button>
            </div>
          </div>
        </div>
        <div id="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};
