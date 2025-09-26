import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogin = (setIsAuthenticated) => {

  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()



  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      const data = await response.json();
      setIsAuthenticated(true);
      localStorage.setItem("token", data.token);
      navigate('./mainPage', { replace: true })

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }



  return {
    form,
    showPassword,
    setShowPassword,
    loading,
    error,
    handleChange,
    handleSubmit,
  }
}


export default useLogin;