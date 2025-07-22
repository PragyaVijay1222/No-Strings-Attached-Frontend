import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setUserId } from "../../utils/auth"; 

export const Login = () => {
  const formRef = useRef();
  const navigate = useNavigate();

  async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const userPayload = {};

    for (const [key, value] of formData.entries()) {
      userPayload[key] = value;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userPayload),
        credentials: "include"
      });

      let data = {};
      try {
        data = await response.json(); 
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        alert("Server error. Please try again.");
        return;
      }

      if (response.ok && data.userId) {
        setUserId(data.userId); 
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  }


  return (
    <div>
      <div id="companyName">
        <h1 className="text-8xl text-[#736246] pt-4 pb-3">No Strings Attached</h1>
      </div>
      <form id="feedbackForm" className="flex flex-col items-center text-center mt-[9%]" onSubmit={handleFormSubmit} ref={formRef}>
        <h3 className="mb-5 font-medium">Welcome Back!</h3>
        <input type="email" name="email" placeholder="Email" className="border-1 rounded-lg border-gray-700 focus:border-[#e3baa1] h-10 w-70 mb-3"/>
        <input type="password" name="password" placeholder="Password" className="border-1 rounded-lg border-gray-700 focus:border-[#e3baa1] h-10 w-70 mb-3"/>
        <button type="submit" className="border-1 rounded-lg border-gray-700 focus:border-red-600 h-10 w-70 mb-3 hover:bg-[#736246] hover:text-white">Login!</button>
      </form>
      <div className="text-center mt-4">
        <p>No account?{" "}
        <a href="/signup" className="text-[#736246] hover:underline">Signup!</a></p></div>
    </div>
  );
};