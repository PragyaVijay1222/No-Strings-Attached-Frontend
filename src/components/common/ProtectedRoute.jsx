import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch(`${BASE_URL}/api/auth/auth-check`, {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 200) {
          setIsAuth(true);
        } else {
          setShowRedirectMessage(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setShowRedirectMessage(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [navigate, BASE_URL]);

  if (isLoading) return <div>Loading...</div>;

  if (showRedirectMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-semibold text-red-600">Oops!</h2>
        <p className="mt-2 text-gray-700 text-lg">
          Looks like you need to <span className="font-medium">log in</span> first.
        </p>
        <p className="text-sm text-gray-500 mt-1">Redirecting you to the login page...</p>
      </div>
    );
  }

  return isAuth ? children : null;
};
