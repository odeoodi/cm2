import { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";
      const apiUrl = isHome ? `${API}/api/jobs?_limit=3` : `${API}/api/jobs`;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(apiUrl, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch jobs (${res.status})`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setJobs(data);
        } else if (data.jobs && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.log("Error fetching data", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.length === 0 ? (
              <p>No jobs available at the moment.</p>
            ) : (
              jobs.map((job) => <JobListing key={job.id} job={job} />)
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
