import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, Navigate
} from "react-router-dom";
import { useState } from 'react'
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
// import Signup from "./pages/Signup";
import SignupUser from "./pages/SignupUser";

import Login from './pages/LoginPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("user")) || false
  )
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/edit-job/:id" element={<EditJobPage />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        
        <Route path="/signup" element={!isAuthenticated ? 
                            (<SignupUser setIsAuthenticated={setIsAuthenticated} />)
                             : (
                              <Navigate to="/" />
                             )} />
        <Route path="/login" element={!isAuthenticated ? 
                            (<Login setIsAuthenticated={setIsAuthenticated} />)
                             : (
                              <Navigate to="/" />
                             )} />
        <Route path="*" element={<NotFoundPage />} />


      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
