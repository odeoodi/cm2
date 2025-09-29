import { useState } from "react";   
export default function useLogin(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // better to start with false

  const login = async (object) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });

      const user = await response.json();

      if (!response.ok) {
        setError(user.error || "Login failed");
        setIsLoading(false);
        return;
      }

      // localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify({ email, token }));

      setIsLoading(false);
    } catch (err) {
      setError("Something went wrong");
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
