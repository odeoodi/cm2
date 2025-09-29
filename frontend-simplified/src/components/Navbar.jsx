import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user at start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }


    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
       
        <Link to="/" className="text-2xl font-bold">
          JobPortal
        </Link>

        
        <div className="flex items-center space-x-4">
          <Link to="/jobs" className="hover:text-gray-200">
            Jobs
          </Link>

          {user ? (
            <>
              <span className="font-semibold">Welcome, {user.email}</span>
              <Link
                to="/add-job"
                className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                Add Job
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
