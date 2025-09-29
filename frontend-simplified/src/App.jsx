import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import Signup from "./pages/Signup";
import Login from "./pages/LoginPage";
import { Link } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) {
    return (
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 text-center">
            <h2 className="text-2xl font-semibold mb-4">Login to add jobs</h2>
            <p className="mb-6">You must be signed in to access this page.</p>
            <div className="flex gap-3 justify-center">
              <Link
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                to="/signup"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return children;
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/add-job"
          element={
            <RequireAuth>
              <AddJobPage />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-job/:id"
          element={
            <RequireAuth>
              <EditJobPage />
            </RequireAuth>
          }
        />
    
        <Route path="/jobs/:id" element={<JobPage />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
