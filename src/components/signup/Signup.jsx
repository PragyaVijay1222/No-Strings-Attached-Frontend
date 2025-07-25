import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserId } from "../../utils/auth";
import { SpinnerOverlay } from "../common/SpinnerOverlay";
import { CustomSpinner } from "../common/CustomSpinner";

export const Signup = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function checkAuthenticationStatus() {
      const response = await fetch(`${BASE_URL}/api/auth/auth-check`, {
        method: "GET",
        credentials: "include"
      });

      if (response.status === 200) {
        navigate("/");
      }
    }

    checkAuthenticationStatus();
  }, [navigate, BASE_URL]);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const userPayload = {};

    for (const data of formData.entries()) {
      userPayload[data[0]] = data[1];
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify(userPayload),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await response.json(); 

      if (response.status === 201) {
        setUserId(data.userId);
        navigate("/");
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <>
    {loading && <SpinnerOverlay />}
    <div className={loading ? "blur-sm pointer-events-none" : ""}>
      <div id="companyName">
        <h1 className="text-8xl text-[#736246] pt-4 pb-3 herr-von-muellerhoff-regular">No Strings Attached</h1>
      </div>
      <form id="feedbackForm" className="flex flex-col items-center text-center mt-[9%]" onSubmit={handleFormSubmit} ref={formRef}>
        <h3 className="mb-5 font-medium">New Here?</h3>
        <input type="text" name="name" placeholder="Name" className="border-1 rounded-lg border-gray-700 focus:border-[#e3baa1] h-10 w-70 mb-3" />
        <input type="email" name="email" placeholder="Email" className="border-1 rounded-lg border-gray-700 focus:border-[#e3baa1] h-10 w-70 mb-3" />
        <input type="text" name="add" placeholder="Hostel/Address" className="border-1 rounded-lg border-gray-700 focus:border-[#e3baa1] h-10 w-70 mb-3" />
        <input type="text" name="number" placeholder="Mobile Number" className="border-1 rounded-lg border-gray-700 focus:border-[#e3baa1] h-10 w-70 mb-3" />
        <input type="password" name="password" placeholder="Set Password" className="border-1 rounded-lg border-gray-700 focus:border-[#e3baa1] h-10 w-70 mb-3" />
        <button type="submit" className="border-1 rounded-lg border-gray-700 focus:border-red-600 h-10 w-70 mb-3 hover:bg-[#736246] hover:text-white"disabled={loading}>{loading ? "Signing up....": "Signup!"}</button>
      </form>
      <div className="text-center mt-4">
        <p>Already have an account?{" "}
        <a href="/login" className="text-[#736246] hover:underline">Login!</a></p>
      </div>
    </div>
    </>
  );
};
