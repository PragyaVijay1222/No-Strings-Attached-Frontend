import { useEffect, useState } from "react";
import { getUserId } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const userId = getUserId();
  const navigate = useNavigate();
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBagItems = async () => {
      try {
        const userRes = await fetch(`${BASE_URL}/api/user/${userId}`, {
          credentials: "include"
        });
        const userData = await userRes.json();

        const productPromises = userData.bag.map((id) =>
          fetch(`${BASE_URL}/api/products/${id}`).then((res) => res.json())
        );
        const productData = await Promise.all(productPromises);

        const grouped = {};
        productData.forEach((product) => {
          const upi = product.upi;
          if (!grouped[upi]) {
            grouped[upi] = {
              sellerName: product.email,
              total: 0,
              products: []
            };
          }
          grouped[upi].products.push(product);
          grouped[upi].total += product.cost;
        });

        setGroupedData(grouped);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load checkout data:", err);
        setLoading(false);
      }
    };

    if (userId) fetchBagItems();
  }, [userId]);

  const handleConfirm = () => {
    navigate("/checkout/payment", { state: { groupedData } });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h1 className="text-3xl font-semibold mb-6 text-center">Order Summary</h1>
      {Object.entries(groupedData).map(([upi, info], idx) => (
        <div key={idx} className="border p-4 mb-6 rounded-lg shadow-md">
          <p className="font-bold mb-2">Seller: {info.sellerName}</p>
          <ul className="list-disc ml-6 mb-2">
            {info.products.map((p) => (
              <li key={p._id}>
                {p.name} — ₹{p.cost}
              </li>
            ))}
          </ul>
          <p className="font-semibold">Total for this seller: ₹{info.total}</p>
        </div>
      ))}

      <div className="text-center">
        <button
          onClick={handleConfirm}
          className="px-6 py-2 bg-[#736246] text-white rounded-lg hover:bg-[#5a4d37] transition"
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};
