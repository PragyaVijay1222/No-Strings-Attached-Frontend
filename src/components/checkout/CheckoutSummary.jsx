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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Checkout Summary</h1>

      {Object.entries(groupedData).map(([upi, group], index) => (
        <div key={index} className="mb-6 border rounded-lg p-4">
          <h2 className="font-medium text-lg">Seller: {group.sellerName}</h2>
          <p>UPI: {upi}</p>
          <ul className="list-disc ml-5 mt-2">
            {group.products.map((product) => (
              <li key={product._id}>
                {product.name} - ₹{product.cost}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Total: ₹{group.total}</p>
        </div>
      ))}

      <button
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        onClick={handleConfirmPurchase}
      >
        Confirm Purchase
      </button>
    </div>
  );
};
