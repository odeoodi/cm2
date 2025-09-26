import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
            const response = await fetch('/api/user/signup', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem("user", JSON.stringify(user))
                setIsAuthenticated(true);
                navigate('/mainPage')
                setMessage({ text: `Account created for ${form.name}!`, type: "success" });
                setSubmitted(true); // hide form, show message

            } else {
                setMessage({ text: "Signup failed. Try again later.", type: "error" });
            }
        } catch {
            console.error("server connectivity issue")
            setMessage({ text: "Server connectivity issue.", type: "error" });
        }
    }



    return {
    form,
    setForm,
    submitted,
    message,
    handleSubmit,

    }
}

export default useSignup;