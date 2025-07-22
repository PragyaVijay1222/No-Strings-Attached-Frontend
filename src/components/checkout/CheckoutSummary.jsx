import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../utils/auth";

export const CheckoutSummary = () => {
  const [groupedData, setGroupedData] = useState({});
  const navigate = useNavigate();
  const userId = getUserId();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBagDetails = async () => {
      const res = await fetch(`${BASE_URL}/api/user/${userId}`, {
        credentials: "include"
      });
      const user = await res.json();

      const products = await Promise.all(
        user.bag.map((id) =>
          fetch(`${BASE_URL}/api/products/${id}`).then((res) => res.json())
        )
      );

      const grouped = {};
      products.forEach((product) => {
        const upi = product.upi;
        if (!grouped[upi]) {
          grouped[upi] = {
            sellerName: product.email,
            products: [],
            total: 0
          };
        }
        grouped[upi].products.push(product);
        grouped[upi].total += Number(product.cost);
      });

      setGroupedData(grouped);
    };

    if (userId) fetchBagDetails();
  }, [userId]);

  const handleConfirmPurchase = () => {
    navigate("/checkout/payment", { state: { groupedData } });
  };

  return (
    <>

    <div id="companyName">
      <h1 className="text-8xl text-[#736246] ml-4 mt-4 pb-3 herr-von-muellerhoff-regular">No Strings Attached</h1>
    </div>
    <div className="p-6 mt-[2%] ml-[35%]">
      <h1 className="text-2xl text-[#736246] font-semibold mb-4">Checkout Summary</h1>

      {Object.entries(groupedData).map(([upi, group], index) => (
        <div key={index} className="mb-6 border border-[#8f6865] rounded-lg p-8 w-[50%]">
          <h2 className="font-medium text-lg mb-4">Seller: {group.sellerName}</h2>
          <p className="mb-4">UPI: {upi}</p>
          <ul className="list-disc ml-5 mt-2 flex flex-row">
            {group.products.map((product) => (
              <div key={product._id} className="flex flex-col items-center gap-4 mb-2">
              <img src={product.image} alt={product.name} className="w-60 h-70 object-cover rounded p-4" />
              <span>{product.name} - ₹{product.cost}</span>
              </div>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Total: ₹{group.total}</p>
        </div>
      ))}

      <button
        className="bg-[#8f6865] text-white hover:bg-[#736246] hover:border-[#736246] hover:text-white px-6 py-2 rounded"
        onClick={handleConfirmPurchase}
      >
        Confirm Purchase
      </button>
    </div>
    </>
  );
};
