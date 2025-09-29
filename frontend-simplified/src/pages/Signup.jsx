import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone_number: "",
        gender: "",
        date_of_birth: "",
        membership_status: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || "Signup failed");
            }

            // backend returns { email, token }
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/jobs");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-8">
            <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            required
                            className="border rounded w-full p-2"
                            placeholder="Your full name"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            required
                            className="border rounded w-full p-2"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={onChange}
                            required
                            className="border rounded w-full p-2"
                            placeholder="Strong password"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Must be a strong password (backend validates strength).
                        </p>
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone_number"
                            value={form.phone_number}
                            onChange={onChange}
                            required
                            className="border rounded w-full p-2"
                            placeholder="+1 555 123 4567"
                        />
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Gender</label>
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={onChange}
                            required
                            className="border rounded w-full p-2"
                        >
                            <option value="" disabled>Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="date_of_birth"
                            value={form.date_of_birth}
                            onChange={onChange}
                            required
                            className="border rounded w-full p-2"
                        />
                    </div>

                    {/* Membership Status */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-1">Membership Status</label>
                        <select
                            name="membership_status"
                            value={form.membership_status}
                            onChange={onChange}
                            required
                            className="border rounded w-full p-2"
                        >
                            <option value="" disabled>Select status</option>
                            <option value="Standard">Standard</option>
                            <option value="Premium">Premium</option>
                            <option value="VIP">VIP</option>
                        </select>
                    </div>

                    {error && <p className="text-red-600 mb-3">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white w-full py-2 rounded font-semibold"
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>

                    <p className="text-center text-sm mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Signup;
