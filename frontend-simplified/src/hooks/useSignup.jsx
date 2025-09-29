import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignup = (setIsAuthenticated) => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    gender: "",
    dob: "",
    membership: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }
    try {
      const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";
      const response = await fetch(`${API}/api/users/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone_number: form.phone,
          gender: form.gender,
          date_of_birth: form.dob,
          membership_status: form.membership,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data?.token) {
          localStorage.setItem("token", data.token);
        }
        localStorage.setItem("user", JSON.stringify(data));
          window.dispatchEvent(new Event('authChanged'));
        if (typeof setIsAuthenticated === "function") {
          setIsAuthenticated(true);
        }
        navigate("/add-job");
        setMessage({
          text: `Account created for ${form.name}!`,
          type: "success",
        });
        setSubmitted(true);
      } else {
        let errorText = `Signup failed (${response.status})`;
        try {
          const err = await response.json();
          if (err?.error) errorText = err.error;
        } catch {}
        setMessage({ text: errorText, type: "error" });
      }
    } catch (e) {
      console.error(e);
      setMessage({
        text: `Network error: ${e?.message || "failed to reach server"}`,
        type: "error",
      });
    }
  };

  return {
    form,
    setForm,
    submitted,
    message,
    handleSubmit,
  };
};

export default useSignup;
